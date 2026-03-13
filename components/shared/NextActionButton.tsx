import { Button } from "@/components/ui/button";
import { NextAction } from "@/lib/types";

export function NextActionButton({
  action,
  onClick
}: {
  action: NextAction;
  onClick?: () => void;
}) {
  const killSwitchActive = process.env.NEXT_PUBLIC_KILL_SWITCH_ACTIVE === "true";
  const blockedByKillSwitch = killSwitchActive && action.label === "Send Status Update";

  return (
    <div className="space-y-2">
      <Button
        className={`w-full justify-center ${blockedByKillSwitch ? "bg-slate-300 text-slate-600 hover:bg-slate-300" : ""}`}
        onClick={onClick}
        disabled={Boolean(action.blocked_reason) || blockedByKillSwitch}
      >
        {action.label}
      </Button>
      {action.blocked_reason || blockedByKillSwitch ? <p className="text-xs text-rose-600">{action.blocked_reason ?? "Blocked by kill switch"}</p> : null}
    </div>
  );
}
