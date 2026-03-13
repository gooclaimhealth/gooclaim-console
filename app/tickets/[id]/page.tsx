import { notFound } from "next/navigation";
import { TicketDetailView } from "./ticket-detail-view";
import { getTicketById } from "@/lib/api/tickets";
import { getTimeline } from "@/lib/api/timeline";

export default async function TicketDetailPage({ params }: { params: { id: string } }) {
  const [ticket, events] = await Promise.all([getTicketById(params.id), getTimeline(params.id)]);

  if (!ticket) {
    notFound();
  }

  return <TicketDetailView ticket={ticket} events={events} />;
}
