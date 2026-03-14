import { getTickets } from "@/lib/api/tickets";
import { TicketsView } from "./tickets-view";

export default async function TicketsPage() {
  const tickets = await getTickets();
  return <TicketsView initialTickets={tickets} />;
}
