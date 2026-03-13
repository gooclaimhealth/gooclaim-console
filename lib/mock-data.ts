import { TicketDetail, TicketRow, TimelineEvent } from "@/lib/types";

export const mockTickets: TicketRow[] = [
  {
    ticket_id: "TKT-10481",
    claim_id: "CLM-900211",
    hospital: "MetroCare Hospital",
    payer: "Star Health",
    trust_state: "VERIFIED",
    reason_code: "TRUTH_NOT_CONNECTED",
    status: "Awaiting insured confirmation",
    tat_days_left: 6,
    last_inbound_ping: "2026-03-14T08:30:00.000Z",
    last_system_update: "2026-03-14T09:10:00.000Z",
    owner: { user_id: "u_lead_a", queue_id: "HOSPITAL_QUEUE" },
    next_action: {
      action_type: "SEND_STATUS_UPDATE",
      label: "Send Status Update",
      template_id: "status_update_v3",
      requires_role: "HOSPITAL_OPS_LEAD"
    },
    freshness_ts: "2026-03-14T08:58:00.000Z"
  },
  {
    ticket_id: "TKT-10482",
    claim_id: "CLM-900212",
    hospital: "Apex Multispeciality",
    payer: "Niva Bupa",
    trust_state: "STALE",
    reason_code: "TRUTH_DATA_STALE",
    status: "Freshness review pending",
    tat_days_left: 2,
    last_inbound_ping: "2026-03-13T16:10:00.000Z",
    last_system_update: "2026-03-14T06:40:00.000Z",
    owner: { queue_id: "UNASSIGNED" },
    next_action: {
      action_type: "SEND_STATUS_UPDATE",
      label: "Send Status Update",
      template_id: "stale_truth_followup_v2",
      requires_role: "HOSPITAL_OPS_LEAD"
    },
    freshness_ts: "2026-03-12T18:00:00.000Z"
  },
  {
    ticket_id: "TKT-10483",
    claim_id: null,
    hospital: "Sunrise Clinic",
    payer: "ICICI Lombard",
    trust_state: "MISMATCH",
    reason_code: "MISSING_CLAIM_ID",
    status: "Claim linkage required",
    tat_days_left: 4,
    last_inbound_ping: "2026-03-14T07:15:00.000Z",
    last_system_update: "2026-03-14T07:17:00.000Z",
    owner: { user_id: "u_lead_b", queue_id: "DOCS_PENDING" },
    next_action: {
      action_type: "SEND_PENDING_DOCS",
      label: "Send Pending Docs + Upload Link",
      template_id: "missing_claim_id_v1",
      requires_role: "HOSPITAL_OPS_LEAD"
    },
    freshness_ts: null
  },
  {
    ticket_id: "TKT-10484",
    claim_id: "CLM-900214",
    hospital: "Riverside Health",
    payer: "Aditya Birla",
    trust_state: "NOSOURCE",
    reason_code: "NO_SOURCE",
    status: "Evidence source unavailable",
    tat_days_left: 1,
    last_inbound_ping: "2026-03-13T04:30:00.000Z",
    last_system_update: "2026-03-14T05:00:00.000Z",
    owner: { queue_id: "ESCALATIONS" },
    next_action: {
      action_type: "ESCALATE",
      label: "Escalate",
      requires_role: "TPA_OPS",
      blocked_reason: "No connected source available"
    },
    freshness_ts: null
  },
  {
    ticket_id: "TKT-10485",
    claim_id: "CLM-900215",
    hospital: "Lotus Heart Centre",
    payer: "HDFC Ergo",
    trust_state: "MISMATCH",
    reason_code: "TRUTH_MISMATCH",
    status: "Benefit mismatch investigation",
    tat_days_left: 3,
    last_inbound_ping: "2026-03-12T21:22:00.000Z",
    last_system_update: "2026-03-14T03:11:00.000Z",
    owner: { user_id: "u_tpa_1", queue_id: "TPA_QUEUE" },
    next_action: {
      action_type: "ESCALATE",
      label: "Escalate",
      requires_role: "TPA_OPS"
    },
    freshness_ts: "2026-03-13T20:00:00.000Z"
  },
  {
    ticket_id: "TKT-10486",
    claim_id: "CLM-900216",
    hospital: "Unity Hospitals",
    payer: "Care Health",
    trust_state: "NOSOURCE",
    reason_code: "NOSOURCE_BLOCK",
    status: "Blocked by policy",
    tat_days_left: 0,
    last_inbound_ping: "2026-03-10T09:18:00.000Z",
    last_system_update: "2026-03-14T02:30:00.000Z",
    owner: { queue_id: "ESCALATIONS" },
    next_action: {
      action_type: "RESOLVE_BLOCK",
      label: "Resolve Policy Block",
      requires_role: "ADMIN",
      blocked_reason: "Policy blocked outbound workflow"
    },
    freshness_ts: null
  }
];

