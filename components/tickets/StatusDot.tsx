import { TicketStatus } from "@/types";
import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<TicketStatus, string> = {
  RESOLVED: "bg-accent-green",
  OPEN: "bg-accent-amber",
  ESCALATED: "bg-accent-red",
  INTAKE: "bg-text-tertiary"
};

export function StatusDot({ status }: { status: TicketStatus }) {
  return (
    <span
      className={cn("inline-block h-2.5 w-2.5 rounded-full shrink-0", STATUS_COLORS[status])}
      title={status}
    />
  );
}
