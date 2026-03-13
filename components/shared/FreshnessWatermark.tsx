export function FreshnessWatermark({ freshnessTs }: { freshnessTs: string | null }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Freshness</p>
      <p className="mt-2 text-sm font-medium text-slate-800">
        {freshnessTs ? new Date(freshnessTs).toLocaleString() : "No source freshness available"}
      </p>
    </div>
  );
}
