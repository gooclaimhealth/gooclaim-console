'use client';

import { useState } from 'react';
import { AlertTriangle, ArrowUpRight, CheckCircle2, Clock3, Search, ShieldAlert } from 'lucide-react';

interface TicketsListScreenProps {
  onSelectTicket: (ticketId: string) => void;
  activeFilter: 'ALL' | 'ESCALATED';
  onFilterChange: (filter: 'ALL' | 'ESCALATED') => void;
}

const mockTickets = [
  {
    id: 'TKT-001',
    claimId: 'CLM-2024-001',
    status: 'ESCALATED',
    reason: 'TRUTH_STALE',
    createdAt: '2024-03-14T09:30:00Z',
    agent: 'Agent escalated due to stale truth data',
  },
  {
    id: 'TKT-002',
    claimId: 'CLM-2024-002',
    status: 'OPEN',
    reason: 'LOW_CONFIDENCE',
    createdAt: '2024-03-14T10:15:00Z',
    agent: '⚠ Exception: Low confidence in verification',
  },
  {
    id: 'TKT-003',
    claimId: 'CLM-2024-003',
    status: 'RESOLVED',
    reason: 'VERIFIED',
    createdAt: '2024-03-14T11:00:00Z',
    agent: '🤖 Agent resolved successfully',
  },
  {
    id: 'TKT-004',
    claimId: 'CLM-2024-004',
    status: 'OPEN',
    reason: 'MISSING_CLAIM_ID',
    createdAt: '2024-03-14T08:45:00Z',
    agent: '⚠ Exception: Missing claim ID',
  },
  {
    id: 'TKT-005',
    claimId: 'CLM-2024-005',
    status: 'ESCALATED',
    reason: 'NO_SOURCE',
    createdAt: '2024-03-14T07:30:00Z',
    agent: '🔴 Escalated: No authoritative source',
  },
];

const reasonBadgeColors = {
  TRUTH_STALE: { bg: 'bg-[--amber-bg]', text: 'text-[--amber]', border: 'border border-[#FDE68A]' },
  VERIFIED: { bg: 'bg-[--green-bg]', text: 'text-[--green]', border: 'border border-[#A7F3D0]' },
  LOW_CONFIDENCE: { bg: 'bg-[--amber-bg]', text: 'text-[--amber]', border: '' },
  NO_SOURCE: { bg: 'bg-[#F1F5F9]', text: 'text-[#64748B]', border: 'border border-[#CBD5E1]' },
  MISSING_CLAIM_ID: { bg: 'bg-[#F1F5F9]', text: 'text-[#64748B]', border: 'border border-[#CBD5E1]' },
};

const statusBadgeColors = {
  ESCALATED: { bg: 'bg-[--red-bg]', text: 'text-[--red]', border: 'border-left-3 border-[--red]' },
  OPEN: { bg: 'bg-[--amber-bg]', text: 'text-[--amber]', border: 'border-left-3 border-[#F59E0B]' },
  RESOLVED: { bg: 'bg-[--green-bg]', text: 'text-[--green]', border: 'border-left-3 border-[--green]' },
};

const timestampFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'UTC',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

