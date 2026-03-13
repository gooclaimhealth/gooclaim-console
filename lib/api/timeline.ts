import { mockTimeline } from "@/lib/mock-data";
import { API_BASE, USE_MOCK_API, withMockLatency } from "@/lib/config";
import { TimelineEvent } from "@/lib/types";

export async function getTimeline(ticket_id: string): Promise<TimelineEvent[]> {
  if (USE_MOCK_API) {
    return withMockLatency(mockTimeline[ticket_id] ?? []);
  }

  try {
    const res = await fetch(`${API_BASE}/v1/tickets/${ticket_id}/timeline`, {
      headers: { Authorization: "Bearer mock-token" },
      cache: "no-store"
    });
    if (!res.ok) {
      throw new Error("Failed to fetch timeline");
    }
    return res.json();
  } catch {
    return withMockLatency(mockTimeline[ticket_id] ?? []);
  }
}
