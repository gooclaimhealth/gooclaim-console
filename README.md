# Gooclaim Console Frontend

Frontend for the Gooclaim pilot console. This app is a Next.js UI for TPA operations teams to review claim tickets, inspect escalation detail, manage system mode, and browse a read-only template registry.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- `pnpm`
- Radix UI + Lucide icons

## Current Product Areas

- Tickets
  - PHI-safe ticket list
  - claim/ticket search
  - escalated filter
  - ticket detail timeline
- Admin
  - system mode control with confirm flow
  - ops-facing system health
  - tenant config view
- Templates
  - read-only registry
  - status and language filters

## Getting Started

### Prerequisites

- Node.js 20+ recommended
- `pnpm` via Corepack

### Install

```bash
corepack enable
corepack pnpm install
```

### Run locally

```bash
corepack pnpm dev
```

Default local URL:

```text
http://localhost:3000
```

### Production build

```bash
corepack pnpm build
corepack pnpm start
```

## Scripts

```bash
corepack pnpm dev
corepack pnpm build
corepack pnpm start
corepack pnpm lint
```

## Project Structure

```text
app/
  globals.css
  layout.tsx
  page.tsx

components/
  console/
    admin.tsx
    onboarding-modal.tsx
    sidebar.tsx
    templates.tsx
    ticket-detail.tsx
    tickets-list.tsx
    topbar.tsx
  ui/
    ...shared UI primitives
```

## Key UX Rules In This Repo

- Ticket surfaces should stay PHI-safe by default.
- Templates are read-only in the console.
- System mode changes must require explicit confirmation.
- Sidebar health should stay high signal; detailed health belongs in Admin.

## Notes

- `package.json` includes a `lint` script, but `eslint` is not currently installed in this repo.
- Production builds may require network access for `next/font` if Google-hosted fonts are used.

## Version

Current pilot label in the UI: `v0.2.1`
