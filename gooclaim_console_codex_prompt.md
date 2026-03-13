# Gooclaim Console — Codex Prompt (paste this directly)

## What you are building

A Next.js 14 (App Router) internal ops console called **Gooclaim Console** for a claims automation platform. This is a B2B enterprise tool for hospital billing teams and TPA ops. It is NOT a chatbot UI — it is a ticket/case management system with a strict compliance requirement: **no free-text outbound, template-only actions everywhere**.

---

## Tech stack (non-negotiable)

- **Next.js 14** — App Router, TypeScript, strict mode
- **Tailwind CSS** — utility only, no custom CSS files
- **shadcn/ui** — for base components (table, badge, button, dialog, drawer)
- **next-auth** — for auth (mock provider in dev)
- **Folder structure:**

```
console/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    (redirect to /tickets)
│   ├── tickets/
│   │   ├── page.tsx                (Screen 1: Tickets List)
│   │   └── [id]/
│   │       └── page.tsx            (Screen 2: Ticket Detail)
│   ├── templates/
│   │   └── page.tsx                (read-only directory)
│   ├── docs/
│   │   └── page.tsx
│   ├── integrations/
│   │   └── page.tsx
│   ├── audit/
│   │   └── page.tsx
│   └── admin/
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   └── TopBar.tsx
│   ├── tickets/
│   │   ├── TicketTable.tsx
│   │   ├── TicketFilters.tsx
│   │   └── TicketRow.tsx
│   ├── timeline/
│   │   ├── Timeline.tsx
│   │   └── TimelineEvent.tsx
│   ├── shared/
│   │   ├── TrustBadge.tsx
│   │   ├── FreshnessWatermark.tsx
│   │   ├── TATChip.tsx
│   │   ├── NextActionButton.tsx
│   │   └── DocReceiptCard.tsx
│   └── modals/
│       ├── TemplateComposer.tsx
│       └── UploadLinkModal.tsx
├── lib/
│   ├── api/
│   │   ├── tickets.ts
│   │   └── timeline.ts
│   ├── types.ts                    (all TypeScript types — source of truth)
│   └── constants.ts
├── hooks/
│   ├── useTickets.ts
│   └── useTimeline.ts
└── .env.local.example
```

---

## TypeScript types (source of truth — do not deviate)

```typescript
// lib/types.ts

export type TrustState = 'VERIFIED' | 'STALE' | 'MISMATCH' | 'NOSOURCE';

export type ReasonCode =
  | 'TRUTH_NOT_CONNECTED'
  | 'TRUTH_DATA_STALE'
  | 'TRUTH_MISMATCH'
  | 'MISSING_CLAIM_ID'
  | 'NO_SOURCE'
  | 'OUTBOUND_SEND_FAILED'
  | 'BLOCKED_POLICY'
  | 'T1_FORBIDDEN_MATCH'
  | 'T2_ML_BLOCK'
  | 'NOSOURCE_BLOCK';

export type UserRole =
  | 'HOSPITAL_OPS_LEAD'
  | 'TPA_OPS'
  | 'ADMIN'
  | 'AUDIT';

export type QueueId =
  | 'HOSPITAL_QUEUE'
  | 'TPA_QUEUE'
  | 'ESCALATIONS'
  | 'DOCS_PENDING'
  | 'UNASSIGNED';

export type TimelineEventType =
  | 'INBOUND_WA'
  | 'OUTBOUND_TEMPLATE'
  | 'CASE_LINKED'
  | 'TRUTH_READINESS'
  | 'DOC_UPLOAD_LINK_CREATED'
  | 'DOC_RECEIVED'
  | 'POLICY_BLOCKED';

export interface TicketRow {
  ticket_id: string;
  claim_id: string | null;
  hospital: string;
  payer: string;
  trust_state: TrustState;
  reason_code: ReasonCode;
  status: string;
  tat_days_left: number | null;
  last_inbound_ping: string;       // ISO timestamp
  last_system_update: string;      // ISO timestamp
  owner: { user_id?: string; queue_id: QueueId };
  next_action: NextAction;
  freshness_ts: string | null;
}

export interface NextAction {
  action_type: string;
  label: string;
  template_id?: string;
  requires_role: UserRole;
  blocked_reason?: string;
}

export interface TimelineEvent {
  event_id: string;
  event_type: TimelineEventType;
  ts: string;                      // ISO timestamp
  actor: string;
  payload_summary: Record<string, unknown>;  // Only allowlisted fields per type
  template_id?: string;
  template_version?: number;
  outbound_intent_id?: string;
  receipt_id?: string;
}

export interface TicketDetail {
  ticket_id: string;
  claim_id: string | null;
  trust_state: TrustState;
  reason_code: ReasonCode;
  freshness_ts: string | null;
  next_action: NextAction;
  owner: { user_id?: string; queue_id: QueueId };
  tat_days_left: number | null;
  status_snapshot: {
    status: string;
    last_updated: string;
  };
  pending_docs: string[];
  query_reason: string | null;
  risk_flags: string[];
}
```

---

## API layer (mock in dev, real in staging)

```typescript
// lib/api/tickets.ts

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function getTickets(filters?: {
  trust_state?: string;
  reason_code?: string;
  queue_id?: string;
}): Promise<TicketRow[]> {
  const params = new URLSearchParams(filters as Record<string, string>);
  const res = await fetch(`${API_BASE}/v1/tickets?${params}`, {
    headers: { 'Authorization': `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error('Failed to fetch tickets');
  return res.json();
}

