export type TrustState = "VERIFIED" | "STALE" | "MISMATCH" | "NOSOURCE";

export type ReasonCode =
  | "TRUTH_NOT_CONNECTED"
  | "TRUTH_DATA_STALE"
  | "TRUTH_MISMATCH"
  | "MISSING_CLAIM_ID"
  | "NO_SOURCE"
  | "OUTBOUND_SEND_FAILED"
  | "BLOCKED_POLICY"
  | "T1_FORBIDDEN_MATCH"
  | "T2_ML_BLOCK"
  | "NOSOURCE_BLOCK";

export type UserRole = "HOSPITAL_OPS_LEAD" | "TPA_OPS" | "ADMIN" | "AUDIT";

export type QueueId =
  | "HOSPITAL_QUEUE"
  | "TPA_QUEUE"
  | "ESCALATIONS"
  | "DOCS_PENDING"
  | "UNASSIGNED";

export type TimelineEventType =
  | "INBOUND_WA"
  | "OUTBOUND_TEMPLATE"
  | "CASE_LINKED"
  | "TRUTH_READINESS"
  | "DOC_UPLOAD_LINK_CREATED"
  | "DOC_RECEIVED"
  | "POLICY_BLOCKED";

export interface TicketRow {
  ticket_id: string;
  claim_id: string | null;
  hospital: string;
  payer: string;
  trust_state: TrustState;
  reason_code: ReasonCode;
  status: string;
  tat_days_left: number | null;
  last_inbound_ping: string;
  last_system_update: string;
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
  ts: string;
  actor: string;
  payload_summary: Record<string, unknown>;
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

export interface TicketFilters {
  trust_state?: TrustState | "ALL";
  reason_code?: ReasonCode | "ALL";
  queue_id?: QueueId | "ALL";
  age_bucket?: "0_2H" | "2_24H" | "1_3D" | "GT_3D" | "ALL";
  search?: string;
  tab?: "ASSIGNED" | "UNASSIGNED" | "AT_RISK" | "NOSOURCE";
}
