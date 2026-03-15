'use client';

import { useState } from 'react';

const templates = [
  {
    id: 1,
    key: 'TPL_HOSPITAL_BILL',
    version: 'v2',
    name: 'Hospital Bill Verification',
    status: 'ACTIVE',
    language: 'HI + EN',
    variables: ['hospital_name', 'bill_amount', 'date_range'],
    usedToday: 42,
    hindi: 'अस्पताल बिल सत्यापन',
    approval: 'Approved',
  },
  {
    id: 2,
    key: 'TPL_MEDICATION_CHECK',
    version: 'v3',
    name: 'Medication Coverage Check',
    status: 'ACTIVE',
    language: 'EN',
    variables: ['medicine_name', 'manufacturer', 'policy_type'],
    usedToday: 28,
    hindi: 'दवा कवरेज जांच',
    approval: 'Approved',
  },
  {
    id: 3,
    key: 'TPL_TREATMENT_AUTH',
    version: 'v1',
    name: 'Treatment Authorization',
    status: 'INACTIVE',
    language: 'EN',
    variables: ['procedure_code', 'doctor_name', 'hospital_id'],
    usedToday: 0,
    hindi: 'उपचार अनुमति',
    approval: 'Approved',
  },
  {
    id: 4,
    key: 'TPL_DENIAL_APPEAL',
    version: 'v2',
    name: 'Claim Denial Appeal',
    status: 'ACTIVE',
    language: 'HI + EN',
    variables: ['claim_id', 'denial_reason', 'supporting_docs'],
    usedToday: 15,
    hindi: 'दावा खारिज अपील',
    approval: 'Approved',
  },
];

export function TemplatesScreen() {
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL');
  const [languageFilter, setLanguageFilter] = useState<'ALL' | 'EN' | 'HI + EN'>('ALL');

  const filteredTemplates = templates.filter((template) => {
    const statusMatch = statusFilter === 'ALL' || template.status === statusFilter;
    const languageMatch = languageFilter === 'ALL' || template.language === languageFilter;
    return statusMatch && languageMatch;
  });

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[--text-tertiary]">Registry</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[--text-primary]">Message Templates</h1>
          <p className="mt-2 text-sm text-[--text-secondary]">
            Read-only registry. Templates appear here only after developer setup and Meta approval.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[--text-tertiary]">Filter</p>
            <div className="flex items-center gap-2">
              {(['ALL', 'ACTIVE', 'INACTIVE'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setStatusFilter(filter)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    statusFilter === filter
                      ? 'bg-[--panel-strong] text-white'
                      : 'border border-[--border] bg-white text-[--text-secondary]'
                  }`}
                >
                  {filter === 'ALL' ? 'All' : filter === 'ACTIVE' ? 'Active' : 'Inactive'}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[--text-tertiary]">Language</p>
            <div className="flex items-center gap-2">
              {(['ALL', 'EN', 'HI + EN'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setLanguageFilter(filter)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    languageFilter === filter
                      ? 'bg-[--panel-strong] text-white'
                      : 'border border-[--border] bg-white text-[--text-secondary]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="rounded-[28px] border border-[--border] bg-[--bg-secondary] p-6 shadow-[0_18px_60px_rgba(31,41,55,0.06)]"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <code className="text-sm font-semibold text-[--text-primary]">{template.key}</code>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      template.status === 'ACTIVE'
                        ? 'bg-[--green-bg] text-[--green]'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {template.status}
                  </span>
                  <span className="rounded-full border border-[--border] bg-[--panel-soft] px-3 py-1 text-xs font-semibold text-[--text-secondary]">
                    {template.version}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[--text-primary]">{template.name}</h3>
                <p className="mt-1 text-base text-[--text-secondary]">{template.hindi}</p>
              </div>
              <span className="rounded-full border border-[--border] bg-white px-3 py-1 text-xs font-semibold text-[--text-secondary]">
                {template.language}
              </span>
            </div>

            <div className="my-5 border-t border-[--border]" />

            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[--text-tertiary]">Variables</p>
                <p className="mt-2 text-sm text-[--text-primary]">{template.variables.join(' · ')}</p>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-[--text-primary]">
                  Meta approval: <span className="font-semibold text-[--green]">Approved</span>
                </p>
                <p className="text-[--text-secondary]">Used {template.usedToday} times today</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
