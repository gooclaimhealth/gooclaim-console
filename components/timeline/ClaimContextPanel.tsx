"use client";

import { useState } from "react";
import { TicketDetail, ExceptionAction } from "@/types";
import { performExceptionAction } from "@/lib/api/tickets";
import { StatusDot } from "@/components/tickets/StatusDot";
import { ReasonBadge } from "@/components/tickets/ReasonBadge";

const TRUTH_COLORS: Record<string, string> = {
  VERIFIED: "text-accent-green",
  STALE: "text-accent-amber",
  UNAVAILABLE: "text-text-tertiary"
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

const ACTIONS: { action: ExceptionAction; label: string; style: string }[] = [
  {
    action: "MARK_RESOLVED",
    label: "Mark Resolved",
    style: "border-accent-green/30 text-accent-green hover:bg-accent-green/10"
  },
  {
    action: "SCHEDULE_CALLBACK",
    label: "Schedule Callback",
    style: "border-accent-amber/30 text-accent-amber hover:bg-accent-amber/10"
  },
  {
    action: "ESCALATE_SENIOR",
    label: "Escalate to Senior",
    style: "border-accent-red/30 text-accent-red hover:bg-accent-red/10"
  }
];

export function ClaimContextPanel({ ticket }: { ticket: TicketDetail }) {
  const [actionResult, setActionResult] = useState<string | null>(null);

  async function handleAction(action: ExceptionAction) {
    const confirmed = window.confirm(
      `Are you sure you want to ${action.replace(/_/g, " ").toLowerCase()}?`
    );
    if (!confirmed) return;

    const result = await performExceptionAction(ticket.ticket_id, action);
    setActionResult(result.message);
  }

  return (
    <aside className="space-y-4">
      {/* Ticket header */}
      <div className="rounded-lg border border-border-default bg-bg-secondary p-4">
        <div className="flex items-center gap-2 mb-3">
          <StatusDot status={ticket.status} />
          <span className="font-mono text-sm font-medium text-text-primary">
            {ticket.ticket_id}
          </span>
          <ReasonBadge reason={ticket.reason_code} />
        </div>
        <p className="text-sm text-text-secondary">{ticket.message}</p>
      </div>

      {/* Claim context */}
      <div className="rounded-lg border border-border-default bg-bg-secondary p-4">
        <p className="text-xs font-mono uppercase tracking-wide text-text-tertiary mb-3">
          Claim Context
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-tertiary">Truth status</span>
            <span className={`text-xs font-mono font-medium ${TRUTH_COLORS[ticket.truth_status] ?? "text-text-tertiary"}`}>
              {ticket.truth_status} {ticket.truth_status === "VERIFIED" ? "✓" : ""}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-tertiary">Last updated</span>
            <span className="text-xs font-mono text-text-secondary">
              {timeAgo(ticket.truth_last_updated)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-tertiary">Dataset</span>
            <span className="text-xs font-mono text-text-secondary">
              {ticket.dataset_version}
            </span>
          </div>

          <div className="border-t border-border-default pt-3 mt-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-tertiary">Session</span>
              <span className="text-xs font-mono text-text-secondary">
                {ticket.session_tier}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-tertiary">Channel</span>
            <span className="text-xs font-mono text-text-secondary">
              {ticket.channel}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-tertiary">Tenant</span>
            <span className="text-xs font-mono text-text-secondary">
              {ticket.tenant}
            </span>
          </div>
        </div>
      </div>

      {/* Exception actions */}
      <div className="rounded-lg border border-border-default bg-bg-secondary p-4">
        <p className="text-xs font-mono uppercase tracking-wide text-text-tertiary mb-3">
          Exception Actions
        </p>
        <div className="space-y-2">
          {ACTIONS.map(({ action, label, style }) => (
            <button
              key={action}
              onClick={() => handleAction(action)}
              className={`w-full rounded-md border px-3 py-2 text-xs font-medium transition-colors ${style}`}
            >
              {label}
            </button>
          ))}
        </div>
        {actionResult && (
          <p className="mt-3 text-xs text-accent-green font-mono">{actionResult}</p>
        )}
      </div>
    </aside>
  );
}
