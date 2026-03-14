"use client";

import { useState } from "react";
import { Template } from "@/types";
import { cn } from "@/lib/utils";

export function TemplateCard({ template }: { template: Template }) {
  const [lang, setLang] = useState<"en" | "hi">("en");

  return (
    <div className="rounded-lg border border-border-default bg-bg-secondary p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="font-mono text-sm font-medium text-text-primary">
            {template.template_id}
          </span>
          <p className="mt-0.5 text-xs text-text-secondary">{template.name}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={cn(
              "rounded border px-1.5 py-0.5 text-[10px] font-mono font-medium",
              template.status === "active"
                ? "border-accent-green/20 bg-accent-green/10 text-accent-green"
                : "border-text-tertiary/20 bg-text-tertiary/10 text-text-tertiary"
            )}
          >
            {template.status.toUpperCase()}
          </span>
          <span className="text-xs font-mono text-text-tertiary">{template.version}</span>
        </div>
      </div>

      <div className="mt-3 flex gap-1 mb-2">
        <button
          onClick={() => setLang("en")}
          className={cn(
            "rounded px-2 py-0.5 text-[10px] font-medium transition-colors",
            lang === "en" ? "bg-bg-tertiary text-text-primary" : "text-text-tertiary hover:text-text-secondary"
          )}
        >
          EN
        </button>
        <button
          onClick={() => setLang("hi")}
          className={cn(
            "rounded px-2 py-0.5 text-[10px] font-medium transition-colors",
            lang === "hi" ? "bg-bg-tertiary text-text-primary" : "text-text-tertiary hover:text-text-secondary"
          )}
        >
          HI
        </button>
      </div>

      <div className="rounded-md bg-bg-primary p-3 border border-border-default">
        <p className="text-xs text-text-secondary leading-relaxed whitespace-pre-wrap">
          {lang === "en" ? template.content_en : template.content_hi}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        {template.variables.map((v) => (
          <span
            key={v}
            className="rounded bg-accent-cyan/10 px-1.5 py-0.5 text-[10px] font-mono text-accent-cyan"
          >
            {`{{${v}}}`}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 border-t border-border-default pt-3">
        <span className="text-[10px] text-text-tertiary">Meta approval:</span>
        <span
          className={cn(
            "text-[10px] font-mono font-medium",
            template.meta_approval === "approved" ? "text-accent-green" : "text-accent-amber"
          )}
        >
          {template.meta_approval === "approved" ? "✓ Approved" : "⏳ Pending"}
        </span>
      </div>
    </div>
  );
}
