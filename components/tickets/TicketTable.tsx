import { Ticket } from "@/types";
import { TicketRow } from "./TicketRow";

export function TicketTable({ tickets }: { tickets: Ticket[] }) {
  if (tickets.length === 0) {
    return (
      <div className="rounded-lg border border-border-default bg-bg-secondary p-8 text-center">
        <p className="text-sm text-text-tertiary">No tickets match the current filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tickets.map((ticket) => (
        <TicketRow key={ticket.ticket_id} ticket={ticket} />
      ))}
    </div>
  );
}
