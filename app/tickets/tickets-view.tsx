"use client";

import { useTickets } from "@/hooks/useTickets";
import { Ticket } from "@/types";
import { TicketFilters } from "@/components/tickets/TicketFilters";
import { TicketTable } from "@/components/tickets/TicketTable";
import { SummaryStrip } from "@/components/tickets/SummaryStrip";

export function TicketsView({ initialTickets }: { initialTickets: Ticket[] }) {
  const { filters, setFilters, filteredTickets } = useTickets(initialTickets);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-mono text-lg font-semibold text-text-primary">Tickets</h1>
      </div>
      <SummaryStrip tickets={initialTickets} />
      <TicketFilters filters={filters} onFiltersChange={setFilters} />
      <TicketTable tickets={filteredTickets} />
    </div>
  );
}
