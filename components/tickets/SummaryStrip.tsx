import { Ticket } from "@/types";

interface StatCardProps {
  label: string;
  value: string | number;
  highlight?: "amber" | "red" | "green";
}

function StatCard({ label, value, highlight }: StatCardProps) {
  const highlightClass =
    highlight === "amber"
      ? "text-accent-amber"
      : highlight === "red"
        ? "text-accent-red"
        : highlight === "green"
          ? "text-accent-green"
          : "text-text-primary";

  return (
    <div className="rounded-lg border border-border-default bg-bg-secondary px-4 py-3">
      <p className="text-xs text-text-tertiary font-mono uppercase tracking-wide">{label}</p>
      <p className={`mt-1 text-2xl font-mono font-semibold ${highlightClass}`}>{value}</p>
    </div>
  );
}

export function SummaryStrip({ tickets }: { tickets: Ticket[] }) {
  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "OPEN").length;
  const escalated = tickets.filter((t) => t.status === "ESCALATED").length;
  const resolved = tickets.filter((t) => t.status === "RESOLVED").length;
  const containmentRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <StatCard label="Total" value={total} />
      <StatCard label="Open" value={open} highlight={open > 0 ? "amber" : undefined} />
      <StatCard label="Escalated" value={escalated} highlight={escalated > 0 ? "red" : undefined} />
      <StatCard
        label="Containment"
        value={`${containmentRate}%`}
        highlight={containmentRate >= 80 ? "green" : "amber"}
      />
    </div>
  );
}
