"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Inbox, FileText, Settings, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/tickets", label: "Tickets", icon: Inbox },
  { href: "/templates", label: "Templates", icon: FileText },
  { href: "/admin", label: "Admin", icon: Settings },
  { href: "/insights", label: "Insights", icon: BarChart3 }
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden h-screen w-60 flex-col border-r border-border-default bg-bg-primary md:flex">
        <div className="px-5 py-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-tertiary">
            Console
          </p>
        </div>

        <nav className="flex-1 px-3 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors relative",
                  active
                    ? "bg-accent-blue/10 text-text-primary"
                    : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
                )}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-r bg-accent-blue" />
                )}
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border-default px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse-green" />
            <span className="text-xs text-text-tertiary font-mono">System OK</span>
          </div>
        </div>
      </aside>

      {/* Mobile horizontal nav */}
      <aside className="border-b border-border-default bg-bg-primary px-3 py-3 md:hidden">
        <nav className="flex gap-1 overflow-x-auto">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs transition-colors",
                  active
                    ? "bg-accent-blue/10 text-text-primary"
                    : "text-text-secondary border border-border-default"
                )}
              >
                <Icon className="h-3 w-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
