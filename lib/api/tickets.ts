import { mockTicketDetails, mockTickets } from "@/lib/mock-data";
import { API_BASE, USE_MOCK_API, withMockLatency } from "@/lib/config";
import { TicketDetail, TicketFilters, TicketRow } from "@/lib/types";

export async function getTickets(filters?: {
  trust_state?: string;
  reason_code?: string;
  queue_id?: string;
}): Promise<TicketRow[]> {
  if (USE_MOCK_API) {
    return withMockLatency(mockTickets);
  }

  try {
    const params = new URLSearchParams(filters as Record<string, string>);
    const res = await fetch(`${API_BASE}/v1/tickets?${params}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      cache: "no-store"
    });
    if (!res.ok) {
      throw new Error("Failed to fetch tickets");
    }
    return res.json();
  } catch {
    return withMockLatency(mockTickets);
  }
}

export async function getTicketById(ticketId: string): Promise<TicketDetail | null> {
  if (USE_MOCK_API) {
    return withMockLatency(mockTicketDetails[ticketId] ?? null);
  }

  try {
    const res = await fetch(`${API_BASE}/v1/tickets/${ticketId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      cache: "no-store"
    });
    if (!res.ok) {
      throw new Error("Failed to fetch ticket detail");
    }
    return res.json();
  } catch {
    return withMockLatency(mockTicketDetails[ticketId] ?? null);
  }
}

export async function postOutboundIntent(payload: {
  ticket_id: string;
  template_id: string;
  variables: Record<string, string>;
}): Promise<{ intent_id: string; status: string }> {
  if (USE_MOCK_API) {
    return withMockLatency({
      intent_id: `mock-intent-${payload.ticket_id}-${payload.template_id}`,
      status: "queued"
    });
  }

  try {
    const res = await fetch(`${API_BASE}/v1/outbound-intents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      throw new Error("Failed to post outbound intent");
    }
    return res.json();
  } catch {
    return withMockLatency({
      intent_id: `mock-intent-${payload.ticket_id}`,
      status: "queued"
    });
  }
}

export function filterTickets(tickets: TicketRow[], filters: TicketFilters): TicketRow[] {
  return tickets.filter((ticket) => {
    if (filters.tab === "ASSIGNED" && !ticket.owner.user_id) return false;
    if (filters.tab === "UNASSIGNED" && ticket.owner.queue_id !== "UNASSIGNED") return false;
    if (filters.tab === "AT_RISK" && (ticket.tat_days_left === null || ticket.tat_days_left >= 3)) return false;
    if (filters.tab === "NOSOURCE" && ticket.trust_state !== "NOSOURCE") return false;
    if (filters.trust_state && filters.trust_state !== "ALL" && ticket.trust_state !== filters.trust_state) return false;
    if (filters.reason_code && filters.reason_code !== "ALL" && ticket.reason_code !== filters.reason_code) return false;
    if (filters.queue_id && filters.queue_id !== "ALL" && ticket.owner.queue_id !== filters.queue_id) return false;
    if (filters.age_bucket && filters.age_bucket !== "ALL") {
      const ageHours = (Date.now() - new Date(ticket.last_inbound_ping).getTime()) / 36e5;
      if (filters.age_bucket === "0_2H" && ageHours > 2) return false;
      if (filters.age_bucket === "2_24H" && (ageHours <= 2 || ageHours > 24)) return false;
      if (filters.age_bucket === "1_3D" && (ageHours <= 24 || ageHours > 72)) return false;
      if (filters.age_bucket === "GT_3D" && ageHours <= 72) return false;
    }
    if (filters.search) {
      const needle = filters.search.toLowerCase();
      const haystack = [ticket.ticket_id, ticket.claim_id ?? "", ticket.hospital, ticket.payer].join(" ").toLowerCase();
      if (!haystack.includes(needle)) return false;
    }
    return true;
  });
}

function getToken(): string {
  return "mock-token";
}
