export function TATChip({ daysLeft, startedOn }: { daysLeft: number | null; startedOn?: string }) {
  const tone =
    daysLeft === null
      ? "bg-slate-100 text-slate-600"
      : daysLeft <= 0
        ? "bg-rose-700 text-white"
        : daysLeft < 3
          ? "bg-rose-100 text-rose-700"
          : "bg-slate-100 text-slate-800";

  const label = daysLeft === null ? "No TAT" : daysLeft <= 0 ? "Overdue" : `${daysLeft}d left`;

  return (
    <div className="space-y-1">
      <span title="Clock basis: last required doc received (IRDAI)" className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>
        {label}
      </span>
      {startedOn ? <p className="text-xs text-slate-500">TAT started on: {new Date(startedOn).toLocaleDateString()}</p> : null}
    </div>
  );
}
