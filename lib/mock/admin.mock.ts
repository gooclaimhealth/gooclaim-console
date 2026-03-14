import { AdminState } from "@/types";

export const mockAdminState: AdminState = {
  kill_switch_mode: "NORMAL",
  changed_by: "admin@gooclaim.io",
  changed_at: "2026-03-14T10:23:00Z",
  system_health: [
    {
      name: "Truth Provider",
      status: "CONNECTED",
      detail: "Updated 2h ago"
    },
    {
      name: "Sender Worker",
      status: "RUNNING",
      detail: "12 sent today"
    },
    {
      name: "Queue Depth",
      status: "HEALTHY",
      detail: "2 pending"
    },
    {
      name: "WhatsApp API",
      status: "CONNECTED",
      detail: "Meta Graph API"
    }
  ],
  tenant_config: {
    tenant_id: "mediassist-prod",
    waba_phone: "+91 ●●●●● 42819",
    truth_provider: "CSV (Mock)",
    dataset_version: "v4",
    dataset_loaded_at: "2026-03-14T06:00:00Z",
    roles: ["HOSPITAL_OPS_LEAD", "TPA_OPS", "ADMIN"]
  }
};
