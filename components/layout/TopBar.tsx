import { ROLE_LABELS } from "@/lib/constants";
import { UserRole } from "@/lib/types";

export function TopBar({ role = "HOSPITAL_OPS_LEAD" }: { role?: UserRole }) {
  return (
    <header className="flex flex-col gap-3 border-b border-slate-200 bg-white px-3 py-3 sm:px-4 md:flex-row md:items-center md:justify-between md:px-6 md:py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">GOOCLAIM CONSOLE</p>
      <div className="w-fit rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
        {ROLE_LABELS[role]}
      </div>
    </header>
  );
}
