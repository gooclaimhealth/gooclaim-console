# Gooclaim Console

Gooclaim Console is a local-first Next.js 14 internal ops console for claims automation workflows. The current implementation is intentionally development-only: it supports a seeded mock workflow for ticket triage, detail review, timeline inspection, and template-only outbound actions without requiring a backend.

## Current Scope

- Tickets list at `/tickets`
- Ticket detail at `/tickets/[id]`
- Mock data for all trust states and multiple reason codes
- Template-only outbound composer
- Upload-link demo workflow
- Local-only environment setup

Out of scope right now:

- Staging deployment
- Production deployment
- Real auth providers
- Real admin governance flows
- Free-text outbound messaging

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create your local env file:

```bash
cp .env.local.example .env.local
```

3. Start the app:

```bash
npm run dev
```

4. Open:

```text
http://localhost:3000
```

If port `3000` is already in use, Next.js will automatically start on the next available port, for example `http://localhost:3001`.

## Environment Variables

The app now supports an explicit local toggle between seeded mocks and a live API.

```env
NEXT_PUBLIC_USE_MOCK_API=true
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_MOCK_LATENCY_MS=250
NEXT_PUBLIC_KILL_SWITCH_ACTIVE=false
```

### Recommended Local Mode

Use this while building UI and workflows:

```env
NEXT_PUBLIC_USE_MOCK_API=true
```

Behavior:

- Tickets load from local seed data
- Ticket detail loads from local seed data
- Timeline loads from local seed data
- Outbound template submission returns a mock queued intent
- A small artificial latency can be configured for realistic demos
- Kill switch can be toggled locally to block outbound messaging flows

### Live API Mode

Use this only if you have a local backend running:

```env
NEXT_PUBLIC_USE_MOCK_API=false
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Behavior:

- The app will call the configured API for tickets and timelines
- If the API request fails, the UI falls back to the local mock dataset so development does not break

### Kill Switch

The console supports a local kill-switch banner and outbound block:

```env
NEXT_PUBLIC_KILL_SWITCH_ACTIVE=true
```

Behavior when enabled:

- A red banner appears at the top of `/tickets`
- A red banner appears at the top of `/tickets/[id]`
- `Send Status Update` actions are disabled and greyed out
- Ticket detail shows the next action as blocked by kill switch

## Mock Workflow Notes

The seeded local workflow is designed for frontend development and demos:

- `Assigned to me`, `Unassigned`, `At-risk (SLA)`, and `NoSource` tabs all work from the mock dataset
- Filters for trust state, reason code, age bucket, queue, and search are active locally
- Ticket detail renders mixed timeline event types
- Template composer only exposes allowlisted variables
- Upload-link flow is simulated and intentionally does not allow custom outbound text
- Timeline actors use human-readable names in the local dataset
- Risk flags render as red warning badges on the ticket detail page

The active mode is shown in the UI through an environment banner on the tickets screen.

## Project Structure

```text
app/
components/
hooks/
lib/
```

Key files:

- [app/tickets/page.tsx](app/tickets/page.tsx)
- [app/tickets/[id]/page.tsx](app/tickets/[id]/page.tsx)
- [lib/types.ts](lib/types.ts)
- [lib/mock-data.ts](lib/mock-data.ts)
- [lib/api/tickets.ts](lib/api/tickets.ts)
- [lib/api/timeline.ts](lib/api/timeline.ts)
- [lib/config.ts](lib/config.ts)

## Verification

Production build check:

```bash
npm run build
```

This passes in the current repo state.
