"use client";

import { useState, useMemo } from "react";
import { Template } from "@/types";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { cn } from "@/lib/utils";

type LangFilter = "all" | "en" | "hi";
type StatusFilter = "all" | "active" | "inactive";
type TypeFilter = "all" | "status" | "pending_docs" | "query_reason" | "system";

export function TemplatesView({ templates }: { templates: Template[] }) {
  const [langFilter, setLangFilter] = useState<LangFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      if (statusFilter !== "all" && t.status !== statusFilter) return false;
      if (typeFilter !== "all" && t.type !== typeFilter) return false;
      return true;
    });
  }, [templates, statusFilter, typeFilter]);

  const activeCount = templates.filter((t) => t.status === "active").length;
  const inactiveCount = templates.filter((t) => t.status === "inactive").length;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-mono text-lg font-semibold text-text-primary">Templates</h1>
        <p className="mt-1 text-xs text-text-tertiary font-mono">
          {templates.length} templates | {activeCount} active | {inactiveCount} inactive
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex gap-1 rounded-lg border border-border-default bg-bg-secondary p-1">
          {(["all", "en", "hi"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setLangFilter(v)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                langFilter === v ? "bg-accent-blue text-white" : "text-text-secondary hover:text-text-primary"
              )}
            >
              {v === "all" ? "All" : v.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="flex gap-1 rounded-lg border border-border-default bg-bg-secondary p-1">
          {(["all", "active", "inactive"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setStatusFilter(v)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors capitalize",
                statusFilter === v ? "bg-accent-blue text-white" : "text-text-secondary hover:text-text-primary"
              )}
            >
              {v === "all" ? "All" : v}
            </button>
          ))}
        </div>
        <div className="flex gap-1 rounded-lg border border-border-default bg-bg-secondary p-1">
          {(["all", "status", "pending_docs", "query_reason", "system"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setTypeFilter(v)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                typeFilter === v ? "bg-accent-blue text-white" : "text-text-secondary hover:text-text-primary"
              )}
            >
              {v === "all" ? "All" : v.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((template) => (
          <TemplateCard key={template.template_id} template={template} />
        ))}
      </div>
    </div>
  );
}
