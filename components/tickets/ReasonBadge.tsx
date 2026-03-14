import { ReasonCode } from "@/types";
import { cn } from "@/lib/utils";

const REASON_STYLES: Record<ReasonCode, string> = {
  VERIFIED: "bg-accent-green/15 text-accent-green border-accent-green/20",
  TRUTH_STALE: "bg-accent-amber/15 text-accent-amber border-accent-amber/20",
  NO_SOURCE: "bg-text-tertiary/15 text-text-tertiary border-text-tertiary/20",
  LOW_CONFIDENCE: "bg-accent-amber/15 text-accent-amber border-accent-amber/20",
  ESCALATED: "bg-accent-red/15 text-accent-red border-accent-red/20",
  MISSING_CLAIM_ID: "bg-text-tertiary/15 text-text-tertiary border-text-tertiary/20"
};

const REASON_LABELS: Record<ReasonCode, string> = {
  VERIFIED: "VERIFIED",
  TRUTH_STALE: "TRUTH_STALE",
  NO_SOURCE: "NO_SOURCE",
  LOW_CONFIDENCE: "LOW_CONFIDENCE",
  ESCALATED: "ESCALATED",
  MISSING_CLAIM_ID: "MISSING_CLAIM_ID"
};

export function ReasonBadge({ reason }: { reason: ReasonCode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-mono font-medium tracking-wide",
        REASON_STYLES[reason]
      )}
    >
      {REASON_LABELS[reason]}
    </span>
  );
}
