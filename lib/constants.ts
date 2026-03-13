import type { Route } from "next";
import { QueueId, ReasonCode, TrustState } from "@/lib/types";

export const TRUST_STATES: TrustState[] = ["VERIFIED", "STALE", "MISMATCH", "NOSOURCE"];

export const REASON_CODES: ReasonCode[] = [
  "TRUTH_NOT_CONNECTED",
  "TRUTH_DATA_STALE",
  "TRUTH_MISMATCH",
  "MISSING_CLAIM_ID",
  "NO_SOURCE",
  "OUTBOUND_SEND_FAILED",
  "BLOCKED_POLICY",
  "T1_FORBIDDEN_MATCH",
  "T2_ML_BLOCK",
  "NOSOURCE_BLOCK"
];

export const QUEUE_IDS: QueueId[] = [
  "HOSPITAL_QUEUE",
  "TPA_QUEUE",
  "ESCALATIONS",
  "DOCS_PENDING",
  "UNASSIGNED"
];

export const NAV_ITEMS: ReadonlyArray<{
  href: Route;
  label: string;
  role?: "ADMIN";
}> = [
  { href: "/tickets", label: "Inbox (Tickets List)" },
  { href: "/cases", label: "Cases / Claims" },
  { href: "/templates", label: "Templates & Playbooks" },
  { href: "/docs", label: "Docs" },
  { href: "/integrations", label: "Integrations" },
  { href: "/audit", label: "Audit & Compliance" },
  { href: "/admin", label: "Admin", role: "ADMIN" }
] as const;

export const COMING_SOON_ITEMS = [
  "Voice Operations",
  "Agent Studio",
  "Exports",
  "SLA & Insights"
] as const;

export const ROLE_LABELS = {
  HOSPITAL_OPS_LEAD: "Hospital Ops Lead",
  TPA_OPS: "TPA Ops",
  ADMIN: "Admin",
  AUDIT: "Audit"
} as const;
