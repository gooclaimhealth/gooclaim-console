'use client';

import { useState } from 'react';
import { AlertCircle, ArrowRight, CheckCircle2, MessageSquareText, ShieldAlert, DatabaseZap, Layers3 } from 'lucide-react';

interface AdminScreenProps {
  killSwitchMode: string;
  onKillSwitchChange: (mode: string) => void;
}

const modeOptions = [
  {
    id: 'NORMAL',
    label: 'Normal',
    description: 'Agent handles routine verification and escalates exceptions.',
    tone: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    dot: 'bg-emerald-500',
  },
  {
    id: 'SAFE_ONLY',
    label: 'Safe Only',
    description: 'Low-risk flows continue. Exceptions require human review.',
    tone: 'border-amber-200 bg-amber-50 text-amber-800',
    dot: 'bg-amber-500',
  },
  {
    id: 'BLOCK_ALL',
    label: 'Block All',
    description: 'All automated processing stops until manually restored.',
    tone: 'border-rose-200 bg-rose-50 text-rose-800',
    dot: 'bg-rose-500',
  },
] as const;

const opsHealth = [
  {
    label: 'Claims Data',
    status: 'Connected',
    detail: 'MediAssist CMS · sync 8m ago',
    icon: DatabaseZap,
    tone: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    dot: 'bg-emerald-500',
  },
  {
    label: 'WhatsApp API',
    status: 'Connected',
    detail: 'Meta Graph API',
    icon: MessageSquareText,
    tone: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    dot: 'bg-emerald-500',
  },
  {
    label: 'Sender Worker',
    status: 'Running',
    detail: '12 sent today',
    icon: CheckCircle2,
    tone: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    dot: 'bg-emerald-500',
  },
  {
    label: 'Queue',
    status: 'Healthy',
    detail: '2 pending',
    icon: Layers3,
    tone: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    dot: 'bg-emerald-500',
  },
];

const tenantConfig = [
  { label: 'Tenant ID', value: 'TPA-IND-MEDIAST-01' },
  { label: 'WABA', value: '+91 98765 43210' },
  { label: 'Dataset version', value: 'claims-truth-v2026.03.14' },
];

