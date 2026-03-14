import { mockAdminState } from "@/lib/mock/admin.mock";
import { API_BASE, USE_MOCK_API, withMockLatency } from "@/lib/config";
import { AdminState, KillSwitchMode } from "@/types";

let currentMockState = { ...mockAdminState };

export async function getAdminState(): Promise<AdminState> {
  if (USE_MOCK_API) {
    return withMockLatency({ ...currentMockState });
  }

  try {
    const res = await fetch(`${API_BASE}/v1/admin/state`, {
      headers: { Authorization: "Bearer mock-token" },
      cache: "no-store"
    });
    if (!res.ok) throw new Error("Failed to fetch admin state");
    return res.json();
  } catch {
    return withMockLatency({ ...currentMockState });
  }
}

export async function setKillSwitchMode(
  mode: KillSwitchMode
): Promise<{ success: boolean; mode: KillSwitchMode }> {
  if (USE_MOCK_API) {
    currentMockState = {
      ...currentMockState,
      kill_switch_mode: mode,
      changed_by: "admin@gooclaim.io",
      changed_at: new Date().toISOString()
    };
    return withMockLatency({ success: true, mode });
  }

  try {
    const res = await fetch(`${API_BASE}/v1/admin/kill-switch`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer mock-token"
      },
      body: JSON.stringify({ mode })
    });
    if (!res.ok) throw new Error("Failed to set kill switch mode");
    return res.json();
  } catch {
    return withMockLatency({ success: false, mode });
  }
}
