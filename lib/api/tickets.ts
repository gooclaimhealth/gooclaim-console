import { mockTicketDetails, mockTickets, mockTimeline } from "@/lib/mock/tickets.mock";
import { API_BASE, USE_MOCK_API, withMockLatency } from "@/lib/config";
import { ExceptionAction, Ticket, TicketDetail, TicketFilters, TimelineEvent } from "@/types";

export async function getTickets(): Promise<Ticket[]> {
  if (USE_MOCK_API) {
    return withMockLatency(mockTickets);
  }

  try {
    const res = await fetch(`${API_BASE}/v1/tickets`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      cache: "no-store"
    });
    if (!res.ok) throw new Error("Failed to fetch tickets");
    return res.json();
  } catch {
    return withMockLatency(mockTickets);
  }
}

export async function getTicketById(ticketId: string): Promise<TicketDetail | null> {
  if (USE_MOCK_API) {
    const detail = mockTicketDetails[ticketId];
    if (detail) {
      detail.timeline = mockTimeline[ticketId] ?? [];
    }
    return withMockLatency(detail ?? null);
  }

  try {
    const res = await fetch(`${API_BASE}/v1/tickets/${ticketId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      cache: "no-store"
    });
    if (!res.ok) throw new Error("Failed to fetch ticket detail");
    return res.json();
  } catch {
    const detail = mockTicketDetails[ticketId];
    if (detail) {
      detail.timeline = mockTimeline[ticketId] ?? [];
    }
    return withMockLatency(detail ?? null);
  }
}

export async function getTimeline(ticketId: string): Promise<TimelineEvent[]> {
  if (USE_MOCK_API) {
    return withMockLatency(mockTimeline[ticketId] ?? []);
  }

  try {
    const res = await fetch(`${API_BASE}/v1/tickets/${ticketId}/timeline`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      cache: "no-store"
    });
    if (!res.ok) throw new Error("Failed to fetch timeline");
    return res.json();
  } catch {
    return withMockLatency(mockTimeline[ticketId] ?? []);
  }
}

export async function performExceptionAction(
  ticketId: string,
  action: ExceptionAction
): Promise<{ success: boolean; message: string }> {
  if (USE_MOCK_API) {
    const messages: Record<ExceptionAction, string> = {
      MARK_RESOLVED: `Ticket ${ticketId} marked as resolved`,
      SCHEDULE_CALLBACK: `Callback scheduled for ticket ${ticketId}`,
      ESCALATE_SENIOR: `Ticket ${ticketId} escalated to senior ops`
    };
    return withMockLatency({ success: true, message: messages[action] });
  }

  try {
    const res = await fetch(`${API_BASE}/v1/tickets/${ticketId}/actions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({ action })
    });
    if (!res.ok) throw new Error("Failed to perform action");
    return res.json();
  } catch {
    return withMockLatency({ success: false, message: "Action failed" });
  }
}

export function filterTickets(tickets: Ticket[], filters: TicketFilters): Ticket[] {
  return tickets.filter((ticket) => {
    if (filters.tab !== "ALL" && ticket.status !== filters.tab) return false;
    if (filters.search) {
      const needle = filters.search.toLowerCase();
      const haystack = [ticket.ticket_id, ticket.claim_id ?? ""].join(" ").toLowerCase();
      if (!haystack.includes(needle)) return false;
    }
    return true;
  });
}

function getToken(): string {
  return "mock-token";
}
