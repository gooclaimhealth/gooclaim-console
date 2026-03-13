"use client";

import { useState } from "react";
import { FreshnessWatermark } from "@/components/shared/FreshnessWatermark";
import { NextActionButton } from "@/components/shared/NextActionButton";
import { TATChip } from "@/components/shared/TATChip";
import { TrustBadge } from "@/components/shared/TrustBadge";
import { TemplateComposer } from "@/components/modals/TemplateComposer";
import { Timeline } from "@/components/timeline/Timeline";
import { TicketDetail, TimelineEvent } from "@/lib/types";

export function TicketDetailView({
  ticket,
  events
}: {
  ticket: TicketDetail;
  events: TimelineEvent[];
}) {
  const [composerOpen, setComposerOpen] = useState(false);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,7fr)_minmax(320px,3fr)]">
      <section className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Ticket Detail</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-950">{ticket.ticket_id}</h1>
        </div>
        <Timeline events={events} />
      </section>
      <aside className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel">
          <div className="flex items-center justify-between">
            <TrustBadge state={ticket.trust_state} />
            <span className="text-sm font-medium text-slate-500">{ticket.claim_id ?? "No claim linked"}</span>
          </div>
          <div className="mt-4">
            <FreshnessWatermark freshnessTs={ticket.freshness_ts} />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Status snapshot</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{ticket.status_snapshot.status}</p>
          <p className="mt-1 text-sm text-slate-500">Last updated: {new Date(ticket.status_snapshot.last_updated).toLocaleString()}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Pending docs</p>
          <div className="mt-3 space-y-2">
            {ticket.pending_docs.length ? ticket.pending_docs.map((doc) => <label key={doc} className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" className="rounded border-slate-300" readOnly />{doc}</label>) : <p className="text-sm text-slate-500">No pending docs</p>}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Query reason</p>
          <p className="mt-2 text-sm text-slate-700">{ticket.query_reason ?? "No query reason recorded"}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-400">Risk flags</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {ticket.risk_flags.map((flag) => (
              <span key={flag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {flag}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel">
          <NextActionButton action={ticket.next_action} onClick={() => setComposerOpen(true)} />
          <div className="mt-4">
            <TATChip daysLeft={ticket.tat_days_left} startedOn={ticket.status_snapshot.last_updated} />
          </div>
        </div>
      </aside>
      <TemplateComposer open={composerOpen} onOpenChange={setComposerOpen} ticketId={ticket.ticket_id} reasonCode={ticket.reason_code} />
    </div>
  );
}
