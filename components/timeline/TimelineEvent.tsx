import { TimelineEvent as TimelineEventType } from "@/types";
import { cn } from "@/lib/utils";

const EVENT_CONFIG: Record<
  string,
  { icon: string; color: string; borderColor: string }
> = {
  INBOUND: { icon: "↓", color: "text-accent-blue", borderColor: "border-accent-blue" },
  AGENT_DECISION: { icon: "⚡", color: "text-purple-400", borderColor: "border-purple-400" },
  OUTBOUND: { icon: "↑", color: "text-accent-green", borderColor: "border-accent-green" },
  EXCEPTION: { icon: "⚠", color: "text-accent-amber", borderColor: "border-accent-amber" },
  KILL_SWITCH: { icon: "🔒", color: "text-accent-red", borderColor: "border-accent-red" },
  DOCUMENT: { icon: "📄", color: "text-text-tertiary", borderColor: "border-text-tertiary" }
};

function formatTime(ts: string): string {
  return new Date(ts).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
}

export function TimelineEvent({ event }: { event: TimelineEventType }) {
  const config = EVENT_CONFIG[event.event_type] ?? EVENT_CONFIG.DOCUMENT;

  return (
    <div
      className={cn(
        "rounded-lg border-l-2 bg-bg-secondary p-4",
        config.borderColor
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className={cn("text-base", config.color)}>{config.icon}</span>
          <span className="font-mono text-xs text-text-tertiary">
            {formatTime(event.timestamp)}
          </span>
          <span className="text-sm font-medium text-text-primary">{event.summary}</span>
        </div>
      </div>

      {event.detail && (
        <p className="mt-2 ml-7 text-sm text-text-secondary">{event.detail}</p>
      )}

      {event.template_id && (
        <div className="mt-2 ml-7 flex items-center gap-2">
          <code className="text-xs font-mono text-text-tertiary">{event.template_id}</code>
          {event.template_version && (
            <>
              <span className="text-text-tertiary">·</span>
              <span className="text-xs font-mono text-accent-cyan">{event.template_version}</span>
            </>
          )}
        </div>
      )}

      {event.delivery_status && (
        <div className="mt-1 ml-7">
          <span className={cn(
            "text-xs font-mono",
            event.delivery_status === "DELIVERED" ? "text-accent-green" : "text-accent-amber"
          )}>
            {event.delivery_status} ✓
          </span>
        </div>
      )}

      {event.confidence !== undefined && (
        <div className="mt-1 ml-7">
          <span className="text-xs text-text-tertiary font-mono">
            Intent confidence: {event.confidence.toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
}
