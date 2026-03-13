"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMING_SOON_ITEMS, NAV_ITEMS } from "@/lib/constants";
import { UserRole } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Sidebar({ role = "HOSPITAL_OPS_LEAD" }: { role?: UserRole }) {
  const pathname = usePathname();
  const visibleItems = NAV_ITEMS.filter((item) => !item.role || item.role === role);

  return (
    <>
      <aside className="hidden h-screen w-72 flex-col bg-trust-sidebar px-4 py-6 text-slate-200 md:flex">
        <div className="border-b border-slate-800 pb-5">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Gooclaim Console</p>
          <h1 className="mt-3 text-xl font-semibold text-white">Claims Operations</h1>
        </div>
        <nav className="mt-6 space-y-1">
          {visibleItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm transition-colors",
                  active ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-8 border-t border-slate-800 pt-4">
          <p className="mb-3 text-xs uppercase tracking-[0.24em] text-slate-500">Coming Soon</p>
          <div className="space-y-1">
            {COMING_SOON_ITEMS.map((item) => (
              <div key={item} className="cursor-not-allowed rounded-lg px-3 py-2 text-sm text-slate-600">
                {item}
              </div>
            ))}
          </div>
        </div>
      </aside>
      <aside className="border-b border-slate-800 bg-trust-sidebar px-3 py-3 text-slate-200 md:hidden">
        <div className="mb-3">
          <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Gooclaim Console</p>
          <h1 className="mt-1 text-base font-semibold text-white">Claims Operations</h1>
        </div>
        <nav className="-mx-1 flex gap-2 overflow-x-auto pb-1">
          {visibleItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-full px-3 py-2 text-xs transition-colors",
                  active ? "bg-white/10 text-white" : "border border-slate-800 text-slate-400"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
