'use client';

import { AlertCircle, ArrowLeft } from 'lucide-react';

interface TicketDetailScreenProps {
  ticketId: string;
  onBack: () => void;
}

const eventTimeline = [
  {
    id: 1,
    icon: '↓',
    time: '09:30 AM',
    title: 'Inbound · WhatsApp',
    lines: ['Intent: CLAIM_STATUS', 'Confidence: 0.94'],
    borderColor: '#2563EB',
  },
  {
    id: 2,
    icon: '⚡',
    time: '09:35 AM',
    title: 'Agent Decision',
    lines: ['Truth: STALE (45 days old)', 'Policy: FAIL', 'Fallback: TPL_STALE_V2'],
    borderColor: '#7C3AED',
  },
  {
    id: 3,
    icon: '↑',
    time: '09:35 AM',
    title: 'Outbound · WhatsApp',
    lines: ['TPL_STALE_V2 sent', 'Status: DELIVERED ✓'],
    borderColor: '#0F8B5F',
  },
  {
    id: 4,
    icon: '⚠',
    time: '09:40 AM',
    title: 'Exception Created',
    lines: ['Reason: TRUTH_STALE', 'Assigned: TPA_OPS'],
    borderColor: '#C74A3A',
  },
];

const mockClaimData = {
  claimId: 'CLM-2024-001',
  policyNo: 'POL-XX-XXXXX',
  hospitalName: 'Apollo Hospitals, Delhi',
  admissionDate: '2024-02-15',
  dischargeDate: '2024-02-28',
  totalAmount: '₹2,50,000',
  truthStatus: 'STALE',
  truthAge: '45 days old',
  threshold: '24 hours',
  datasetVersion: 'v3 (outdated)',
};

export function TicketDetailScreen({ ticketId, onBack }: TicketDetailScreenProps) {
  return (
    <div className="space-y-6">
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={onBack}
          className="rounded-lg p-2 transition-colors hover:bg-[--bg-tertiary]"
        >
          <ArrowLeft className="w-5 h-5 text-[--text-secondary]" />
        </button>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between w-full">
          <div>
            <h1 className="text-2xl font-bold text-[--text-primary]">
              Ticket {ticketId} · <code className="font-mono">{mockClaimData.claimId}</code>
            </h1>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700">
            <span>ESCALATED</span>
            <span className="text-rose-400">·</span>
            <span>TRUTH_STALE</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="rounded-[28px] border border-[--border] bg-[--bg-secondary] p-6 shadow-[0_18px_60px_rgba(31,41,55,0.06)]">
            <h2 className="text-lg font-bold text-[--text-primary]">Event Timeline</h2>
            <div className="mt-5 space-y-4">
              {eventTimeline.map((event) => (
                <div
                  key={event.id}
                  className="rounded-[24px] border border-[--border] bg-white p-4"
                  style={{ borderLeftWidth: '4px', borderLeftColor: event.borderColor }}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-xl">{event.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[--text-primary]">
                        {event.time} · {event.title}
                      </p>
                      <div className="mt-2 space-y-1">
                        {event.lines.map((line) => (
                          <p key={line} className="text-sm text-[--text-secondary]">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-[--border] bg-[--bg-secondary] p-6 shadow-[0_18px_60px_rgba(31,41,55,0.06)]">
            <h2 className="text-lg font-bold text-[--text-primary]">Claim Context</h2>

            <div className="mt-5 space-y-4 text-sm">
              <div>
                <p className="text-[--text-tertiary] text-xs uppercase font-semibold">Policy</p>
                <code className="mt-1 block font-mono text-[--text-primary]">{mockClaimData.policyNo}</code>
              </div>

              <div>
                <p className="text-[--text-tertiary] text-xs uppercase font-semibold">Hospital</p>
                <p className="mt-1 text-[--text-primary]">{mockClaimData.hospitalName}</p>
              </div>

              <div>
                <p className="text-[--text-tertiary] text-xs uppercase font-semibold">Admission</p>
                <code className="mt-1 block font-mono text-[--text-primary]">{mockClaimData.admissionDate}</code>
              </div>

              <div>
                <p className="text-[--text-tertiary] text-xs uppercase font-semibold">Amount</p>
                <p className="mt-1 font-mono text-lg font-bold text-[--text-primary]">{mockClaimData.totalAmount}</p>
              </div>
            </div>

            <div className="mt-6 border-t border-[--border] pt-6">
              <p className="text-[--text-tertiary] text-xs uppercase font-semibold">Truth Status</p>
              <div className="mt-3 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-[--amber]" />
                <span className="font-semibold text-[--amber]">STALE</span>
                <span className="text-sm text-[--text-secondary]">· 45 days old</span>
              </div>
              <div className="mt-3 space-y-2 text-sm text-[--text-secondary]">
                <p>Last updated: 45 days ago</p>
                <p>Dataset: {mockClaimData.datasetVersion}</p>
                <p>Threshold: {mockClaimData.threshold}</p>
              </div>
            </div>

            <div className="mt-6 border-t border-[--border] pt-6">
              <p className="text-[--text-tertiary] text-xs uppercase font-semibold">Exception Actions</p>
              <div className="mt-4 space-y-3">
                <button className="w-full rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-left font-semibold text-emerald-800 transition hover:bg-emerald-600 hover:text-white">
                  <span className="inline-flex items-center gap-2">
                    <span>✓</span>
                    <span>Mark Resolved</span>
                  </span>
                </button>
                <button className="w-full rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-left font-semibold text-amber-800 transition hover:bg-amber-500 hover:text-white">
                  <span className="inline-flex items-center gap-2">
                    <span>⏱</span>
                    <span>Schedule Callback</span>
                  </span>
                </button>
                <button className="w-full rounded-2xl border border-rose-300 bg-rose-50 px-4 py-3 text-left font-semibold text-rose-800 transition hover:bg-rose-600 hover:text-white">
                  <span className="inline-flex items-center gap-2">
                    <span>⬆</span>
                    <span>Escalate Senior</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
