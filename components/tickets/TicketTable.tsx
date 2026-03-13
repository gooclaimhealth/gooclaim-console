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
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-panel">
        <table className="min-w-full table-fixed">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.18em] text-slate-500">
            <tr>
              {["Ticket ID", "Claim ID", "Hospital", "Payer", "Trust Badge", "Status", "TAT", "Last Ping", "Owner", "Next Action"].map((header) => (
                <th key={header} className="px-3 py-3 font-medium">
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
