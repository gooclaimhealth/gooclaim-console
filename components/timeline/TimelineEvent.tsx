import { DocReceiptCard } from "@/components/shared/DocReceiptCard";
import { TimelineEvent as TimelineEventType } from "@/lib/types";

export function TimelineEvent({ event }: { event: TimelineEventType }) {
  if (event.event_type === "DOC_RECEIVED") {
    return (
      <DocReceiptCard
        hash={String(event.payload_summary.hash ?? "")}
        docType={String(event.payload_summary.doc_type ?? "")}
        size={String(event.payload_summary.size ?? "")}
      />
    );
  }

  if (event.event_type === "POLICY_BLOCKED") {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
        Policy blocked: {String(event.payload_summary.reason_code ?? "Unknown")}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900">{event.event_type.replaceAll("_", " ")}</p>
        <p className="text-xs text-slate-400">{new Date(event.ts).toLocaleString()}</p>
      </div>
      <p className="mt-2 text-sm text-slate-600">Actor: {event.actor}</p>
      <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
        {event.event_type === "INBOUND_WA" ? (
          <p>
            Incoming message, type {String(event.payload_summary.message_type ?? "unknown")}, length {String(event.payload_summary.length ?? 0)}
          </p>
        ) : null}
        {event.event_type === "OUTBOUND_TEMPLATE" ? (
          <div className="flex items-center gap-2">
            <code className="text-xs text-slate-500">{event.template_id}</code>
            <span className="text-slate-400">·</span>
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">v{event.template_version}</span>
          </div>
        ) : null}
        {event.event_type === "TRUTH_READINESS" ? (
          <p>
            Readiness {String(event.payload_summary.readiness ?? "")}, freshness ok {String(event.payload_summary.freshness_ok ?? "")}
          </p>
        ) : null}
        {event.event_type === "CASE_LINKED" ? <p>Case reason: {String(event.payload_summary.reason ?? "")}</p> : null}
        {event.event_type === "DOC_UPLOAD_LINK_CREATED" ? <p>Upload link expiry: {String(event.payload_summary.expiry ?? "")}</p> : null}
      </div>
    </div>
  );
}