export const mockTicketDetails: Record<string, TicketDetail> = {
  "TKT-10481": {
    ticket_id: "TKT-10481",
    claim_id: "CLM-900211",
    trust_state: "VERIFIED",
    reason_code: "TRUTH_NOT_CONNECTED",
    freshness_ts: "2026-03-14T08:58:00.000Z",
    next_action: mockTickets[0].next_action,
    owner: mockTickets[0].owner,
    tat_days_left: 6,
    status_snapshot: {
      status: "Awaiting insured confirmation",
      last_updated: "2026-03-14T09:10:00.000Z"
    },
    pending_docs: ["Discharge summary", "Final bill"],
    query_reason: "Hospital requested milestone update after final review.",
    risk_flags: ["Payer SLA starts after all required docs are acknowledged."]
  },
  "TKT-10482": {
    ticket_id: "TKT-10482",
    claim_id: "CLM-900212",
    trust_state: "STALE",
    reason_code: "TRUTH_DATA_STALE",
    freshness_ts: "2026-03-12T18:00:00.000Z",
    next_action: mockTickets[1].next_action,
    owner: mockTickets[1].owner,
    tat_days_left: 2,
    status_snapshot: {
      status: "Freshness review pending",
      last_updated: "2026-03-14T06:40:00.000Z"
    },
    pending_docs: ["Updated insurer approval"],
    query_reason: "Truth source older than threshold for payer-linked claim status.",
    risk_flags: ["At-risk SLA", "Awaiting source refresh"]
  },
  "TKT-10483": {
    ticket_id: "TKT-10483",
    claim_id: null,
    trust_state: "MISMATCH",
    reason_code: "MISSING_CLAIM_ID",
    freshness_ts: null,
    next_action: mockTickets[2].next_action,
    owner: mockTickets[2].owner,
    tat_days_left: 4,
    status_snapshot: {
      status: "Claim linkage required",
      last_updated: "2026-03-14T07:17:00.000Z"
    },
    pending_docs: ["Claim form", "Payer reference sheet"],
    query_reason: "Inbound document set did not include payer claim identifier.",
    risk_flags: ["Manual claim mapping needed"]
  },
  "TKT-10484": {
    ticket_id: "TKT-10484",
    claim_id: "CLM-900214",
    trust_state: "NOSOURCE",
    reason_code: "NO_SOURCE",
    freshness_ts: null,
    next_action: mockTickets[3].next_action,
    owner: mockTickets[3].owner,
    tat_days_left: 1,
    status_snapshot: {
      status: "Evidence source unavailable",
      last_updated: "2026-03-14T05:00:00.000Z"
    },
    pending_docs: ["Member ID card"],
    query_reason: "No eligible source system configured for this payer and policy.",
    risk_flags: ["Escalation queue", "Near SLA breach"]
  },
  "TKT-10485": {
    ticket_id: "TKT-10485",
    claim_id: "CLM-900215",
    trust_state: "MISMATCH",
    reason_code: "TRUTH_MISMATCH",
    freshness_ts: "2026-03-13T20:00:00.000Z",
    next_action: mockTickets[4].next_action,
    owner: mockTickets[4].owner,
    tat_days_left: 3,
    status_snapshot: {
      status: "Benefit mismatch investigation",
      last_updated: "2026-03-14T03:11:00.000Z"
    },
    pending_docs: ["Policy schedule"],
    query_reason: "Policy benefits and received bill classification differ.",
    risk_flags: ["Review before outbound", "Potential policy block"]
  },
  "TKT-10486": {
    ticket_id: "TKT-10486",
    claim_id: "CLM-900216",
    trust_state: "NOSOURCE",
    reason_code: "NOSOURCE_BLOCK",
    freshness_ts: null,
    next_action: mockTickets[5].next_action,
    owner: mockTickets[5].owner,
    tat_days_left: 0,
    status_snapshot: {
      status: "Blocked by policy",
      last_updated: "2026-03-14T02:30:00.000Z"
    },
    pending_docs: [],
    query_reason: "Automated flow disabled due to no-source policy block.",
    risk_flags: ["SLA breached", "Admin intervention required"]
  }
};

