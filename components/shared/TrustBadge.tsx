import { Badge } from "@/components/ui/badge";
import { TrustState } from "@/lib/types";

const toneMap: Record<TrustState, string> = {
  VERIFIED: "bg-emerald-100 text-emerald-800",
  STALE: "bg-amber-100 text-amber-800",
  MISMATCH: "bg-orange-100 text-orange-800",
  NOSOURCE: "bg-rose-100 text-rose-800"
};

export function TrustBadge({ state }: { state: TrustState }) {
  return <Badge className={toneMap[state]}>{state}</Badge>;
}
