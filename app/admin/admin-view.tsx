"use client";

import { AdminState } from "@/types";
import { KillSwitchControl } from "@/components/admin/KillSwitchControl";
import { SystemHealth } from "@/components/admin/SystemHealth";

export function AdminView({ state }: { state: AdminState }) {
  return (
    <div className="space-y-6">
      <h1 className="font-mono text-lg font-semibold text-text-primary">Admin</h1>

      <KillSwitchControl
        initialMode={state.kill_switch_mode}
        changedBy={state.changed_by}
        changedAt={state.changed_at}
      />

      <SystemHealth services={state.system_health} />

      {/* Tenant Config — read only */}
      <div className="rounded-lg border border-border-default bg-bg-secondary p-6">
        <h2 className="font-mono text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
          Tenant Configuration
        </h2>
        <div className="space-y-3">
          {[
            ["Tenant ID", state.tenant_config.tenant_id],
            ["WABA Phone", state.tenant_config.waba_phone],
            ["Truth Provider", state.tenant_config.truth_provider],
            ["Dataset Version", state.tenant_config.dataset_version],
            ["Dataset Loaded", new Date(state.tenant_config.dataset_loaded_at).toLocaleString()],
            ["Roles", state.tenant_config.roles.join(", ")]
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-xs text-text-tertiary">{label}</span>
              <span className="text-xs font-mono text-text-secondary">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
