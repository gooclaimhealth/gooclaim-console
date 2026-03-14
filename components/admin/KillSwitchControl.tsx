"use client";

import { useState } from "react";
import { KillSwitchMode } from "@/types";
import { setKillSwitchMode } from "@/lib/api/admin";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";

const MODES: {
  value: KillSwitchMode;
  label: string;
  description: string;
  dotClass: string;
  activeClass: string;
}[] = [
  {
    value: "NORMAL",
    label: "NORMAL",
    description: "All operations running",
    dotClass: "bg-accent-green animate-pulse-green",
    activeClass: "border-accent-green/40 bg-accent-green/5"
  },
  {
    value: "SAFE_ONLY",
    label: "SAFE ONLY",
    description: "Receipts only — no agent replies",
    dotClass: "bg-accent-amber animate-pulse-amber",
    activeClass: "border-accent-amber/40 bg-accent-amber/5"
  },
  {
    value: "BLOCK_ALL",
    label: "BLOCK ALL",
    description: "All outbound suspended",
    dotClass: "bg-accent-red animate-pulse-red",
    activeClass: "border-accent-red/40 bg-accent-red/5"
  }
];

interface KillSwitchControlProps {
  initialMode: KillSwitchMode;
  changedBy: string;
  changedAt: string;
}

export function KillSwitchControl({ initialMode, changedBy, changedAt }: KillSwitchControlProps) {
  const [currentMode, setCurrentMode] = useState(initialMode);
  const [pendingMode, setPendingMode] = useState<KillSwitchMode | null>(null);
  const [confirmText, setConfirmText] = useState("");
  const [updating, setUpdating] = useState(false);

  async function handleConfirm() {
    if (!pendingMode || confirmText !== "CONFIRM") return;
    setUpdating(true);
    const result = await setKillSwitchMode(pendingMode);
    if (result.success) {
      setCurrentMode(pendingMode);
    }
    setUpdating(false);
    setPendingMode(null);
    setConfirmText("");
  }

  function handleModeSelect(mode: KillSwitchMode) {
    if (mode === currentMode) return;
    setPendingMode(mode);
    setConfirmText("");
  }

  return (
    <>
      <div className="rounded-lg border border-border-default bg-bg-secondary p-6">
        <h2 className="font-mono text-sm font-semibold text-text-primary uppercase tracking-wider mb-6">
          System Mode
        </h2>

        <div className="grid gap-3 md:grid-cols-3">
          {MODES.map((mode) => (
            <button
              key={mode.value}
              onClick={() => handleModeSelect(mode.value)}
              className={cn(
                "rounded-lg border p-4 text-left transition-all",
                currentMode === mode.value
                  ? mode.activeClass
                  : "border-border-default hover:border-text-tertiary"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={cn(
                    "inline-block h-3 w-3 rounded-full",
                    currentMode === mode.value ? mode.dotClass : "bg-bg-tertiary"
                  )}
                />
                <span className="font-mono text-sm font-medium text-text-primary">
                  {mode.label}
                </span>
              </div>
              <p className="text-xs text-text-secondary">{mode.description}</p>
            </button>
          ))}
        </div>

        <div className="mt-4 border-t border-border-default pt-4">
          <p className="text-xs text-text-tertiary font-mono">
            Current: <span className="text-text-secondary">{currentMode}</span>
            {" — since "}
            <span className="text-text-secondary">
              {new Date(changedAt).toLocaleString()}
            </span>
          </p>
          <p className="text-xs text-text-tertiary font-mono mt-1">
            Changed by: <span className="text-text-secondary">{changedBy}</span>
          </p>
        </div>
      </div>

      <Dialog open={pendingMode !== null} onOpenChange={() => { setPendingMode(null); setConfirmText(""); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-mono">
              Switch to {pendingMode}?
            </DialogTitle>
            <DialogDescription>
              {pendingMode === "BLOCK_ALL"
                ? "All outbound messaging will stop immediately."
                : pendingMode === "SAFE_ONLY"
                  ? "Only receipt messages will be allowed. Agent replies will be suspended."
                  : "All operations will resume normally."}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-3">
            <p className="text-xs text-text-secondary">
              Type <span className="font-mono font-semibold text-text-primary">CONFIRM</span> to proceed:
            </p>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="CONFIRM"
              className="w-full rounded-md border border-border-default bg-bg-primary px-3 py-2 text-sm font-mono text-text-primary placeholder:text-text-tertiary focus:border-accent-blue focus:outline-none"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => { setPendingMode(null); setConfirmText(""); }}
                className="rounded-md border border-border-default px-3 py-1.5 text-xs text-text-secondary hover:bg-bg-tertiary"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={confirmText !== "CONFIRM" || updating}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  confirmText === "CONFIRM"
                    ? "bg-accent-red text-white hover:bg-accent-red/80"
                    : "bg-bg-tertiary text-text-tertiary cursor-not-allowed"
                )}
              >
                {updating ? "Updating..." : "Change Mode"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
