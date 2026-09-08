import React, { useState } from 'react';
import { GamerProfile, TipTransaction, LeaderboardEntry } from '../../types';
import { GameTab } from './GameTab';
import { WalletTab } from './WalletTab';
import { AnalyticsTab } from './AnalyticsTab';
import { Gamepad2, Wallet, BarChart3, ArrowLeft, ShieldCheck, ExternalLink } from 'lucide-react';
import { CONTRACT_ADDRESSES, getBaseScanAddressUrl } from '../../config/contracts';

interface AppShellProps {
  creators: GamerProfile[];
  recentTips: TipTransaction[];
  leaderboard: LeaderboardEntry[];
  userExp: number;
  onTipSuccess: (tx: TipTransaction) => void;
  onNavigateHome: () => void;
  initialTab?: 'game' | 'wallet' | 'analytics';
}

export function AppShell({
  creators,
  recentTips,
  leaderboard,
  userExp,
  onTipSuccess,
  onNavigateHome,
  initialTab = 'game',
}: AppShellProps) {
  const [activeTab, setActiveTab] = useState<'game' | 'wallet' | 'analytics'>(initialTab);

  return (
    <div className="w-full flex-1 flex flex-col pb-28 text-slate-900">
      {/* Top Bar for App Page: Breadcrumb & Contract Pill (Frosted Glass) */}
      <div className="w-full bg-white/70 backdrop-blur-xl border-b border-white/60 shadow-[0_4px_20px_rgba(12,74,110,0.05)] px-4 sm:px-6 py-3 sticky top-18 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/75 hover:bg-white text-xs font-bold text-slate-800 border border-white/80 shadow-xs transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-600" />
              <span>Kembali ke Landing</span>
            </button>
            <span className="hidden sm:inline text-xs text-sky-900/40">/</span>
            <span className="hidden sm:inline text-xs font-black text-slate-950 font-mono tracking-tight">
              {activeTab === 'game' && 'Game — TipGame Protocol'}
              {activeTab === 'wallet' && 'Wallet — Protocol V2'}
              {activeTab === 'analytics' && 'Analytics — Royal Points & Leaderboard'}
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px]">
            <a
              href={getBaseScanAddressUrl(CONTRACT_ADDRESSES.B20_ROYAL_V2)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-sky-900/80 hover:text-sky-950 font-bold bg-white/60 px-2.5 py-1 rounded-full border border-white/70 shadow-xs"
            >
              <span>B20Royal: 0xB041...4E8</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>Base Mainnet</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Tab Content View */}
      <main className="flex-1 w-full pt-6">
        {activeTab === 'game' && (
          <GameTab
            creators={creators}
            onTipSuccess={onTipSuccess}
            recentTips={recentTips}
            userExp={userExp}
          />
        )}

        {activeTab === 'wallet' && <WalletTab userExp={userExp} tips={recentTips} />}

        {activeTab === 'analytics' && (
          <AnalyticsTab leaderboard={leaderboard} userExp={userExp} />
        )}
      </main>

      {/* Floating Glass Pill Navigation Bar */}
      <nav
        aria-label="Bottom Navigation"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 sky-card rounded-full p-1.5 shadow-[0_12px_36px_rgba(12,74,110,0.18)] border border-white/90"
      >
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Tab 1: Game */}
          <button
            onClick={() => setActiveTab('game')}
            id="bottom-tab-game"
            className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
              activeTab === 'game'
                ? 'bg-[#0052FF] text-white shadow-[0_2px_10px_rgba(0,82,255,0.4)] border border-blue-400/40'
                : 'text-slate-700 hover:text-slate-950 hover:bg-white/70'
            }`}
          >
            <Gamepad2 className="w-4 h-4 shrink-0" />
            <span>Game</span>
          </button>

          {/* Tab 2: Wallet */}
          <button
            onClick={() => setActiveTab('wallet')}
            id="bottom-tab-wallet"
            className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
              activeTab === 'wallet'
                ? 'bg-[#0052FF] text-white shadow-[0_2px_10px_rgba(0,82,255,0.4)] border border-blue-400/40'
                : 'text-slate-700 hover:text-slate-950 hover:bg-white/70'
            }`}
          >
            <Wallet className="w-4 h-4 shrink-0" />
            <span>Wallet</span>
          </button>

          {/* Tab 3: Analytics */}
          <button
            onClick={() => setActiveTab('analytics')}
            id="bottom-tab-analytics"
            className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-[#0052FF] text-white shadow-[0_2px_10px_rgba(0,82,255,0.4)] border border-blue-400/40'
                : 'text-slate-700 hover:text-slate-950 hover:bg-white/70'
            }`}
          >
            <BarChart3 className="w-4 h-4 shrink-0" />
            <span>Analytics</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
