'use client';

import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, Bell, BookOpen, LogOut } from 'lucide-react';

interface TopbarProps {
  killSwitchMode: string;
  onKillSwitchChange: (mode: string) => void;
  onOpenOnboarding: () => void;
  onOpenCriticalQueue: () => void;
}

export function Topbar({ killSwitchMode, onKillSwitchChange, onOpenOnboarding, onOpenCriticalQueue }: TopbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      title: 'Truth source stale',
      detail: 'Apollo policy feed is 45 days old for CLM-2024-001.',
      time: '2m ago',
    },
    {
      id: 2,
      title: 'Senior review needed',
      detail: '8 escalations are waiting in the critical queue.',
      time: '8m ago',
    },
    {
      id: 3,
      title: 'Gateway recovered',
      detail: 'API latency returned to normal after the 10:15 spike.',
      time: '21m ago',
    },
  ];

  const getModeColor = () => {
    switch (killSwitchMode) {
      case 'NORMAL':
        return 'border border-emerald-300/80 bg-emerald-50 text-emerald-800';
      case 'SAFE_ONLY':
        return 'border border-amber-300/80 bg-amber-50 text-amber-800';
      case 'BLOCK_ALL':
        return 'border border-rose-300/80 bg-rose-50 text-rose-800';
      default:
        return '';
    }
  };

  const getModeLabel = () => {
    switch (killSwitchMode) {
      case 'NORMAL':
        return 'NORMAL';
      case 'SAFE_ONLY':
        return 'SAFE ONLY';
      case 'BLOCK_ALL':
        return 'BLOCK ALL';
      default:
        return '';
    }
  };

  const getPulsingDot = () => {
    switch (killSwitchMode) {
      case 'NORMAL':
        return 'bg-[--green] animate-pulse';
      case 'SAFE_ONLY':
        return 'bg-[--amber]';
      case 'BLOCK_ALL':
        return 'bg-[--red] animate-pulse';
      default:
        return '';
    }
  };

  return (
    <div className="border-b border-[--border] bg-white/75 px-5 py-4 backdrop-blur md:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div />

        <div className="flex flex-wrap items-center gap-3 lg:gap-4">
          <div className={`rounded-full px-4 py-2 text-sm font-semibold shadow-sm ${getModeColor()}`}>
            <div className="flex items-center gap-2">
              <div className={`h-2.5 w-2.5 rounded-full ${getPulsingDot()}`} />
              <span>{getModeLabel()}</span>
            </div>
          </div>
          <button
            onClick={onOpenCriticalQueue}
            className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 shadow-sm transition hover:border-amber-300 hover:bg-amber-100"
          >
            <AlertTriangle className="h-4 w-4" />
            <span>08 critical</span>
          </button>
          <button
            onClick={onOpenOnboarding}
            className="ml-1 inline-flex items-center gap-2 rounded-full border border-[--border] bg-[--bg-secondary] px-4 py-2 text-sm font-medium text-[--text-secondary] shadow-sm transition hover:border-[--border-strong] hover:text-[--text-primary] lg:ml-2"
          >
            <BookOpen className="h-4 w-4" />
            Guide
          </button>
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications((open) => !open)}
              className="relative rounded-full border border-[--border] bg-[--bg-secondary] p-2.5 text-[--text-secondary] shadow-sm transition hover:border-[--border-strong] hover:text-[--text-primary]"
              aria-label="Open notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
            </button>
            {showNotifications && (
              <div className="absolute right-0 top-14 z-50 w-[340px] rounded-[24px] border border-[--border] bg-[#fffdf9] p-3 shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
                <div className="flex items-center justify-between px-2 pb-2">
                  <div>
                    <p className="text-sm font-semibold text-[--text-primary]">Notifications</p>
                    <p className="text-xs text-[--text-tertiary]">3 operational updates</p>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-xs font-medium text-[--accent-blue] transition hover:opacity-75"
                  >
                    Close
                  </button>
                </div>
                <div className="space-y-2">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="rounded-2xl border border-[--border] bg-white px-4 py-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-[--text-primary]">{notification.title}</p>
                          <p className="mt-1 text-xs leading-5 text-[--text-secondary]">{notification.detail}</p>
                        </div>
                        <span className="shrink-0 text-[11px] font-medium text-[--text-tertiary]">
                          {notification.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button className="rounded-full border border-[--border] bg-[--bg-secondary] p-2.5 text-[--text-secondary] shadow-sm transition hover:border-[--border-strong] hover:text-[--text-primary]">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
