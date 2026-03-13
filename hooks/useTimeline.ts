"use client";

import { useMemo, useState } from "react";
import { TimelineEvent } from "@/lib/types";

export function useTimeline(events: TimelineEvent[]) {
  const [filter, setFilter] = useState<"ALL" | "COMMS" | "SYSTEM" | "DOCS">("ALL");

  const filteredEvents = useMemo(() => {
    if (filter === "ALL") return events;
    if (filter === "COMMS") {
      return events.filter((event) => ["INBOUND_WA", "OUTBOUND_TEMPLATE"].includes(event.event_type));
    }
    if (filter === "DOCS") {
      return events.filter((event) => ["DOC_RECEIVED", "DOC_UPLOAD_LINK_CREATED"].includes(event.event_type));
    }
    return events.filter((event) => ["CASE_LINKED", "TRUTH_READINESS", "POLICY_BLOCKED"].includes(event.event_type));
  }, [events, filter]);

  return { filter, setFilter, filteredEvents };
}
