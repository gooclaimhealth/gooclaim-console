"use client";

import { useState } from "react";
import { postOutboundIntent } from "@/lib/api/tickets";
import { ReasonCode } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const templateDirectory: Record<ReasonCode, { id: string; label: string; fields: string[] }[]> = {
  TRUTH_NOT_CONNECTED: [{ id: "status_update_v3", label: "Status Update", fields: ["claim_reference", "eta_window"] }],
  TRUTH_DATA_STALE: [{ id: "stale_truth_followup_v2", label: "Stale Truth Follow-up", fields: ["hospital_name", "next_sync_eta"] }],
  TRUTH_MISMATCH: [{ id: "mismatch_escalation_v2", label: "Mismatch Escalation", fields: ["claim_reference", "review_eta"] }],
  MISSING_CLAIM_ID: [{ id: "missing_claim_id_v1", label: "Missing Claim ID", fields: ["hospital_name", "upload_link"] }],
  NO_SOURCE: [{ id: "no_source_notice_v1", label: "No Source Notice", fields: ["hospital_name", "review_eta"] }],
  OUTBOUND_SEND_FAILED: [{ id: "retry_notice_v1", label: "Retry Notice", fields: ["claim_reference"] }],
  BLOCKED_POLICY: [{ id: "policy_hold_v1", label: "Policy Hold", fields: ["claim_reference"] }],
  T1_FORBIDDEN_MATCH: [{ id: "forbidden_match_v1", label: "Forbidden Match", fields: ["claim_reference"] }],
  T2_ML_BLOCK: [{ id: "ml_block_v1", label: "ML Block Notice", fields: ["claim_reference"] }],
  NOSOURCE_BLOCK: [{ id: "policy_hold_v1", label: "Policy Hold", fields: ["claim_reference"] }]
};

export function TemplateComposer({
  open,
  onOpenChange,
  ticketId,
  reasonCode
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketId: string;
  reasonCode: ReasonCode;
}) {
  const templates = templateDirectory[reasonCode];
  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0]?.id ?? "");
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<string | null>(null);

  const activeTemplate = templates.find((template) => template.id === selectedTemplateId) ?? templates[0];

  async function handleSubmit() {
    if (!activeTemplate) return;
    const response = await postOutboundIntent({
      ticket_id: ticketId,
      template_id: activeTemplate.id,
      variables
    });
    setStatus(`Intent ${response.intent_id} queued`);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Template Composer</DialogTitle>
          <DialogDescription>Only allowlisted template variables are available. Free-text outbound is blocked.</DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Allowed templates</span>
            <select
              value={selectedTemplateId}
              onChange={(event) => setSelectedTemplateId(event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.label}
                </option>
              ))}
            </select>
          </label>
          <div className="space-y-3">
            {activeTemplate?.fields.map((field) => (
              <label key={field} className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">{field}</span>
                <input
                  value={variables[field] ?? ""}
                  onChange={(event) => setVariables((current) => ({ ...current, [field]: event.target.value }))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  placeholder={`Enter ${field}`}
                />
              </label>
            ))}
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Preview</p>
            <p className="mt-2 text-sm text-slate-700">Template: {activeTemplate?.id}</p>
            <p className="mt-1 text-sm text-slate-600">Variables are constrained to the approved fields above.</p>
          </div>
          {status ? <p className="text-sm text-emerald-700">{status}</p> : null}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Queue outbound template</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
