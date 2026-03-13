"use client";

import { useTimeline } from "@/hooks/useTimeline";
import { TimelineEvent } from "@/components/timeline/TimelineEvent";
import { TimelineEvent as TimelineEventType } from "@/lib/types";

const filters = [
  { id: "ALL", label: "All" },
  { id: "COMMS", label: "Comms only" },
  { id: "SYSTEM", label: "System only" },
  { id: "DOCS", label: "Docs only" }
] as const;

export function Timeline({ events }: { events: TimelineEventType[] }) {
  const { filter, setFilter, filteredEvents } = useTimeline(events);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id)}
            className={`rounded-full px-3 py-1.5 text-sm ${filter === item.id ? "bg-trust-blue text-white" : "bg-white text-slate-600 border border-slate-200"}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <TimelineEvent key={event.event_id} event={event} />
        ))}
      </div>
    </div>
  );
}
