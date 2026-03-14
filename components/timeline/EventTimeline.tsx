"use client";

import { useState, useMemo } from "react";
import { TimelineEvent as TimelineEventType } from "@/types";
import { TimelineEvent } from "./TimelineEvent";
import { cn } from "@/lib/utils";

type FilterType = "ALL" | "COMMS" | "SYSTEM" | "EXCEPTIONS";

const FILTERS: { value: FilterType; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "COMMS", label: "Comms" },
  { value: "SYSTEM", label: "System" },
  { value: "EXCEPTIONS", label: "Exceptions" }
];

const FILTER_MAP: Record<FilterType, string[]> = {
  ALL: [],
  COMMS: ["INBOUND", "OUTBOUND"],
  SYSTEM: ["AGENT_DECISION", "KILL_SWITCH", "DOCUMENT"],
  EXCEPTIONS: ["EXCEPTION"]
};

export function EventTimeline({ events }: { events: TimelineEventType[] }) {
  const [filter, setFilter] = useState<FilterType>("ALL");

  const filtered = useMemo(() => {
    if (filter === "ALL") return events;
    const types = FILTER_MAP[filter];
    return events.filter((e) => types.includes(e.event_type));
  }, [events, filter]);

  return (
    <div className="space-y-3">
      <div className="flex gap-1">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
              filter === f.value
                ? "bg-bg-tertiary text-text-primary"
                : "text-text-tertiary hover:text-text-secondary"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <p className="text-sm text-text-tertiary py-4 text-center">No events in this category.</p>
        ) : (
          filtered.map((event) => (
            <TimelineEvent key={event.event_id} event={event} />
          ))
        )}
      </div>
    </div>
  );
}
