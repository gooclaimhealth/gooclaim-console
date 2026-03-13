import { getTickets } from "@/lib/api/tickets";
import { TicketsView } from "./tickets-view";

export default async function TicketsPage() {
  const tickets = await getTickets();
  const killSwitchActive = process.env.NEXT_PUBLIC_KILL_SWITCH_ACTIVE === "true";

  return (
    <div className="space-y-4">
      {killSwitchActive ? (
        <div className="w-full rounded-xl border border-red-200 bg-red-600 px-4 py-3 text-sm font-semibold text-white">
          Kill switch ACTIVE — all outbound messaging is blocked
        </div>
      ) : null}
      <TicketsView initialTickets={tickets} />
    </div>
  );
}