export const mockTimeline: Record<string, TimelineEvent[]> = {
  "TKT-10481": [
    { event_id: "ev1", event_type: "CASE_LINKED", ts: "2026-03-13T10:00:00.000Z", actor: "system", payload_summary: { reason: "Linked from inbound claim message" } },
    { event_id: "ev2", event_type: "TRUTH_READINESS", ts: "2026-03-13T10:05:00.000Z", actor: "system", payload_summary: { readiness: "ready", freshness_ok: true } },
    { event_id: "ev3", event_type: "INBOUND_WA", ts: "2026-03-14T08:30:00.000Z", actor: "hospital_user", payload_summary: { message_type: "text", length: 118 } },
    { event_id: "ev4", event_type: "OUTBOUND_TEMPLATE", ts: "2026-03-14T09:00:00.000Z", actor: "u_lead_a", payload_summary: { status: "queued" }, template_id: "status_update_v3", template_version: 3, outbound_intent_id: "intent-481" },
    { event_id: "ev5", event_type: "DOC_RECEIVED", ts: "2026-03-14T09:10:00.000Z", actor: "system", payload_summary: { hash: "9f83ab2c", doc_type: "discharge_summary", size: "2.4 MB" }, receipt_id: "rcpt-481" }
  ],
  "TKT-10482": [
    { event_id: "ev6", event_type: "CASE_LINKED", ts: "2026-03-12T14:20:00.000Z", actor: "system", payload_summary: { reason: "Freshness exception case created" } },
    { event_id: "ev7", event_type: "TRUTH_READINESS", ts: "2026-03-12T18:00:00.000Z", actor: "system", payload_summary: { readiness: "stale", freshness_ok: false } },
    { event_id: "ev8", event_type: "INBOUND_WA", ts: "2026-03-13T16:10:00.000Z", actor: "hospital_user", payload_summary: { message_type: "document", length: 1 } },
    { event_id: "ev9", event_type: "DOC_UPLOAD_LINK_CREATED", ts: "2026-03-14T06:00:00.000Z", actor: "u_lead_a", payload_summary: { expiry: "2026-03-16T06:00:00.000Z" } }
  ],
  "TKT-10483": [
    { event_id: "ev10", event_type: "CASE_LINKED", ts: "2026-03-14T06:45:00.000Z", actor: "system", payload_summary: { reason: "Missing claim id" } },
    { event_id: "ev11", event_type: "INBOUND_WA", ts: "2026-03-14T07:15:00.000Z", actor: "hospital_user", payload_summary: { message_type: "image", length: 2 } },
    { event_id: "ev12", event_type: "DOC_UPLOAD_LINK_CREATED", ts: "2026-03-14T07:20:00.000Z", actor: "u_lead_b", payload_summary: { expiry: "2026-03-15T07:20:00.000Z" } },
    { event_id: "ev13", event_type: "OUTBOUND_TEMPLATE", ts: "2026-03-14T07:21:00.000Z", actor: "u_lead_b", payload_summary: { status: "sent" }, template_id: "missing_claim_id_v1", template_version: 1, outbound_intent_id: "intent-483" }
  ],
  "TKT-10484": [
    { event_id: "ev14", event_type: "CASE_LINKED", ts: "2026-03-13T02:00:00.000Z", actor: "system", payload_summary: { reason: "No source coverage" } },
    { event_id: "ev15", event_type: "TRUTH_READINESS", ts: "2026-03-13T02:03:00.000Z", actor: "system", payload_summary: { readiness: "nosource", freshness_ok: false } },
    { event_id: "ev16", event_type: "POLICY_BLOCKED", ts: "2026-03-14T05:00:00.000Z", actor: "system", payload_summary: { reason_code: "NO_SOURCE" } },
    { event_id: "ev17", event_type: "INBOUND_WA", ts: "2026-03-13T04:30:00.000Z", actor: "hospital_user", payload_summary: { message_type: "text", length: 88 } }
  ],
  "TKT-10485": [
    { event_id: "ev18", event_type: "CASE_LINKED", ts: "2026-03-12T20:20:00.000Z", actor: "system", payload_summary: { reason: "Benefit mismatch" } },
    { event_id: "ev19", event_type: "TRUTH_READINESS", ts: "2026-03-13T20:00:00.000Z", actor: "system", payload_summary: { readiness: "mismatch", freshness_ok: true } },
    { event_id: "ev20", event_type: "OUTBOUND_TEMPLATE", ts: "2026-03-14T02:10:00.000Z", actor: "u_tpa_1", payload_summary: { status: "queued" }, template_id: "mismatch_escalation_v2", template_version: 2, outbound_intent_id: "intent-485" },
    { event_id: "ev21", event_type: "DOC_RECEIVED", ts: "2026-03-14T03:00:00.000Z", actor: "system", payload_summary: { hash: "1ab47e9d", doc_type: "policy_schedule", size: "1.1 MB" }, receipt_id: "rcpt-485" }
  ],
  "TKT-10486": [
    { event_id: "ev22", event_type: "CASE_LINKED", ts: "2026-03-10T09:00:00.000Z", actor: "system", payload_summary: { reason: "No-source block" } },
    { event_id: "ev23", event_type: "POLICY_BLOCKED", ts: "2026-03-10T09:10:00.000Z", actor: "system", payload_summary: { reason_code: "NOSOURCE_BLOCK" } },
    { event_id: "ev24", event_type: "INBOUND_WA", ts: "2026-03-10T09:18:00.000Z", actor: "hospital_user", payload_summary: { message_type: "text", length: 52 } },
    { event_id: "ev25", event_type: "OUTBOUND_TEMPLATE", ts: "2026-03-14T02:20:00.000Z", actor: "admin_1", payload_summary: { status: "blocked" }, template_id: "policy_hold_v1", template_version: 1, outbound_intent_id: "intent-486" }
  ]
};
