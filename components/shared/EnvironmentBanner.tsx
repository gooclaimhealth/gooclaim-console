import { API_BASE, MOCK_LATENCY_MS, USE_MOCK_API } from "@/lib/config";

export function EnvironmentBanner() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-panel">
      <div className="flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${USE_MOCK_API ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>
          {USE_MOCK_API ? "Mock API Mode" : "Live API Mode"}
        </span>
        <span className="text-slate-600">
          Source: {USE_MOCK_API ? "local seed data" : API_BASE}
        </span>
        <span className="text-slate-500">
          Mock latency: {USE_MOCK_API ? `${MOCK_LATENCY_MS}ms` : "off"}
        </span>
      </div>
    </div>
  );
}
