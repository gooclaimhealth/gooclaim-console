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
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-inset ring-white/10">
              <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
                <path d="M24 4 37 9v11c0 9.2-5.6 17.5-13 20C16.6 37.5 11 29.2 11 20V9l13-5Z" fill="#F8FAFC" opacity="0.18" />
                <path d="M24 7.5 34 11.3v8.5c0 7.2-4.2 13.8-10 16-5.8-2.2-10-8.8-10-16v-8.5l10-3.8Z" fill="#F8FAFC" />
                <path d="M17.5 23.8h13v3.2h-13zM22.2 16h3.6v18h-3.6z" fill="#0A0F1E" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">GOOCLAIM</p>
              <h1 className="mt-1 text-lg font-semibold text-white">Console</h1>
            </div>
          </div>
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
              <div key={item} className="pointer-events-none rounded-lg px-3 py-2 text-sm text-slate-500 opacity-40">
                {item}
              </div>
            ))}
          </div>
        </div>
      </aside>
      <aside className="border-b border-slate-800 bg-trust-sidebar px-3 py-3 text-slate-200 md:hidden">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-inset ring-white/10">
            <svg viewBox="0 0 48 48" className="h-6 w-6" aria-hidden="true">
              <path d="M24 4 37 9v11c0 9.2-5.6 17.5-13 20C16.6 37.5 11 29.2 11 20V9l13-5Z" fill="#F8FAFC" opacity="0.18" />
              <path d="M24 7.5 34 11.3v8.5c0 7.2-4.2 13.8-10 16-5.8-2.2-10-8.8-10-16v-8.5l10-3.8Z" fill="#F8FAFC" />
              <path d="M17.5 23.8h13v3.2h-13zM22.2 16h3.6v18h-3.6z" fill="#0A0F1E" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">GOOCLAIM</p>
            <h1 className="mt-1 text-base font-semibold text-white">Console</h1>
          </div>
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
