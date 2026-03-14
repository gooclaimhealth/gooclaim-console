import { Ticket, TicketDetail, TimelineEvent } from "@/types";

export const mockTickets: Ticket[] = [
  {
    ticket_id: "TKT-291",
    claim_id: "CLM7842",
    status: "ESCALATED",
    reason_code: "TRUTH_STALE",
    intent: "CLAIM_STATUS",
    created_at: "2026-03-14T10:42:00Z",
    tenant: "MediAssist",
    agent_outcome: "escalated",
    message: "Claim status query",
    channel: "WhatsApp"
  },
  {
    ticket_id: "TKT-290",
    claim_id: "CLM6634",
    status: "RESOLVED",
    reason_code: "VERIFIED",
    intent: "PENDING_DOCS",
    created_at: "2026-03-14T10:31:00Z",
    tenant: "MediAssist",
    agent_outcome: "resolved",
    message: "Pending documents query",
    channel: "WhatsApp"
  },
  {
    ticket_id: "TKT-289",
    claim_id: "CLM5521",
    status: "OPEN",
    reason_code: "LOW_CONFIDENCE",
    intent: "UNKNOWN",
    created_at: "2026-03-14T10:18:00Z",
    tenant: "MediAssist",
    agent_outcome: "exception",
    message: "Unclear intent after 2 attempts",
    channel: "WhatsApp"
  },
  {
    ticket_id: "TKT-288",
    claim_id: null,
    status: "RESOLVED",
    reason_code: "MISSING_CLAIM_ID",
    intent: "CLAIM_STATUS",
    created_at: "2026-03-14T09:55:00Z",
    tenant: "MediAssist",
    agent_outcome: "escalated",
    message: "No claim ID provided",
    channel: "WhatsApp"
  },
  {
    ticket_id: "TKT-287",
    claim_id: "CLM4419",
    status: "RESOLVED",
    reason_code: "VERIFIED",
    intent: "CLAIM_STATUS",
    created_at: "2026-03-14T09:30:00Z",
    tenant: "MediAssist",
    agent_outcome: "resolved",
    message: "Claim status check — routine",
    channel: "WhatsApp"
  },
  {
    ticket_id: "TKT-286",
    claim_id: "CLM3301",
    status: "OPEN",
    reason_code: "NO_SOURCE",
    intent: "PENDING_DOCS",
    created_at: "2026-03-14T09:12:00Z",
    tenant: "MediAssist",
    agent_outcome: "exception",
    message: "Document upload status",
    channel: "WhatsApp"
  },
  {
    ticket_id: "TKT-285",
    claim_id: "CLM2290",
    status: "ESCALATED",
    reason_code: "ESCALATED",
    intent: "CLAIM_STATUS",
    created_at: "2026-03-14T08:45:00Z",
    tenant: "MediAssist",
    agent_outcome: "escalated",
    message: "Repeated follow-up — escalated to senior",
    channel: "WhatsApp"
  },
  {
    ticket_id: "TKT-284",
    claim_id: "CLM1178",
    status: "RESOLVED",
    reason_code: "VERIFIED",
    intent: "CLAIM_STATUS",
    created_at: "2026-03-14T08:20:00Z",
    tenant: "MediAssist",
    agent_outcome: "resolved",
    message: "Claim approved notification",
    channel: "WhatsApp"
  }
];

export const mockTicketDetails: Record<string, TicketDetail> = {
  "TKT-291": {
    ...mockTickets[0],
    truth_status: "STALE",
    truth_last_updated: "2026-03-11T14:00:00Z",
    dataset_version: "v4",
    session_tier: "TIER_0",
    channel: "WhatsApp",
    timeline: []
  },
  "TKT-290": {
    ...mockTickets[1],
    truth_status: "VERIFIED",
    truth_last_updated: "2026-03-14T08:30:00Z",
    dataset_version: "v4",
    session_tier: "TIER_0",
    channel: "WhatsApp",
    timeline: []
  },
  "TKT-289": {
    ...mockTickets[2],
    truth_status: "UNAVAILABLE",
    truth_last_updated: "2026-03-14T09:00:00Z",
    dataset_version: "v4",
    session_tier: "TIER_0",
    channel: "WhatsApp",
    timeline: []
  },
  "TKT-288": {
    ...mockTickets[3],
    truth_status: "UNAVAILABLE",
    truth_last_updated: "2026-03-14T09:00:00Z",
    dataset_version: "v4",
    session_tier: "TIER_0",
    channel: "WhatsApp",
    timeline: []
  }
};

