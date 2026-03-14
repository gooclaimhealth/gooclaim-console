"use client";

import { Shield } from "lucide-react";
import { KillSwitchMode } from "@/types";

const MODE_CONFIG: Record<KillSwitchMode, { label: string; dotClass: string; bgClass: string }> = {
  NORMAL: {
    label: "NORMAL",
    dotClass: "bg-accent-green animate-pulse-green",
    bgClass: "bg-accent-green/10 text-accent-green border-accent-green/20"
  },
  SAFE_ONLY: {
    label: "SAFE ONLY",
    dotClass: "bg-accent-amber animate-pulse-amber",
    bgClass: "bg-accent-amber/10 text-accent-amber border-accent-amber/20"
  },
  BLOCK_ALL: {
    label: "BLOCKED",
    dotClass: "bg-accent-red animate-pulse-red",
    bgClass: "bg-accent-red/10 text-accent-red border-accent-red/20"
  }
};

export function TopBar({ killSwitchMode = "NORMAL" }: { killSwitchMode?: KillSwitchMode }) {
  const config = MODE_CONFIG[killSwitchMode];

  return (
    <header className="flex h-14 items-center justify-between border-b border-border-default bg-bg-secondary px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-accent-blue" />
        <span className="font-mono text-sm font-semibold text-text-primary tracking-wider">
          GOOCLAIM
        </span>
      </div>

      <div className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-mono font-medium ${config.bgClass}`}>
        <span className={`inline-block h-2 w-2 rounded-full ${config.dotClass}`} />
        {config.label}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-text-secondary font-mono">MediAssist</span>
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-accent-blue/20 flex items-center justify-center">
            <span className="text-xs font-mono text-accent-blue">A</span>
          </div>
          <span className="hidden text-xs text-text-tertiary md:inline">Admin</span>
        </div>
      </div>
    </header>
  );
}
