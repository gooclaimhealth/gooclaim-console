import Link from "next/link";
import { Ticket } from "@/types";
import { StatusDot } from "./StatusDot";
import { ReasonBadge } from "./ReasonBadge";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

const OUTCOME_LABELS: Record<string, string> = {
  resolved: "🤖 Agent resolved",
  escalated: "⚠️ Escalated",
  exception: "🔴 Exception"
};

export function TicketRow({ ticket }: { ticket: Ticket }) {
  return (
    <Link
      href={`/tickets/${ticket.ticket_id}`}
      className="block rounded-lg border border-border-default bg-bg-secondary p-4 transition-colors hover:bg-bg-tertiary"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <StatusDot status={ticket.status} />
          <span className="font-mono text-sm font-medium text-text-primary">
            {ticket.ticket_id}
          </span>
          <ReasonBadge reason={ticket.reason_code} />
        </div>
        <span className="shrink-0 font-mono text-xs text-text-tertiary">
          {timeAgo(ticket.created_at)}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm text-text-secondary">{ticket.message}</span>
        <span className="shrink-0 text-xs text-text-tertiary">TPA: {ticket.tenant}</span>
      </div>

      <div className="mt-2 border-t border-border-default pt-2">
        <span className="text-xs text-text-secondary">
          {OUTCOME_LABELS[ticket.agent_outcome] ?? ticket.agent_outcome}
          {ticket.reason_code !== "VERIFIED" && ticket.reason_code !== "MISSING_CLAIM_ID" && (
            <span className="text-text-tertiary">
              {" "}— {ticket.reason_code.replace(/_/g, " ").toLowerCase()}
            </span>
          )}
        </span>
      </div>
    </Link>
  );
}
