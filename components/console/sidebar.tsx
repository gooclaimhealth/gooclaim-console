'use client';

import { CheckCircle, LayoutTemplateIcon, SettingsIcon, Shield, TicketIcon, Workflow } from 'lucide-react';

interface SidebarProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export function Sidebar({ currentScreen, onNavigate }: SidebarProps) {
  const navItems = [
    { id: 'tickets', label: 'Tickets', icon: TicketIcon, hint: '142 active' },
    { id: 'templates', label: 'Templates', icon: LayoutTemplateIcon, hint: 'Registry' },
    { id: 'admin', label: 'Admin', icon: SettingsIcon, hint: 'Controls' },
  ];

  return (
    <div className="hidden w-76 border-r border-white/60 bg-[linear-gradient(180deg,#183256_0%,#111e34_100%)] text-white shadow-[inset_-1px_0_0_rgba(255,255,255,0.08)] md:flex md:flex-col">
      <div className="border-b border-white/10 px-6 py-7">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-[0.14em] text-white">Gooclaim</h1>
            <p className="text-sm text-slate-300">Control Tower</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-5">
        <div className="rounded-3xl border border-white/10 bg-white/6 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.22)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
            Today
          </p>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <p className="font-mono text-4xl font-semibold text-white">94%</p>
              <p className="mt-1 text-sm text-slate-300">Containment rate</p>
              <p className="mt-3 font-mono text-2xl font-semibold text-white">142</p>
              <p className="mt-1 text-sm text-slate-300">Active tickets</p>
            </div>
            <div className="rounded-2xl bg-emerald-400/18 px-3 py-2 text-xs font-semibold text-emerald-200">
              +2.1% vs avg
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-3 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full rounded-2xl border px-4 py-3 text-left transition-all ${
                isActive
                  ? 'border-white/15 bg-white text-slate-950 shadow-[0_16px_40px_rgba(0,0,0,0.18)]'
                  : 'border-transparent bg-transparent text-slate-300 hover:border-white/10 hover:bg-white/6 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${isActive ? 'bg-[--panel-soft] text-[--panel-strong]' : 'bg-white/8 text-white'}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className={`text-xs ${isActive ? 'text-slate-500' : 'text-slate-400'}`}>{item.hint}</p>
                  </div>
                </div>
                {isActive ? <Workflow className="h-4 w-4 text-[--panel-strong]" /> : null}
              </div>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/10 p-4">
        <button
          onClick={() => onNavigate('admin')}
          className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-left transition hover:border-white/20 hover:bg-white/8"
        >
          <CheckCircle className="h-4 w-4 shrink-0 text-emerald-300" />
          <div>
            <p className="text-sm font-medium text-white">All systems live</p>
            <p className="text-xs text-slate-400">Next audit sync in 08m</p>
          </div>
        </button>
        <p className="mt-3 px-1 text-xs text-slate-500">v0.2.1</p>
      </div>
    </div>
  );
}
