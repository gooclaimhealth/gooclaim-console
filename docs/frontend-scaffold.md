# Frontend Scaffold Diagram

This document shows the current frontend scaffold for the Gooclaim console UI.

## App Shell

```text
Gooclaim Console Frontend
|
+-- app/
|   |
|   +-- layout.tsx
|   +-- page.tsx
|   +-- globals.css
|
+-- components/
|   |
|   +-- console/
|   |   |
|   |   +-- sidebar.tsx
|   |   +-- topbar.tsx
|   |   +-- tickets-list.tsx
|   |   +-- ticket-detail.tsx
|   |   +-- admin.tsx
|   |   +-- templates.tsx
|   |   +-- onboarding-modal.tsx
|   |
|   +-- ui/
|       |
|       +-- button.tsx
|       +-- dialog.tsx
|       +-- sidebar.tsx
|       +-- input.tsx
|       +-- table.tsx
|       +-- ...shared primitives
|
+-- hooks/
|   |
|   +-- use-mobile.ts
|   +-- use-toast.ts
|
+-- lib/
|   |
|   +-- utils.ts
|
+-- public/
|
+-- styles/
    |
    +-- globals.css
```

## Screen Flow

```text
ConsolePage
|
+-- Sidebar
|   |
|   +-- Tickets
|   +-- Templates
|   +-- Admin
|   +-- System status shortcut -> Admin
|
+-- Topbar
|   |
|   +-- Kill switch mode pill
|   +-- Critical queue shortcut
|   +-- Guide
|   +-- Notifications
|
+-- Main Content
    |
    +-- Tickets Screen
    |   |
    |   +-- Header actions
    |   +-- Claim/ticket search
    |   +-- KPI cards
    |   +-- Ticket table
    |   +-- Row click -> Ticket Detail
    |
    +-- Ticket Detail Screen
    |   |
    |   +-- Ticket header
    |   +-- Event timeline
    |   +-- Claim context
    |   +-- Truth status
    |   +-- Exception actions
    |
    +-- Admin Screen
    |   |
    |   +-- System mode
    |   +-- Confirm dialog
    |   +-- Ops health
    |   +-- Tenant config
    |
    +-- Templates Screen
        |
        +-- Read-only registry
        +-- Status filter
        +-- Language filter
        +-- Template cards
```

## Ticket Page Layout

```text
+----------------------------------------------------------------------------------+
| Tickets                                                                          |
| [Review critical queue] [Find claim]                                             |
|                                                                                  |
| [Containment] [Total today] [Open] [Escalated]                                   |
+----------------------------------------------------------------------------------+
| Active tickets                                              [All] [Escalated]    |
|----------------------------------------------------------------------------------|
| TKT-001 | CLM-2024-001 | Automation escalated due to stale truth data | ...     |
| TKT-002 | CLM-2024-002 | Exception: Low confidence in verification | ...         |
+----------------------------------------------------------------------------------+
```

## Ticket Detail Layout

```text
+----------------------------------------------------------------------------------+
| Ticket TKT-001 · CLM-2024-001                      [ESCALATED · TRUTH_STALE]     |
+----------------------------------------------------------------------------------+
| Event Timeline                                   | Claim Context                 |
|--------------------------------------------------|------------------------------|
| ↓ 09:30 AM · Inbound · WhatsApp                  | Policy                        |
| ⚡ 09:35 AM · Router Decision                     | Hospital                      |
| ↑ 09:35 AM · Outbound · WhatsApp                 | Admission                     |
| ⚠ 09:40 AM · Exception Created                   | Amount                        |
|                                                  | Truth Status                  |
|                                                  | [Mark Resolved]               |
|                                                  | [Schedule Callback]           |
|                                                  | [Escalate Senior]             |
+----------------------------------------------------------------------------------+
```

## Admin Layout

```text
+----------------------------------------------------------------------------------+
| System Mode                                                                      |
| [NORMAL] [SAFE ONLY] [BLOCK ALL]                                                 |
| Active since Mar 14, 10:23 AM · Changed by admin@gooclaim.io                    |
| [Change System Mode]                                                             |
+----------------------------------------------------------------------------------+
| Ops Status                                                                       |
| Claims Data     WhatsApp API     Sender Worker     Queue                         |
+----------------------------------------------------------------------------------+
| Tenant Config                                                                    |
| Tenant ID     WABA     Dataset version                                           |
+----------------------------------------------------------------------------------+
```
