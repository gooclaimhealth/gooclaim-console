"use client";

import { KillSwitchMode } from "@/types";

const BANNER_CONFIG: Record<
  Exclude<KillSwitchMode, "NORMAL">,
  { bg: string; icon: string; message: string }
> = {
  SAFE_ONLY: {
    bg: "bg-accent-amber/10 border-accent-amber/20",
    icon: "⚠",
    message: "SAFE ONLY MODE — Only receipt messages allowed. Agent replies suspended."
  },
  BLOCK_ALL: {
    bg: "bg-accent-red/10 border-accent-red/20",
    icon: "🔴",
    message: "KILL SWITCH ACTIVE — All outbound messaging suspended. Go to Admin to change."
  }
};

export function KillSwitchBanner({ mode }: { mode: KillSwitchMode }) {
  if (mode === "NORMAL") return null;

  const config = BANNER_CONFIG[mode];

  return (
    <div className={`flex items-center gap-2 border-b px-4 py-2 text-xs font-mono ${config.bg}`}>
      <span>{config.icon}</span>
      <span className={mode === "BLOCK_ALL" ? "text-accent-red" : "text-accent-amber"}>
        {config.message}
      </span>
    </div>
  );
}
