import { mockTemplates } from "@/lib/mock/templates.mock";
import { API_BASE, USE_MOCK_API, withMockLatency } from "@/lib/config";
import { Template } from "@/types";

export async function getTemplates(): Promise<Template[]> {
  if (USE_MOCK_API) {
    return withMockLatency(mockTemplates);
  }

  try {
    const res = await fetch(`${API_BASE}/v1/templates`, {
      headers: { Authorization: "Bearer mock-token" },
      cache: "no-store"
    });
    if (!res.ok) throw new Error("Failed to fetch templates");
    return res.json();
  } catch {
    return withMockLatency(mockTemplates);
  }
}
