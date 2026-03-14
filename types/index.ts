export type TicketStatus = "OPEN" | "ESCALATED" | "RESOLVED" | "INTAKE";

export type ReasonCode =
  | "VERIFIED"
  | "TRUTH_STALE"
  | "NO_SOURCE"
  | "LOW_CONFIDENCE"
  | "ESCALATED"
  | "MISSING_CLAIM_ID";

export type KillSwitchMode = "NORMAL" | "SAFE_ONLY" | "BLOCK_ALL";

export type ExceptionAction =
  | "MARK_RESOLVED"
  | "SCHEDULE_CALLBACK"
  | "ESCALATE_SENIOR";

export type TimelineEventType =
  | "INBOUND"
  | "AGENT_DECISION"
  | "OUTBOUND"
  | "EXCEPTION"
  | "KILL_SWITCH"
  | "DOCUMENT";

export type UserRole = "HOSPITAL_OPS_LEAD" | "TPA_OPS" | "ADMIN" | "AUDIT";

export interface Ticket {
  ticket_id: string;
  claim_id: string | null;
  status: TicketStatus;
  reason_code: ReasonCode;
  intent: string;
  created_at: string;
  tenant: string;
  agent_outcome: "resolved" | "escalated" | "exception";
  message: string;
  channel?: string;
}

export interface TicketDetail extends Ticket {
  truth_status: "VERIFIED" | "STALE" | "UNAVAILABLE";
  truth_last_updated: string;
  dataset_version: string;
  session_tier: string;
  channel: string;
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  event_id: string;
  event_type: TimelineEventType;
  timestamp: string;
  actor: string;
  summary: string;
  detail?: string;
  confidence?: number;
  template_id?: string;
  template_version?: string;
  delivery_status?: string;
  reason?: string;
  case_id?: string;
}

export interface Template {
  template_id: string;
  name: string;
  status: "active" | "inactive";
  version: string;
  content_en: string;
  content_hi: string;
  variables: string[];
  meta_approval: "approved" | "pending";
  type: "status" | "pending_docs" | "query_reason" | "system";
}

export interface ServiceHealth {
  name: string;
  status: "CONNECTED" | "RUNNING" | "HEALTHY" | "DEGRADED" | "DOWN";
  detail: string;
}

export interface AdminState {
  kill_switch_mode: KillSwitchMode;
  changed_by: string;
  changed_at: string;
  system_health: ServiceHealth[];
  tenant_config: {
    tenant_id: string;
    waba_phone: string;
    truth_provider: string;
    dataset_version: string;
    dataset_loaded_at: string;
    roles: string[];
  };
}

export interface TicketFilters {
  tab: "ALL" | "OPEN" | "ESCALATED" | "RESOLVED";
  search?: string;
  date_range?: { from: string; to: string };
}
