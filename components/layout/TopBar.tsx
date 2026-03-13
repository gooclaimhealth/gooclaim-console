import { ROLE_LABELS } from "@/lib/constants";
import { UserRole } from "@/lib/types";

export function TopBar({ role = "HOSPITAL_OPS_LEAD" }: { role?: UserRole }) {
  return (
    <header className="flex flex-col gap-3 border-b border-slate-200 bg-white px-3 py-3 sm:px-4 md:flex-row md:items-center md:justify-between md:px-6 md:py-4">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Internal Ops Console</p>
        <h2 className="text-base font-semibold text-slate-950 md:text-lg">Ticket Operations</h2>
      </div>
      <div className="w-fit rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
        {ROLE_LABELS[role]}
      </div>
    </header>
  );
}
