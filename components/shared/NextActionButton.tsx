import { Button } from "@/components/ui/button";
import { NextAction } from "@/lib/types";

export function NextActionButton({
  action,
  onClick
}: {
  action: NextAction;
  onClick?: () => void;
}) {
  return (
    <div className="space-y-2">
      <Button className="w-full justify-center" onClick={onClick} disabled={Boolean(action.blocked_reason)}>
        {action.label}
      </Button>
      {action.blocked_reason ? <p className="text-xs text-rose-600">{action.blocked_reason}</p> : null}
    </div>
  );
}
