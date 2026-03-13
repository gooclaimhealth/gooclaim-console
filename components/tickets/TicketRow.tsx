"use client";

import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { TrustBadge } from "@/components/shared/TrustBadge";
import { TATChip } from "@/components/shared/TATChip";
import { TicketRow as TicketRowType } from "@/lib/types";

export function TicketRow({
  ticket,
  onCompose,
  onUpload
}: {
  ticket: TicketRowType;
  onCompose: (ticket: TicketRowType) => void;
  onUpload: (ticket: TicketRowType) => void;
}) {
  const killSwitchActive = process.env.NEXT_PUBLIC_KILL_SWITCH_ACTIVE === "true";
  const statusUpdateBlocked = killSwitchActive;

  return (
    <tr className="group border-b border-slate-100 text-sm">
      <td className="px-3 py-3 font-medium text-slate-900">
        <Link href={`/tickets/${ticket.ticket_id}`} className="hover:text-trust-blue">
          {ticket.ticket_id}
        </Link>
      </td>
      <td className="px-3 py-3 text-slate-600">{ticket.claim_id ?? "Missing"}</td>
      <td className="px-3 py-3">{ticket.hospital}</td>
      <td className="px-3 py-3">{ticket.payer}</td>
      <td className="px-3 py-3">
        <TrustBadge state={ticket.trust_state} />
      </td>
      <td className="px-3 py-3 text-slate-600">{ticket.status}</td>
      <td className="px-3 py-3">
        <TATChip daysLeft={ticket.tat_days_left} />
      </td>
      <td className="px-3 py-3 text-slate-600">{new Date(ticket.last_inbound_ping).toLocaleString()}</td>
      <td className="px-3 py-3 text-slate-600">{ticket.owner.user_id ?? ticket.owner.queue_id}</td>
      <td className="px-3 py-3">
        <div className="flex items-center gap-2">
          <button
            className={`rounded-md border px-2 py-1 text-xs ${statusUpdateBlocked ? "cursor-not-allowed border-slate-200 bg-slate-200 text-slate-500" : "border-slate-200 hover:bg-slate-50"}`}
            onClick={() => onCompose(ticket)}
            disabled={statusUpdateBlocked}
          >
            Send Status Update
          </button>
          <button className="rounded-md border border-slate-200 px-2 py-1 text-xs hover:bg-slate-50" onClick={() => onUpload(ticket)}>
            Pending Docs + Link
          </button>
          <Link href={`/tickets/${ticket.ticket_id}`} className="rounded-md border border-slate-200 px-2 py-1 text-xs hover:bg-slate-50">
            Open Timeline
          </Link>
          <MoreHorizontal className="h-4 w-4 text-slate-300 group-hover:text-slate-500" />
        </div>
      </td>
    </tr>
  );
}
