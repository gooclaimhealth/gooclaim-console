import { notFound } from "next/navigation";
import { TicketDetailView } from "./ticket-detail-view";
import { getTicketById } from "@/lib/api/tickets";

export default async function TicketDetailPage({ params }: { params: { id: string } }) {
  const ticket = await getTicketById(params.id);

  if (!ticket) {
    notFound();
  }

  return <TicketDetailView ticket={ticket} />;
}
