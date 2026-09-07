import React, { useState, useEffect } from 'react';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from './config/wagmi';
import {
  INITIAL_CREATORS,
  INITIAL_TIPS,
  INITIAL_LEADERBOARD,
} from './data/initialData';
import { GamerProfile, TipTransaction, LeaderboardEntry } from './types';
import { Header } from './components/common/Header';
import { LandingPage } from './components/landing/LandingPage';
import { AppShell } from './components/app/AppShell';

const queryClient = new QueryClient();

const skyCloudsTheme = lightTheme({
  accentColor: '#a3e635',
  accentColorForeground: '#09090b',
  borderRadius: 'large',
  fontStack: 'system',
});

function MainRouter() {
  const [currentRoute, setCurrentRoute] = useState<'landing' | 'app'>(() => {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/app')) {
      return 'app';
    }
    return 'landing';
  });

  // Global Protocol State
  const [creators, setCreators] = useState<GamerProfile[]>(INITIAL_CREATORS);
  const [tips, setTips] = useState<TipTransaction[]>(INITIAL_TIPS);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(INITIAL_LEADERBOARD);
  const [userExp, setUserExp] = useState<number>(1450);

  // Sync route with browser history
  const handleNavigate = (route: 'landing' | 'app') => {
    setCurrentRoute(route);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', route === 'landing' ? '/' : '/app');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname.startsWith('/app')) {
        setCurrentRoute('app');
      } else {
        setCurrentRoute('landing');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleTipSuccess = (newTx: TipTransaction) => {
    setTips((prev) => [newTx, ...prev]);

    setCreators((prev) =>
      prev.map((c) => {
        if (c.id === newTx.recipientId) {
          return {
            ...c,
            totalTipsReceivedEth: c.totalTipsReceivedEth + newTx.amount,
            level: c.level + 1,
          };
        }
        return c;
      })
    );

    setUserExp((prev) => prev + newTx.expEarned);
  };

  return (
    <div className="min-h-screen tg-sky-wrapper text-[#09090b] flex flex-col antialiased selection:bg-[#a3e635] selection:text-black">
      {/* Universal Floating Header over Sky */}
      <Header currentRoute={currentRoute} onNavigate={handleNavigate} />

      {/* View Switching: Landing Page (/) vs App Page (/app) */}
      {currentRoute === 'landing' ? (
        <LandingPage onLaunchApp={() => handleNavigate('app')} />
      ) : (
        <AppShell
          creators={creators}
          recentTips={tips}
          leaderboard={leaderboard}
          userExp={userExp}
          onTipSuccess={handleTipSuccess}
          onNavigateHome={() => handleNavigate('landing')}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={skyCloudsTheme} coolMode>
          <MainRouter />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
