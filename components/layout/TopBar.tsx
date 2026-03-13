import { ROLE_LABELS } from "@/lib/constants";
import { UserRole } from "@/lib/types";

export function TopBar({ role = "HOSPITAL_OPS_LEAD" }: { role?: UserRole }) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Internal Ops Console</p>
        <h2 className="text-lg font-semibold text-slate-950">Ticket Operations</h2>
      </div>
      <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
        {ROLE_LABELS[role]}
      </div>
    </header>
  );
}
