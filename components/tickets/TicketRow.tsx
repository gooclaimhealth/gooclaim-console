"use client";

import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        <Button
          variant="secondary"
          size="sm"
          className={statusUpdateBlocked ? "cursor-not-allowed bg-slate-200 text-slate-500 hover:bg-slate-200" : ""}
          onClick={() => onCompose(ticket)}
          disabled={statusUpdateBlocked}
        >
          Send Status Update
        </Button>
        <Button variant="secondary" size="sm" onClick={() => onUpload(ticket)}>
          Pending Docs + Link
        </Button>
        <Button asChild variant="secondary" size="sm">
          <Link href={`/tickets/${ticket.ticket_id}`}>Open Timeline</Link>
        </Button>
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
      <td className="px-3 py-3 text-center">
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
          <Button
            variant="secondary"
            size="sm"
            className={statusUpdateBlocked ? "cursor-not-allowed bg-slate-200 text-slate-500 hover:bg-slate-200" : ""}
            onClick={() => onCompose(ticket)}
            disabled={statusUpdateBlocked}
          >
            Send Status Update
          </Button>
          <Button variant="secondary" size="sm" onClick={() => onUpload(ticket)}>
            Pending Docs + Link
          </Button>
          <Button asChild variant="secondary" size="sm">
            <Link href={`/tickets/${ticket.ticket_id}`}>Open Timeline</Link>
          </Button>
          <MoreHorizontal className="hidden h-4 w-4 text-slate-300 group-hover:text-slate-500 xl:block" />
        </div>
      </td>
    </tr>
  );
}
