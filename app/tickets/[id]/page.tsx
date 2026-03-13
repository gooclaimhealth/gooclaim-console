import { notFound } from "next/navigation";
import { TicketDetailView } from "./ticket-detail-view";
import { getTicketById } from "@/lib/api/tickets";
import { getTimeline } from "@/lib/api/timeline";

export default async function TicketDetailPage({ params }: { params: { id: string } }) {
  const [ticket, events] = await Promise.all([getTicketById(params.id), getTimeline(params.id)]);
  const killSwitchActive = process.env.NEXT_PUBLIC_KILL_SWITCH_ACTIVE === "true";

  if (!ticket) {
    notFound();
  }

  return (
    <div className="space-y-4">
      {killSwitchActive ? (
        <div className="w-full rounded-xl border border-red-200 bg-red-600 px-4 py-3 text-sm font-semibold text-white">
          Kill switch ACTIVE — all outbound messaging is blocked
        </div>
      ) : null}
      <TicketDetailView ticket={ticket} events={events} killSwitchActive={killSwitchActive} />
    </div>
  );
}
