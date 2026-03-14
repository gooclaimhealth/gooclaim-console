"use client";

import { useRouter } from "next/navigation";
import { TicketDetail } from "@/types";
import { EventTimeline } from "@/components/timeline/EventTimeline";
import { ClaimContextPanel } from "@/components/timeline/ClaimContextPanel";
import { ArrowLeft } from "lucide-react";

export function TicketDetailView({ ticket }: { ticket: TicketDetail }) {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/tickets")}
          className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <span className="font-mono text-lg font-semibold text-text-primary">
          {ticket.claim_id ?? ticket.ticket_id}
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
        <section>
          <EventTimeline events={ticket.timeline} />
        </section>
        <ClaimContextPanel ticket={ticket} />
      </div>
    </div>
  );
}
