'use client';

import { ArrowRight, Bot, ShieldCheck, Sparkles, X } from 'lucide-react';

interface OnboardingModalProps {
  onClose: () => void;
}

export function OnboardingModal({ onClose }: OnboardingModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(7,17,31,0.45)] p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/60 bg-[--bg-secondary] shadow-[0_40px_120px_rgba(6,15,28,0.28)]">
        <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#f2b27a_0%,#c76a2c_42%,#15213a_100%)] p-8 text-white md:p-10">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_42%,rgba(255,255,255,0.04))]" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                <Sparkles className="h-3.5 w-3.5" />
                Fast Brief
              </div>
              <h2 className="mt-6 max-w-md text-4xl font-semibold leading-tight tracking-tight">
                Escalate less. See risk faster. Keep auditability intact.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-6 text-white/78">
                Gooclaim auto-resolves low-risk claims and turns the remaining cases into a clean human review queue.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/15 bg-white/10 p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/65">Containment</p>
                  <p className="mt-2 font-mono text-3xl font-semibold">94%</p>
                </div>
                <div className="rounded-3xl border border-white/15 bg-white/10 p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/65">Human queue</p>
                  <p className="mt-2 font-mono text-3xl font-semibold">08</p>
                </div>
                <div className="rounded-3xl border border-white/15 bg-white/10 p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/65">Decision SLA</p>
                  <p className="mt-2 font-mono text-3xl font-semibold">&lt; 2m</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#f7f4ee] p-7 md:p-8">
            <button
              onClick={onClose}
              className="absolute right-5 top-5 rounded-full border border-[--border] bg-white p-2 text-[--text-secondary] transition hover:text-[--text-primary]"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[--text-tertiary]">
              Workflow overview
            </p>
            <div className="mt-6 space-y-4">
              <div className="rounded-3xl border border-[--border] bg-[--panel-soft] p-5">
                <div className="grid grid-cols-[48px_1fr] items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[--panel-strong] shadow-sm">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-semibold leading-6 text-[--text-primary]">Agent handles routine validation</p>
                    <p className="mt-1 text-sm leading-7 text-[--text-secondary]">
                      Policy checks, source verification, and reasoning traces are generated automatically.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-[--border] bg-white p-5">
                <div className="grid grid-cols-[48px_1fr] items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[--panel-soft] text-[--panel-strong] shadow-sm">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-semibold leading-6 text-[--text-primary]">Reviewers step in only on risk</p>
                    <p className="mt-1 text-sm leading-7 text-[--text-secondary]">
                      Escalations are grouped by severity so the team spends time on judgment, not lookup work.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={onClose}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[--panel-strong] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
              >
                Open workspace
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={onClose}
                className="rounded-2xl border border-[--border] px-4 py-3 text-sm font-medium text-[--text-secondary] transition hover:text-[--text-primary]"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
