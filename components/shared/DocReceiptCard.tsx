export function DocReceiptCard({
  hash,
  docType,
  size
}: {
  hash: string;
  docType: string;
  size: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-sm font-semibold text-slate-900">Document Received</p>
      <div className="mt-3 grid grid-cols-3 gap-2 text-sm text-slate-600">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Hash</p>
          <p>{hash}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Type</p>
          <p>{docType}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Size</p>
          <p>{size}</p>
        </div>
      </div>
    </div>
  );
}
