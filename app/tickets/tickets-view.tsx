"use client";

import { useTickets } from "@/hooks/useTickets";
import { EnvironmentBanner } from "@/components/shared/EnvironmentBanner";
import { TicketRow } from "@/lib/types";
import { TicketFilters } from "@/components/tickets/TicketFilters";
import { TicketTable } from "@/components/tickets/TicketTable";

const tabs = [
  { id: "ASSIGNED", label: "Assigned to me" },
  { id: "UNASSIGNED", label: "Unassigned" },
  { id: "AT_RISK", label: "At-risk (SLA)" },
  { id: "NOSOURCE", label: "NoSource" }
] as const;

export function TicketsView({ initialTickets }: { initialTickets: TicketRow[] }) {
  const { filters, setFilters, filteredTickets } = useTickets(initialTickets);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Main Ops Command Center</p>
        <h1 className="mt-1 text-xl font-semibold text-slate-950 sm:text-2xl">Tickets</h1>
      </div>
      <EnvironmentBanner />
      <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilters({ ...filters, tab: tab.id })}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${filters.tab === tab.id ? "bg-trust-blue text-white" : "bg-white text-slate-600 border border-slate-200"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <TicketFilters filters={filters} onChange={setFilters} />
      <TicketTable tickets={filteredTickets} />
    </div>
  );
}