export const mockTimeline: Record<string, TimelineEvent[]> = {
  "TKT-291": [
    {
      event_id: "ev1",
      event_type: "INBOUND",
      timestamp: "2026-03-14T10:42:00Z",
      actor: "End User",
      summary: "Inbound — WhatsApp",
      detail: "CLM7842 status?",
      confidence: 0.94
    },
    {
      event_id: "ev2",
      event_type: "AGENT_DECISION",
      timestamp: "2026-03-14T10:42:05Z",
      actor: "Agent",
      summary: "Truth: STALE (dataset v4, updated 3 days ago)",
      detail: "Policy: DENY — freshness threshold exceeded",
      template_id: "TPL_STATUS_OK",
      template_version: "v3"
    },
    {
      event_id: "ev3",
      event_type: "EXCEPTION",
      timestamp: "2026-03-14T10:43:00Z",
      actor: "System",
      summary: "Exception Created",
      reason: "TRUTH_STALE",
      case_id: "TKT-291",
      detail: "Last updated 3 days ago — exceeds 24h threshold"
    }
  ],
  "TKT-290": [
    {
      event_id: "ev4",
      event_type: "INBOUND",
      timestamp: "2026-03-14T10:31:00Z",
      actor: "End User",
      summary: "Inbound — WhatsApp",
      detail: "CLM6634 pending documents?",
      confidence: 0.97
    },
    {
      event_id: "ev5",
      event_type: "AGENT_DECISION",
      timestamp: "2026-03-14T10:31:03Z",
      actor: "Agent",
      summary: "Truth: VERIFIED (dataset v4, updated 2h ago)",
      detail: "Policy: ALLOW",
      template_id: "TPL_PENDING_DOCS",
      template_version: "v2"
    },
    {
      event_id: "ev6",
      event_type: "OUTBOUND",
      timestamp: "2026-03-14T10:31:10Z",
      actor: "Agent",
      summary: "Sent — WhatsApp",
      detail: "Pending documents list sent to insured",
      delivery_status: "DELIVERED",
      template_id: "TPL_PENDING_DOCS",
      template_version: "v2"
    }
  ],
  "TKT-289": [
    {
      event_id: "ev7",
      event_type: "INBOUND",
      timestamp: "2026-03-14T10:18:00Z",
      actor: "End User",
      summary: "Inbound — WhatsApp",
      detail: "Unclear message — intent not parseable",
      confidence: 0.32
    },
    {
      event_id: "ev8",
      event_type: "AGENT_DECISION",
      timestamp: "2026-03-14T10:18:02Z",
      actor: "Agent",
      summary: "Intent: UNKNOWN (confidence: 0.32)",
      detail: "Below threshold — retry attempted"
    },
    {
      event_id: "ev9",
      event_type: "INBOUND",
      timestamp: "2026-03-14T10:20:00Z",
      actor: "End User",
      summary: "Inbound — WhatsApp (retry)",
      detail: "Second attempt — still unclear",
      confidence: 0.41
    },
    {
      event_id: "ev10",
      event_type: "EXCEPTION",
      timestamp: "2026-03-14T10:20:05Z",
      actor: "System",
      summary: "Exception Created",
      reason: "LOW_CONFIDENCE",
      case_id: "TKT-289",
      detail: "2 consecutive low-confidence attempts"
    }
  ],
  "TKT-288": [
    {
      event_id: "ev11",
      event_type: "INBOUND",
      timestamp: "2026-03-14T09:55:00Z",
      actor: "End User",
      summary: "Inbound — WhatsApp",
      detail: "What is my claim status?",
      confidence: 0.91
    },
    {
      event_id: "ev12",
      event_type: "AGENT_DECISION",
      timestamp: "2026-03-14T09:55:03Z",
      actor: "Agent",
      summary: "Intent: CLAIM_STATUS — no claim ID provided",
      detail: "Unable to match to a claim record"
    },
    {
      event_id: "ev13",
      event_type: "OUTBOUND",
      timestamp: "2026-03-14T09:55:10Z",
      actor: "Agent",
      summary: "Sent — WhatsApp",
      detail: "Requested claim ID from user",
      delivery_status: "DELIVERED",
      template_id: "TPL_REQUEST_CLAIM_ID",
      template_version: "v1"
    }
  ]
};
