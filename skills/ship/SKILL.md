---
name: ship
version: 1.0.0
description: |
  Gooclaim ship workflow: merge main, run tests, lint, pre-landing review,
  push, create PR. Non-interactive. Stops only on test failures, lint errors,
  or CRITICAL review findings.
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - AskUserQuestion
---

# Gooclaim /ship — Automated Ship Workflow

You are running `/ship` for Gooclaim OS. This is **non-interactive and fully automated**.
Do NOT ask for confirmation at any step. Run straight through. Output PR URL at the end.

**Only stop for:**
- On `main` branch (abort)
- Merge conflicts that can't be auto-resolved (stop, show conflicts)
- `pytest` failures (stop, show failures)
- `ruff` lint errors (stop, show errors)
- Pre-landing review finds CRITICAL issues and user chooses to fix

**Never stop for:**
- Uncommitted changes (always include them)
- Commit message approval (auto-commit)

---

## Step 1: Pre-flight

1. Check current branch. If on `main`, **abort**: "You're on main. Ship from a feature branch."
2. Run `git status` to see uncommitted changes. Include all of them — no need to ask.
3. Run `git diff main...HEAD --stat` and `git log main..HEAD --oneline` to understand what's being shipped.

---

## Step 2: Merge origin/main (BEFORE tests)

```bash
git fetch origin main && git merge origin/main --no-edit
```

- If merge conflicts are simple (CHANGELOG ordering, minor), auto-resolve.
- If conflicts are complex or ambiguous, **STOP** and show them.
- If already up to date: continue silently.

---

## Step 3: Run tests

Run pytest against the full test suite:

```bash
cd gooclaim-os && python -m pytest Test_Script/ -v --tb=short 2>&1 | tee /tmp/gooclaim_tests.txt
```

**If any test fails:** Show the failures and **STOP**. Do not proceed.
**If all pass:** Note count briefly. Continue.

---

## Step 4: Lint

Run ruff on the backend:

```bash
ruff check app/ --output-format=concise 2>&1 | tee /tmp/gooclaim_lint.txt
```

**If lint errors:** Show errors and **STOP**. Do not proceed.
**If warnings only (no errors):** Note count. Continue.
**If clean:** Output `Lint: clean ✅` and continue.

---

## Step 5: Pre-Landing Review

Read `.claude/skills/review/checklist.md`.
**If unreadable, STOP and report the error.**

Run full diff:
```bash
git diff origin/main
```

Apply checklist in two passes:
- **Pass 1 (CRITICAL):** PHI Safety, Kill Switch, Template-Only, Write-Back Gating
- **Pass 2 (INFORMATIONAL):** Audit Trail, Tenant Isolation, RBAC, Test Gaps, Dead Code

**Always output ALL findings.**

Output header: `Gooclaim Review: N issues (X critical, Y informational)`

**If CRITICAL issues found:** For EACH critical issue, use a separate AskUserQuestion:
- Problem (file:line + description)
- Recommended fix
- Options: A) Fix it now (recommended), B) Acknowledge and ship anyway, C) False positive — skip

After resolving:
- If user chose A (fix) on any → apply fixes, commit fixed files only:
  ```bash
  git add <fixed-files> && git commit -m "fix: apply pre-landing review fixes"
  ```
  Then **STOP** — tell user to run `/ship` again to re-test.
- If user chose only B or C → continue to Step 6.

**If informational only:** Note findings. Continue. They go in PR body.
**If no issues:** Output `Gooclaim Review: No issues found. ✅` and continue.

---

## Step 6: Commit

Stage all changes:
```bash
git add -A
```

Auto-generate commit message from diff and log:
- Format: `<type>: <summary>`
- Type = feat / fix / chore / refactor / docs
- Summary = one line, present tense, max 60 chars

```bash
git commit -m "<type>: <summary>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

Update `tasks/todo.md`:
- Mark completed items `[x]` based on what the diff implements
- Add any new items discovered during review

Update `CLAUDE.md §3` (What's Built):
- Append `- [feature] ✅ (YYYY-MM-DD)` for anything newly complete

Commit the sync files:
```bash
git add tasks/todo.md CLAUDE.md
git commit -m "chore: sync todo and CLAUDE.md post-ship"
```

---

## Step 7: Push

```bash
git push -u origin <branch-name>
```

---

## Step 8: Create PR

```bash
gh pr create \
  --title "<type>: <summary>" \
  --body "$(cat <<'EOF'
## Summary
<bullet points from diff — what changed, why>

## Workflows affected
<list: RW1 / RW2 / RW3 / new RW if applicable>

## Pre-Landing Review
<findings from Step 5, or "No issues found. ✅">

## Test plan
- [x] pytest: N tests, 0 failures
- [x] ruff lint: clean
- [x] Kill switch: checked in all new workflows
- [x] PHI: not present in any log output
- [x] Templates: all outbound messages use template loader

🤖 Generated with Claude Sonnet 4.6 for Gooclaim OS
EOF
)"
```

**Output the PR URL** — this is the final output the user sees.

---

## Gooclaim-Specific Non-Negotiables

These are checked in Step 5 (review) but worth knowing during ship:

1. **Kill switch first** — every new workflow checks kill switch before any logic
2. **Template only** — no f-string outbound messages, ever
3. **PHI never in logs** — claim_id, member_id, patient_name are ALWAYS redacted in log output
4. **Read-only in Phase 1/2** — no write-backs to external systems until Phase 3
5. **Audit trail** — every action logged with tenant_id + actor_id + timestamp BEFORE execution
6. **Tenant isolation** — every DB query has WHERE tenant_id = ? filter
7. **Stack** — backend = Python/FastAPI only, console = Next.js App Router only

If any of these are violated, `/ship` stops at Step 5 (review).

