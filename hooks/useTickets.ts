"use client";

import { useMemo, useState } from "react";
import { filterTickets } from "@/lib/api/tickets";
import { TicketFilters, TicketRow } from "@/lib/types";

const initialFilters: TicketFilters = {
  trust_state: "ALL",
  reason_code: "ALL",
  queue_id: "ALL",
  age_bucket: "ALL",
  search: "",
  tab: "ASSIGNED"
};

export function useTickets(tickets: TicketRow[]) {
  const [filters, setFilters] = useState<TicketFilters>(initialFilters);

  const filteredTickets = useMemo(() => filterTickets(tickets, filters), [tickets, filters]);

  return {
    filters,
    setFilters,
    filteredTickets
  };
}
