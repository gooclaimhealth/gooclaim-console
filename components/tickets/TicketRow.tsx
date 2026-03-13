"use client";

import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { TrustBadge } from "@/components/shared/TrustBadge";
import { TATChip } from "@/components/shared/TATChip";
import { TicketRow as TicketRowType } from "@/lib/types";

export function TicketRow({
  ticket,
  onCompose,
  onUpload,
  mobile = false,
  mobileBadge = false,
  mobileTat = false
}: {
  ticket: TicketRowType;
  onCompose: (ticket: TicketRowType) => void;
  onUpload: (ticket: TicketRowType) => void;
  mobile?: boolean;
  mobileBadge?: boolean;
  mobileTat?: boolean;
}) {
  const killSwitchActive = process.env.NEXT_PUBLIC_KILL_SWITCH_ACTIVE === "true";
  const statusUpdateBlocked = killSwitchActive;

  if (mobileBadge) {
    return <TrustBadge state={ticket.trust_state} />;
  }

  if (mobileTat) {
    return <TATChip daysLeft={ticket.tat_days_left} />;
  }

  if (mobile) {
    return (
      <div className="flex flex-col gap-2">
        <button
          className={`rounded-md border px-2 py-2 text-xs ${statusUpdateBlocked ? "cursor-not-allowed border-slate-200 bg-slate-200 text-slate-500" : "border-slate-200 hover:bg-slate-50"}`}
          onClick={() => onCompose(ticket)}
          disabled={statusUpdateBlocked}
        >
          Send Status Update
        </button>
        <button className="rounded-md border border-slate-200 px-2 py-2 text-xs hover:bg-slate-50" onClick={() => onUpload(ticket)}>
          Pending Docs + Link
        </button>
        <Link href={`/tickets/${ticket.ticket_id}`} className="rounded-md border border-slate-200 px-2 py-2 text-center text-xs hover:bg-slate-50">
          Open Timeline
        </Link>
      </div>
    );
  }

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
        <div className="flex flex-wrap items-center gap-2">
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
          <MoreHorizontal className="hidden h-4 w-4 text-slate-300 group-hover:text-slate-500 xl:block" />
        </div>
      </td>
    </tr>
  );
}
