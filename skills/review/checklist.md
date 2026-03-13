# Gooclaim Pre-PR Review Checklist

## Instructions

Review `git diff origin/main` for the issues below.
Be specific — cite `file:line` and suggest fixes. Skip anything that's fine. Only flag real problems.

Gooclaim is PHI-handling, IRDAI-regulated, multi-tenant. Every CRITICAL gap is a compliance risk.

**Two-pass review:**
- **Pass 1 (CRITICAL):** PHI Safety, Kill Switch, Template-Only, Write-Back Gating
- **Pass 2 (INFORMATIONAL):** Audit Trail, Tenant Isolation, RBAC, Test Gaps, Dead Code

**Output format:**

```
Gooclaim Review: N issues (X critical, Y informational)

**CRITICAL** (blocking /ship):
- [file:line] Problem description
  Fix: suggested fix

**Issues** (non-blocking):
- [file:line] Problem description
  Fix: suggested fix
```

If no issues: `Gooclaim Review: No issues found. ✅`

Be terse. One line problem, one line fix. No preamble.

---

## Review Categories

### Pass 1 — CRITICAL

#### PHI & Data Safety
- Any claim_id, member_id, patient_name, diagnosis, amount, policy_number, hospital_name
  appearing in `logger.info`, `logger.debug`, `print()`, `console.log`, response bodies
  that are NOT explicitly redacted → **CRITICAL PHI LEAK**
- PHI fields stored in plain text in DB columns that should be encrypted
- PHI fields included in error messages, stack traces, or exception payloads
- Any new endpoint returning PHI without checking `X-Tenant-ID` header first
- Bulk export or CSV generation that includes raw PHI without audit log entry
- PHI passed to external APIs (LLM, webhook, third-party) without masking

**Correct pattern:**
```python
# GOOD
logger.info("claim processed", extra={"claim_id": "[REDACTED]", "tenant": tenant_id})

# BAD
logger.info(f"claim processed: {claim_id} for {member_name}")
```

#### Kill Switch Integrity
- Any new workflow (RW4+) or endpoint that does NOT import and check `kill_switch.py`
  before executing → **MISSING KILL SWITCH**
- Kill switch check placed AFTER business logic instead of BEFORE
- Kill switch state being cached without TTL (must re-check on every request)
- Any code path that bypasses kill switch based on a role or flag
  (kill switch must be absolute — no bypasses, no admin override)
- Kill switch UI banner missing from new console screens

**Correct pattern:**
```python
# GOOD — check first, execute second
from app.services.kill_switch import is_kill_switch_active
if is_kill_switch_active(tenant_id):
    return KillSwitchResponse()
# ... business logic below
```

#### Template-Only Enforcement
- Any new outbound message (WhatsApp, SMS, email) constructed via f-string, `.format()`,
  or string concatenation instead of loading from `app/templates/` → **FREE TEXT VIOLATION**
- Template variables filled with user-supplied free text without sanitization
- New template added to code but not to `app/templates/` directory
- LLM-generated text inserted directly into outbound message without template wrapper

**Correct pattern:**
```python
# GOOD
msg = render_template("rw1_status", locale=lang, claim_id=claim_id, status=status)

# BAD
msg = f"Dear {member_name}, your claim {claim_id} status is {status}."
```

#### Write-Back Gating
- Any new function that writes to TPA system, CMS, or external DB that does NOT:
  1. Check `integration_phase` (must be Phase 3 / post-3mo)
  2. Require explicit `human_approved=True` flag
  3. Log to audit trail BEFORE executing write
  4. Have a kill switch check
  → **UNGATED WRITE-BACK**
- Write-back functions callable without human approval in any code path
- Any `UPDATE`, `POST`, `PUT`, `DELETE` to external system in Phase 1 or Phase 2 integrations
- Missing rollback/undo mechanism on write operations

**Correct pattern:**
```python
# GOOD
def write_back_status(claim_id, new_status, human_approved, actor_id):
    assert integration_phase == 3, "Write-back only in Phase 3"
    assert human_approved is True, "Human approval required"
    audit_log.append(action="write_back", claim_id=claim_id, actor=actor_id)
    if is_kill_switch_active(): return
    external_cms.update(claim_id, new_status)
```

---

### Pass 2 — INFORMATIONAL

#### Audit Trail
- New workflow or action that doesn't append to audit log (audit must be append-only — no deletes, no updates)
- Audit log entry missing any of: `tenant_id`, `actor_id`, `action`, `claim_id`, `timestamp`, `outcome`
- Audit log entry written AFTER the action instead of BEFORE (should log intent, then action)
- Audit entries written to a table that allows `UPDATE` or `DELETE`

#### Tenant Isolation
- New DB query without `WHERE tenant_id = ?` filter — potential cross-tenant data leak
- API endpoint that returns data based on `claim_id` alone without verifying tenant ownership first
- Shared in-memory state (cache, dict, module-level variable) that isn't namespaced by `tenant_id`
- New background job that doesn't carry `tenant_id` through to all DB operations

#### RBAC & Auth Boundaries
- New endpoint missing `@require_role(...)` decorator or equivalent auth check
- Role check done AFTER data fetch instead of BEFORE (must gate access before loading PHI)
- New admin endpoint reachable without verifying `role == "admin"` AND `tenant_id` match
- Session token accepted without expiry check

#### Test Gaps
- New workflow (RWn) without: happy path test, pending docs test, kill switch test
- New integration adapter without a mock/stub test (real external calls in test suite)
- New template without a render test verifying all variable slots are filled
- PHI-redaction logic without a test asserting PHI does NOT appear in log output
- Kill switch check without a test asserting workflow halts when switch is ON

#### Dead Code & Consistency
- Variables assigned but never read
- Commented-out workflow code left in production path
- Duplicate template definitions (same template in two places with slight variation)
- `TODO`/`FIXME` in files being modified — resolve or log to `tasks/todo.md`

#### Stack Non-Negotiables
- New backend file NOT using Python/FastAPI (no Flask, Django, raw http.server)
- New console file NOT using Next.js App Router (no Pages Router, no Vite standalone)
- Direct DB writes in route handlers (must go through service layer)
- Business logic in template files or route files (must be in `app/services/`)

---

## Gate Classification

```
CRITICAL (blocks /ship):          INFORMATIONAL (log and continue):
├─ PHI & Data Safety              ├─ Audit Trail gaps
├─ Kill Switch Integrity          ├─ Tenant Isolation gaps
├─ Template-Only Enforcement      ├─ RBAC gaps
└─ Write-Back Gating              ├─ Test gaps
                                  ├─ Dead code
                                  └─ Stack non-negotiables
```

---

## Suppressions — DO NOT flag these

- PHI in test fixtures that are clearly mocked (e.g., `claim_id = "TEST-001"`, `member = "John Doe (mock)"`)
- Kill switch import in files that are purely data models (no execution logic)
- Template loading in `app/templates/` loader itself (it's the template system, not a violation)
- Audit log reads (SELECT queries) — only writes need pre-logging
- `tenant_id` filter absent in migration files (migrations run outside request context)
- ANYTHING already addressed in the diff you're reviewing — read the FULL diff before commenting

