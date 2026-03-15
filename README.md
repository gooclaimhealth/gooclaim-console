# Gooclaim Console

Gooclaim Console is a Next.js 14 operations dashboard for claims workflow management. It provides a ticket-centric UI for hospital and TPA operations, template visibility, admin kill-switch controls, and timeline-based case review.

The repo is structured to run in two modes:

- Mock mode for local UI development and demos
- Live API mode against a backend service exposed through `NEXT_PUBLIC_API_URL`

## Current Surface Area

- Tickets dashboard at `/tickets`
- Ticket detail timeline at `/tickets/[id]`
- Templates library at `/templates`
- Admin controls at `/admin`
- Insights view at `/insights`

The root route `/` redirects to `/tickets`.

## Tech Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- Radix UI primitives

## Getting Started

### Prerequisites

- Node.js 18.18+ or 20+
- npm 9+

### Install

```bash
npm install
```

### Configure Environment

Create a local env file:

```bash
cp .env.local.example .env.local
```

Default environment values:

```env
NEXT_PUBLIC_USE_MOCK_API=true
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_MOCK_LATENCY_MS=250
```

### Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Environment Modes

### Mock Mode

Recommended for local UI work.

```env
NEXT_PUBLIC_USE_MOCK_API=true
```

Behavior:

- Tickets, ticket details, templates, and admin state load from seeded mock data
- Mock latency can be adjusted with `NEXT_PUBLIC_MOCK_LATENCY_MS`
- Action flows remain interactive without requiring a backend

### Live API Mode

Use this when a compatible backend is available.

```env
NEXT_PUBLIC_USE_MOCK_API=false
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Behavior:

- The app requests tickets, ticket detail, timeline, templates, and admin state from the configured API
- If a request fails, the UI falls back to local mock data for resilience in development environments

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
app/                App Router pages and route-level views
components/         Layout, admin, template, ticket, timeline, and UI components
hooks/              Client hooks
lib/api/            Data access adapters for tickets, templates, and admin state
lib/mock/           Seeded mock data used in local mode and API fallback paths
types/              Shared TypeScript domain types
```

Key files:

- [app/layout.tsx](app/layout.tsx)
- [app/tickets/page.tsx](app/tickets/page.tsx)
- [app/templates/page.tsx](app/templates/page.tsx)
- [app/admin/page.tsx](app/admin/page.tsx)
- [lib/config.ts](lib/config.ts)
- [lib/api/tickets.ts](lib/api/tickets.ts)
- [lib/api/templates.ts](lib/api/templates.ts)
- [lib/api/admin.ts](lib/api/admin.ts)
- [lib/mock/tickets.mock.ts](lib/mock/tickets.mock.ts)
- [types/index.ts](types/index.ts)

## Deployment Notes

This app is suitable for deployment as a standard Next.js application.

Minimum deployment requirements:

- Set `NEXT_PUBLIC_USE_MOCK_API=false` in environments that should use a real backend
- Set `NEXT_PUBLIC_API_URL` to the reachable backend base URL
- Run `npm run build` successfully in CI before promotion

If you intentionally want a demo deployment, keep `NEXT_PUBLIC_USE_MOCK_API=true`.

## Verification

Run a production build locally:

```bash
npm run build
```

Optional validation:

```bash
npm run lint
```

## Notes

- Authentication is not wired to a real identity provider in this frontend repo
- API calls currently use placeholder bearer tokens in the client-side adapters
- Mock fallback behavior is helpful for development, but production environments should rely on healthy backend integrations rather than fallback data