export function TicketsListScreen({ onSelectTicket, activeFilter, onFilterChange }: TicketsListScreenProps) {
  const containmentRate = 94;
  const totalTodayCount = 142;
  const openCount = 8;
  const escalatedCount = 3;
  const [showClaimSearch, setShowClaimSearch] = useState(false);
  const [claimQuery, setClaimQuery] = useState('');
  const normalizedQuery = claimQuery.trim().toLowerCase();
  const filteredTickets = mockTickets.filter((ticket) => {
    if (activeFilter === 'ESCALATED' && ticket.status !== 'ESCALATED') {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    return (
      ticket.claimId.toLowerCase().includes(normalizedQuery) ||
      ticket.id.toLowerCase().includes(normalizedQuery)
    );
  });

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[32px] border border-[--border] bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(247,241,232,0.9))] shadow-[0_24px_80px_rgba(31,41,55,0.08)]">
        <div className="p-6 md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[--border] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[--text-tertiary]">
                <ShieldAlert className="h-3.5 w-3.5" />
                Tickets
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[--text-primary]">Tickets</h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-2xl border border-[#16345c] bg-[#16345c] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(27,62,111,0.28)] transition hover:bg-[#1d467f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16345c]/30">
                Review critical queue
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowClaimSearch((current) => !current)}
                className="inline-flex items-center gap-2 rounded-2xl border border-[--border] bg-white px-4 py-3 text-sm font-medium text-[--text-secondary] transition hover:border-[--border-strong] hover:text-[--text-primary]"
              >
                <Search className="h-4 w-4" />
                {showClaimSearch ? 'Hide search' : 'Find claim'}
              </button>
            </div>
          </div>

          {showClaimSearch && (
            <div className="mt-5 rounded-[24px] border border-[--border] bg-white p-4 shadow-sm">
              <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[--text-tertiary]">
                Search by claim or ticket
              </label>
              <div className="mt-3 flex flex-col gap-3 md:flex-row">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[--text-tertiary]" />
                  <input
                    value={claimQuery}
                    onChange={(event) => setClaimQuery(event.target.value)}
                    placeholder="Try CLM-2024-001 or TKT-001"
                    className="w-full rounded-2xl border border-[--border] bg-[--bg-secondary] py-3 pl-11 pr-4 text-sm text-[--text-primary] outline-none transition focus:border-[--border-strong] focus:ring-2 focus:ring-[--accent-blue]/15"
                  />
                </div>
                <button
                  onClick={() => setClaimQuery('')}
                  className="rounded-2xl border border-[--border] bg-[--bg-secondary] px-4 py-3 text-sm font-medium text-[--text-secondary] transition hover:text-[--text-primary]"
                >
                  Clear
                </button>
              </div>
              <p className="mt-3 text-sm text-[--text-secondary]">
                {filteredTickets.length} result{filteredTickets.length === 1 ? '' : 's'} found
              </p>
            </div>
          )}

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[28px] border border-emerald-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[--text-tertiary]">Containment</p>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              <p className="mt-4 font-mono text-4xl font-semibold text-emerald-700">{containmentRate}%</p>
              <p className="mt-2 text-sm text-[--text-secondary]">Routine claims resolved by the agent</p>
            </div>
            <div className="rounded-[28px] border border-amber-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[--text-tertiary]">Total today</p>
                <Clock3 className="h-4 w-4 text-amber-600" />
              </div>
              <p className="mt-4 font-mono text-4xl font-semibold text-amber-700">{totalTodayCount}</p>
              <p className="mt-2 text-sm text-[--text-secondary]">Total tickets created today</p>
            </div>
            <div className="rounded-[28px] border border-rose-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[--text-tertiary]">Open</p>
                <AlertTriangle className="h-4 w-4 text-rose-600" />
              </div>
              <p className="mt-4 font-mono text-4xl font-semibold text-rose-700">{openCount}</p>
              <p className="mt-2 text-sm text-[--text-secondary]">Awaiting human review right now</p>
            </div>
            <div className="rounded-[28px] border border-rose-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[--text-tertiary]">Escalated</p>
                <AlertTriangle className="h-4 w-4 text-rose-600" />
              </div>
              <p className="mt-4 font-mono text-4xl font-semibold text-rose-700">{escalatedCount}</p>
              <p className="mt-2 text-sm text-[--text-secondary]">Require senior attention today</p>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[28px] border border-[--border] bg-[--bg-secondary] shadow-[0_18px_60px_rgba(31,41,55,0.06)]">
        <div className="flex flex-col gap-3 border-b border-[--border] px-6 py-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[--text-tertiary]">Escalation ledger</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[--text-primary]">Active tickets</h2>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <p className="max-w-xl text-sm leading-6 text-[--text-secondary]">
              Every row includes the current decision state, reason code, and creation timestamp for quick triage.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onFilterChange('ALL')}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  activeFilter === 'ALL'
                    ? 'bg-[--panel-strong] text-white'
                    : 'border border-[--border] bg-white text-[--text-secondary]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => onFilterChange('ESCALATED')}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  activeFilter === 'ESCALATED'
                    ? 'bg-[#c74a3a] text-white'
                    : 'border border-rose-200 bg-rose-50 text-rose-700'
                }`}
              >
                Escalated
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
        <table className="w-full min-w-[960px]">
          <thead>
            <tr className="bg-[--panel-soft]">
              <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-[--text-tertiary]">Ticket ID</th>
              <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-[--text-tertiary]">Claim ID</th>
              <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-[--text-tertiary]">Summary</th>
              <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-[--text-tertiary]">Status</th>
              <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-[--text-tertiary]">Reason Code</th>
              <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.18em] text-[--text-tertiary]">Created</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket) => {
              const statusColor = statusBadgeColors[ticket.status as keyof typeof statusBadgeColors];
              const reasonColor = reasonBadgeColors[ticket.reason as keyof typeof reasonBadgeColors];
              return (
                <tr
                  key={ticket.id}
                  onClick={() => onSelectTicket(ticket.id)}
                  className="cursor-pointer border-t border-[--border] transition-colors hover:bg-[--panel-soft]"
                  style={{
                    borderLeftWidth: '3px',
                    borderLeftColor: statusColor ? `var(--${ticket.status === 'ESCALATED' ? 'red' : ticket.status === 'OPEN' ? 'amber' : 'green'})` : 'transparent',
                  }}
                >
                  <td className="px-6 py-4">
                    <code className="font-mono text-sm font-semibold text-[--text-primary]">{ticket.id}</code>
                  </td>
                  <td className="px-6 py-4">
                    <code className="font-mono text-sm text-[--text-secondary]">{ticket.claimId}</code>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-[--text-primary]">{ticket.agent}</p>
                      <p className="mt-1 text-xs text-[--text-tertiary]">PHI-safe triage record</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusColor.bg} ${statusColor.text}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold font-mono ${reasonColor.bg} ${reasonColor.text} ${reasonColor.border}`}>
                      {ticket.reason}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <code className="font-mono text-xs text-[--text-tertiary]">
                      {timestampFormatter.format(new Date(ticket.createdAt))} UTC
                    </code>
                  </td>
                </tr>
              );
            })}
            {filteredTickets.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <p className="text-base font-medium text-[--text-primary]">No matching claims found</p>
                  <p className="mt-2 text-sm text-[--text-secondary]">
                    Try a different claim ID or ticket ID.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </section>
    </div>
  );
}
