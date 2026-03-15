'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/console/sidebar';
import { Topbar } from '@/components/console/topbar';
import { TicketsListScreen } from '@/components/console/tickets-list';
import { TicketDetailScreen } from '@/components/console/ticket-detail';
import { AdminScreen } from '@/components/console/admin';
import { TemplatesScreen } from '@/components/console/templates';
import { OnboardingModal } from '@/components/console/onboarding-modal';

export default function ConsolePage() {
  const [currentScreen, setCurrentScreen] = useState('tickets');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [killSwitchMode, setKillSwitchMode] = useState('NORMAL');
  const [ticketFilter, setTicketFilter] = useState<'ALL' | 'ESCALATED'>('ALL');

  const handleSelectTicket = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setCurrentScreen('detail');
  };

  const handleBack = () => {
    setSelectedTicketId(null);
    setCurrentScreen('tickets');
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
    if (screen !== 'detail') {
      setSelectedTicketId(null);
    }
    if (screen !== 'tickets') {
      setTicketFilter('ALL');
    }
  };

  const handleOpenCriticalQueue = () => {
    setSelectedTicketId(null);
    setCurrentScreen('tickets');
    setTicketFilter('ESCALATED');
  };

  return (
    <div className="flex min-h-screen bg-[--bg-primary] text-[--text-primary]">
      {showOnboarding && (
        <OnboardingModal onClose={() => setShowOnboarding(false)} />
      )}
      
      <Sidebar 
        currentScreen={currentScreen} 
        onNavigate={handleNavigate}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar 
          killSwitchMode={killSwitchMode}
          onKillSwitchChange={setKillSwitchMode}
          onOpenOnboarding={() => setShowOnboarding(true)}
          onOpenCriticalQueue={handleOpenCriticalQueue}
        />
        
        <main className="flex-1 overflow-auto p-5 md:p-8">
          {currentScreen === 'tickets' && (
            <TicketsListScreen
              onSelectTicket={handleSelectTicket}
              activeFilter={ticketFilter}
              onFilterChange={setTicketFilter}
            />
          )}
          {currentScreen === 'detail' && selectedTicketId && (
            <TicketDetailScreen 
              ticketId={selectedTicketId}
              onBack={handleBack}
            />
          )}
          {currentScreen === 'admin' && (
            <AdminScreen 
              killSwitchMode={killSwitchMode}
              onKillSwitchChange={setKillSwitchMode}
            />
          )}
          {currentScreen === 'templates' && (
            <TemplatesScreen />
          )}
        </main>
      </div>
    </div>
  );
}
