"use client";

import { useMemo, useState } from "react";
import { filterTickets } from "@/lib/api/tickets";
import { Ticket, TicketFilters } from "@/types";

const initialFilters: TicketFilters = {
  tab: "ALL",
  search: undefined
};

export function useTickets(tickets: Ticket[]) {
  const [filters, setFilters] = useState<TicketFilters>(initialFilters);

  const filteredTickets = useMemo(() => filterTickets(tickets, filters), [tickets, filters]);

  return {
    filters,
    setFilters,
    filteredTickets
  };
}
