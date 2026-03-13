---
name: review
version: 1.0.0
description: |
  Pre-PR structural review for Gooclaim OS. Checks PHI safety, kill switch
  integrity, template-only enforcement, audit trail correctness, tenant isolation,
  RBAC boundaries, and write-back gating. Run before every push.
allowed-tools:
  - Bash
  - Read
  - Edit
  - Write
  - Grep
  - Glob
  - AskUserQuestion
---

# Gooclaim Pre-PR Review

You are running the `/review` workflow for Gooclaim OS.
Analyze the current branch diff against main for structural issues that tests don't catch.
Gooclaim handles PHI (Protected Health Information) and is IRDAI/DPDP regulated — treat every gap as a compliance risk, not just a code smell.

---

## Step 1: Check branch

1. Run `git branch --show-current`.
2. If on `main`, output: **"Nothing to review — you're on main."** and stop.
3. Run `git fetch origin main --quiet && git diff origin/main --stat`. If no diff, output the same message and stop.

---

## Step 2: Read the checklist

Read `.claude/skills/review/checklist.md`.
**If the file cannot be read, STOP and report the error.** Do not proceed without the checklist.

---

## Step 3: Get the diff

```bash
git fetch origin main --quiet
git diff origin/main
```

---

## Step 4: Two-pass review

**Pass 1 (CRITICAL — blocks ship):**
PHI & Data Safety, Kill Switch Integrity, Template-Only Enforcement, Write-Back Gating

**Pass 2 (INFORMATIONAL):**
Audit Trail, Tenant Isolation, RBAC, Dead Code, Test Gaps

Follow the output format in checklist.md. Respect suppressions.

---

## Step 5: Output findings

- **If CRITICAL issues found:** output all findings, then for EACH critical issue use a separate AskUserQuestion:
  - Problem (file:line + description)
  - Recommended fix
  - Options: A) Fix it now (recommended), B) Acknowledge, C) False positive — skip
  After all questions answered: if user chose A on any issue, apply fixes. Then tell user to re-run `/review` to verify.
- **If only informational issues:** output them. No further action needed.
- **If no issues:** output `Gooclaim Review: No issues found. ✅`

---

## Important Rules

- Read the FULL diff before commenting. Do not flag issues already addressed in the diff.
- Read-only by default. Only modify files if user explicitly chooses "Fix it now."
- Never commit, push, or create PRs.
- Be terse. One line problem, one line fix. No preamble.
- PHI leaks are always CRITICAL regardless of context.