export function AdminScreen({ killSwitchMode, onKillSwitchChange }: AdminScreenProps) {
  const [pendingMode, setPendingMode] = useState<string>(killSwitchMode);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const isConfirmValid = confirmText.trim().toUpperCase() === 'CONFIRM';

  const currentMode = modeOptions.find((mode) => mode.id === killSwitchMode) ?? modeOptions[0];

  const handleModeIntent = (mode: string) => {
    setPendingMode(mode);
    setShowConfirm(true);
    setConfirmText('');
  };

  const handleConfirmModeChange = () => {
    if (!isConfirmValid) {
      return;
    }

    onKillSwitchChange(pendingMode);
    setShowConfirm(false);
    setConfirmText('');
  };

  return (
    <div className="max-w-5xl space-y-6">
      <section className="overflow-hidden rounded-[32px] border border-[--border] bg-[--bg-secondary] shadow-[0_22px_70px_rgba(31,41,55,0.08)]">
        <div className="border-b border-[--border] px-6 py-5 md:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[--text-tertiary]">Admin</p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-semibold tracking-tight text-[--text-primary]">
            <ShieldAlert className="h-7 w-7 text-[--panel-strong]" />
            System Mode
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[--text-secondary]">
            Mode changes should be rare, intentional, and auditable. Nothing switches directly from the selector.
          </p>
        </div>

        <div className="px-6 py-6 md:px-8">
          <div className="grid gap-3 lg:grid-cols-3">
            {modeOptions.map((mode) => {
              const isActive = killSwitchMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => handleModeIntent(mode.id)}
                  className={`rounded-[28px] border p-5 text-left transition ${
                    isActive
                      ? `${mode.tone} shadow-[0_18px_50px_rgba(15,23,42,0.08)]`
                      : 'border-[--border] bg-white text-[--text-primary] hover:border-[--border-strong] hover:bg-[--panel-soft]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`h-3 w-3 rounded-full ${mode.dot} ${isActive ? 'animate-pulse' : ''}`} />
                      <span className="text-sm font-semibold uppercase tracking-[0.16em]">{mode.label}</span>
                    </div>
                    <span className={`h-4 w-4 rounded-full border ${isActive ? 'border-current bg-current/15' : 'border-[--border-strong]'}`} />
                  </div>
                  <p className={`mt-4 text-sm leading-6 ${isActive ? 'text-current/90' : 'text-[--text-secondary]'}`}>
                    {mode.description}
                  </p>
                </button>
              );
            })}
          </div>

          <div className={`mt-5 rounded-[28px] border px-5 py-4 ${currentMode.tone}`}>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em]">{currentMode.label} active</p>
                <p className="mt-1 text-sm">Active since Mar 14, 10:23 AM · Changed by: admin@gooclaim.io</p>
              </div>
              <button
                onClick={() => handleModeIntent(killSwitchMode)}
                className="inline-flex items-center gap-2 rounded-full border border-current/20 bg-white/70 px-4 py-2 text-sm font-semibold transition hover:bg-white"
              >
                Change System Mode
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-[--border] bg-[--bg-secondary] p-6 shadow-[0_18px_60px_rgba(31,41,55,0.06)] md:p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[--text-tertiary]">System Health</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[--text-primary]">Ops status</h2>
          </div>
          <p className="text-sm text-[--text-secondary]">Last check: 2m ago</p>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {opsHealth.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className={`rounded-[24px] border p-4 ${item.tone}`}>
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-[--text-primary]">{item.label}</p>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
                        <span className={`h-2 w-2 rounded-full ${item.dot}`} />
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[--text-secondary]">{item.detail}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-[32px] border border-[--border] bg-[--bg-secondary] p-6 shadow-[0_18px_60px_rgba(31,41,55,0.06)] md:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[--text-tertiary]">Tenant Config</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[--text-primary]">Read only</h2>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {tenantConfig.map((item) => (
            <div key={item.label} className="rounded-[24px] border border-[--border] bg-[--panel-soft] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[--text-tertiary]">{item.label}</p>
              <code className="mt-3 block text-sm font-semibold text-[--text-primary]">{item.value}</code>
            </div>
          ))}
        </div>
      </section>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(10,15,23,0.58)] p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[28px] border border-[--border] bg-[#fffdf9] p-7 shadow-[0_28px_90px_rgba(15,23,42,0.32)]">
            <h3 className="mb-3 text-xl font-semibold tracking-tight text-[--red]">Confirm mode change</h3>
            <p className="mb-2 text-sm text-[--text-primary]">
              Requested mode: <span className="font-semibold">{modeOptions.find((mode) => mode.id === pendingMode)?.label}</span>
            </p>
            <p className="mb-6 text-sm leading-6 text-[--text-secondary]">
              This changes system behavior for the whole tenant. Type <span className="font-semibold text-[--text-primary]">CONFIRM</span> to continue.
            </p>
            <input
              type="text"
              value={confirmText}
              onChange={(event) => setConfirmText(event.target.value)}
              placeholder="Type CONFIRM"
              className="mb-4 w-full rounded-2xl border border-[--border] bg-white px-4 py-3 text-[--text-primary] shadow-sm focus:outline-none focus:ring-2 focus:ring-[--accent-blue]"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setConfirmText('');
                }}
                className="flex-1 rounded-2xl border border-[--border] bg-white px-4 py-3 font-medium text-[--text-primary] transition hover:bg-[--bg-tertiary]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmModeChange}
                disabled={!isConfirmValid}
                className={`flex-1 rounded-2xl px-4 py-3 font-medium transition ${
                  isConfirmValid
                    ? 'border border-[#b42318] bg-[#c74a3a] text-white shadow-sm hover:bg-[#b42318]'
                    : 'border border-rose-200 bg-rose-100 text-rose-500 cursor-not-allowed'
                }`}
              >
                Apply Mode
              </button>
            </div>
            <div className="mt-5 flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              Every mode change is recorded in the audit trail.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
