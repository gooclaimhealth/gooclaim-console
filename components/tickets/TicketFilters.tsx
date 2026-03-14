"use client";

import { TicketFilters as Filters } from "@/types";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const TABS = [
  { value: "ALL", label: "All" },
  { value: "OPEN", label: "Open" },
  { value: "ESCALATED", label: "Escalated" },
  { value: "RESOLVED", label: "Resolved" }
] as const;

interface TicketFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function TicketFilters({ filters, onFiltersChange }: TicketFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-1 rounded-lg border border-border-default bg-bg-secondary p-1">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onFiltersChange({ ...filters, tab: tab.value })}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              filters.tab === tab.value
                ? "bg-accent-blue text-white"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-tertiary" />
        <input
          type="text"
          placeholder="Search by claim or ticket ID..."
          value={filters.search ?? ""}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value || undefined })}
          className="h-8 w-full rounded-md border border-border-default bg-bg-secondary pl-8 pr-3 text-xs text-text-primary placeholder:text-text-tertiary focus:border-accent-blue focus:outline-none sm:w-64"
        />
      </div>
    </div>
  );
}
