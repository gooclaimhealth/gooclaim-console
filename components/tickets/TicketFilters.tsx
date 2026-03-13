"use client";

import { REASON_CODES, QUEUE_IDS, TRUST_STATES } from "@/lib/constants";
import { TicketFilters as TicketFiltersType } from "@/lib/types";

export function TicketFilters({
  filters,
  onChange
}: {
  filters: TicketFiltersType;
  onChange: (next: TicketFiltersType) => void;
}) {
  return (
    <div className="sticky top-0 z-10 rounded-2xl border border-slate-200 bg-white p-3 shadow-panel sm:p-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm" value={filters.trust_state} onChange={(e) => onChange({ ...filters, trust_state: e.target.value as TicketFiltersType["trust_state"] })}>
          <option value="ALL">Trust state</option>
          {TRUST_STATES.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm" value={filters.reason_code} onChange={(e) => onChange({ ...filters, reason_code: e.target.value as TicketFiltersType["reason_code"] })}>
          <option value="ALL">Reason code</option>
          {REASON_CODES.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
        <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm" value={filters.age_bucket} onChange={(e) => onChange({ ...filters, age_bucket: e.target.value as TicketFiltersType["age_bucket"] })}>
          <option value="ALL">Age bucket</option>
          <option value="0_2H">0-2h</option>
          <option value="2_24H">2-24h</option>
          <option value="1_3D">1-3d</option>
          <option value="GT_3D">&gt;3d</option>
        </select>
        <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm" value={filters.queue_id} onChange={(e) => onChange({ ...filters, queue_id: e.target.value as TicketFiltersType["queue_id"] })}>
          <option value="ALL">Queue</option>
          {QUEUE_IDS.map((queueId) => (
            <option key={queueId} value={queueId}>
              {queueId}
            </option>
          ))}
        </select>
        <input
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Payer / Hospital / Claim"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
      </div>
    </div>
  );
}
