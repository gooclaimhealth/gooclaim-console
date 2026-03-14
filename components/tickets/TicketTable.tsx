"use client";

import { useState } from "react";
import { TemplateComposer } from "@/components/modals/TemplateComposer";
import { UploadLinkModal } from "@/components/modals/UploadLinkModal";
import { TicketRow } from "@/components/tickets/TicketRow";
import { TicketRow as TicketRowType } from "@/lib/types";

export function TicketTable({ tickets }: { tickets: TicketRowType[] }) {
  const [composerTicket, setComposerTicket] = useState<TicketRowType | null>(null);
  const [uploadTicket, setUploadTicket] = useState<TicketRowType | null>(null);

  return (
    <>
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-panel lg:block">
        <table className="min-w-full table-fixed">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.18em] text-slate-500">
            <tr>
              {["Ticket ID", "Claim ID", "Hospital", "Payer", "Trust Badge", "Status", "TAT", "Last Ping", "Owner", "Next Action"].map((header) => (
                <th key={header} className={`px-3 py-3 font-medium ${header === "Trust Badge" ? "text-center" : ""}`}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <TicketRow key={ticket.ticket_id} ticket={ticket} onCompose={setComposerTicket} onUpload={setUploadTicket} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="space-y-3 lg:hidden">
        {tickets.map((ticket) => (
          <div key={ticket.ticket_id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-panel">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Ticket ID</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{ticket.ticket_id}</p>
              </div>
              <div className="shrink-0">
                <TicketRow ticket={ticket} onCompose={setComposerTicket} onUpload={setUploadTicket} mobile />
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Claim ID</p>
                <p className="mt-1 text-sm text-slate-700">{ticket.claim_id ?? "Missing"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Trust</p>
                <div className="mt-1">
                  <TicketRow ticket={ticket} onCompose={setComposerTicket} onUpload={setUploadTicket} mobileBadge />
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Hospital</p>
                <p className="mt-1 text-sm text-slate-700">{ticket.hospital}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Payer</p>
                <p className="mt-1 text-sm text-slate-700">{ticket.payer}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Status</p>
                <p className="mt-1 text-sm text-slate-700">{ticket.status}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Owner</p>
                <p className="mt-1 text-sm text-slate-700">{ticket.owner.user_id ?? ticket.owner.queue_id}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">TAT</p>
                <div className="mt-1">
                  <TicketRow ticket={ticket} onCompose={setComposerTicket} onUpload={setUploadTicket} mobileTat />
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Last Ping</p>
                <p className="mt-1 text-sm text-slate-700">{new Date(ticket.last_inbound_ping).toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {composerTicket ? (
        <TemplateComposer
          open={Boolean(composerTicket)}
          onOpenChange={(open) => !open && setComposerTicket(null)}
          ticketId={composerTicket.ticket_id}
          reasonCode={composerTicket.reason_code}
        />
      ) : null}
      {uploadTicket ? (
        <UploadLinkModal open={Boolean(uploadTicket)} onOpenChange={(open) => !open && setUploadTicket(null)} ticketId={uploadTicket.ticket_id} />
      ) : null}
    </>
  );
}
