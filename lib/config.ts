const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const rawUseMockApi = process.env.NEXT_PUBLIC_USE_MOCK_API;
const rawMockLatencyMs = process.env.NEXT_PUBLIC_MOCK_LATENCY_MS;

export const API_BASE = apiUrl;
export const USE_MOCK_API = rawUseMockApi ? rawUseMockApi === "true" : true;
export const MOCK_LATENCY_MS = Number(rawMockLatencyMs ?? "250");

export async function withMockLatency<T>(value: T): Promise<T> {
  if (!Number.isFinite(MOCK_LATENCY_MS) || MOCK_LATENCY_MS <= 0) {
    return value;
  }

  await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));
  return value;
}
