import { ServiceHealth } from "@/types";
import { cn } from "@/lib/utils";

const STATUS_DOTS: Record<string, string> = {
  CONNECTED: "bg-accent-green animate-pulse-green",
  RUNNING: "bg-accent-green animate-pulse-green",
  HEALTHY: "bg-accent-green animate-pulse-green",
  DEGRADED: "bg-accent-amber animate-pulse-amber",
  DOWN: "bg-accent-red"
};

export function SystemHealth({ services }: { services: ServiceHealth[] }) {
  return (
    <div className="rounded-lg border border-border-default bg-bg-secondary p-6">
      <h2 className="font-mono text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
        System Health
      </h2>

      <div className="space-y-3">
        {services.map((service) => (
          <div key={service.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "inline-block h-2.5 w-2.5 rounded-full",
                  STATUS_DOTS[service.status] ?? "bg-text-tertiary"
                )}
              />
              <span className="text-sm text-text-primary">{service.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-accent-green">{service.status}</span>
              <span className="text-xs font-mono text-text-tertiary">{service.detail}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-text-tertiary font-mono border-t border-border-default pt-3">
        Last health check: 2 min ago
      </p>
    </div>
  );
}