export async function getTimeline(ticket_id: string): Promise<TimelineEvent[]> {
  const res = await fetch(`${API_BASE}/v1/tickets/${ticket_id}/timeline`, {
    headers: { 'Authorization': `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error('Failed to fetch timeline');
  return res.json();
}

export async function postOutboundIntent(payload: {
  ticket_id: string;
  template_id: string;
  variables: Record<string, string>;
}): Promise<{ intent_id: string; status: string }> {
  const res = await fetch(`${API_BASE}/v1/outbound-intents`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to post outbound intent');
  return res.json();
}

function getToken(): string {
  // replaced by next-auth session token in real implementation
  return 'mock-token';
}
```

---

## RBAC rules (enforce in every component)

```
HOSPITAL_OPS_LEAD  → can: view tickets, send templates, generate upload links, close ticket
TPA_OPS            → can: view escalations queue, confirm/resolve, add internal notes (PHI-safe)
ADMIN              → can: everything + kill switch + template governance + tenant setup
AUDIT              → can: read-only audit viewer only, no comms actions
```

**Critical rule:** Hospital-facing views must NEVER show: `source_id`, `dataset_version`, `trace_id`, or internal evidence metadata. Evidence Drawer loads from a separate endpoint and requires `TPA_OPS` or `ADMIN` role.

---

## Screen 1 — Tickets List (`/tickets`)

**Purpose:** Main ops command center. 95% of actions should be doable without leaving this screen.

**Tabs (default):**
- Assigned to me
- Unassigned
- At-risk (SLA)
- NoSource

**Filters (sticky top bar):**
- Trust state: VERIFIED / STALE / MISMATCH / NOSOURCE
- Reason code: dropdown (all ReasonCode values)
- Age bucket: 0–2h / 2–24h / 1–3d / >3d
- Payer / Hospital (text search)

**Table columns:**
`Ticket ID | Claim ID | Hospital | Payer | Trust Badge | Status | TAT | Last Ping | Owner | Next Action`

**Row quick actions (show on hover, no modal):**
- Send Status Update (template)
- Send Pending Docs + Upload Link
- Escalate
- Open Timeline

**Trust Badge colors:**
- VERIFIED → green
- STALE → amber
- MISMATCH → orange
- NOSOURCE → red/gray

**TAT Chip:** Show days remaining. If < 3 days → red. Tooltip: "Clock basis: last required doc received (IRDAI)"

---

## Screen 2 — Ticket Detail (`/tickets/[id]`)

**Layout:** 70% left (timeline) / 30% right (context panel)

**Timeline:** Fetch from `GET /v1/tickets/{id}/timeline`. Show events chronologically. Filter buttons: All / Comms only / System only / Docs only.

**Event rendering per type:**
- `INBOUND_WA` → incoming message bubble (no raw text, show length + type)
- `OUTBOUND_TEMPLATE` → outgoing template (show template_id + version)
- `DOC_RECEIVED` → receipt card (hash, doc_type, size)
- `POLICY_BLOCKED` → red blocked banner (reason_code)
- `TRUTH_READINESS` → freshness event (readiness + freshness_ok)
- `CASE_LINKED` → case creation event (reason)
- `DOC_UPLOAD_LINK_CREATED` → upload link created (expiry)

**Context panel (right 30%):**
- Trust Badge + Freshness watermark (always pinned top)
- Status snapshot card
- Pending docs checklist
- Query reason
- Risk flags
- Next action button (template-only, no free text)
- TAT chip with "TAT started on: {date}" label

**Template Composer (modal):**
- Select from allowed templates for this ticket's reason_code
- Fill allowlisted variables only
- Preview before send
- Submit → POST /v1/outbound-intents
- BLOCK free text input at UI level

---

## Left sidebar navigation

```
Inbox (Tickets List)     ← default
Cases / Claims
Templates & Playbooks    ← read-only in Q2
Docs
Integrations
Audit & Compliance
Admin                    ← ADMIN role only

--- coming soon (visible, disabled) ---
Voice Operations
Agent Studio
Exports
SLA & Insights
```

---

## Design system

- **Colors:** Trust Blue primary (`#185FA5`), success green (`#1D9E75`), amber warning (`#BA7517`), danger red (`#E24B4A`)
- **Background:** Dark (`#0A0F1E`) for sidebar, light white surface for main content
- **Typography:** Clean sans-serif, dense tables, enterprise feel — NOT a consumer app
- **No decorative elements** — this is a compliance tool, not a marketing page
- **Density:** Tables should be dense (compact row height), not spacious

---

## What NOT to build (Q2 scope lock)

- NO free-text outbound anywhere
- NO template editor (read-only directory only)
- NO exports (viewer only)
- NO live chat or voice
- NO multi-tenant switcher for non-admins
- NO open Internal Notes text box

---

## Mock data for dev

Seed the app with 5–8 mock tickets covering all trust states (VERIFIED, STALE, NOSOURCE, MISMATCH) and all reason codes. Timeline for each ticket should have 4–6 events of different types. This lets the UI be developed and demoed without the backend running.

---

## Start here (Week 9 Day 1 minimum)

1. Scaffold Next.js app with above folder structure
2. Create `lib/types.ts` with all types above
3. Create `lib/api/tickets.ts` with mock fallback
4. Build `TicketTable.tsx` with mock data rendering
5. Build `TrustBadge.tsx` component
6. Wire up `/tickets` page with table + filters
7. Build basic `/tickets/[id]` with timeline rendering

Do NOT start with auth, admin, or coming-soon screens. Ship the ticket list + ticket detail first.
