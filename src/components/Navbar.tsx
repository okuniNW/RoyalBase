import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { Volume2, VolumeX, ShieldCheck, Zap, Sparkles, Crown } from 'lucide-react';
import { sounds } from '../utils/audio';

interface NavbarProps {
  activeTab: 'arena' | 'leaderboard' | 'vault' | 'contract';
  setActiveTab: (tab: 'arena' | 'leaderboard' | 'vault' | 'contract') => void;
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  userExp: number;
  userLootCount: number;
  comboStreak: number;
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  demoBalance: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  soundEnabled,
  setSoundEnabled,
  userExp,
  userLootCount,
  comboStreak,
  isDemoMode,
  setIsDemoMode,
  demoBalance,
}) => {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const toggleSound = () => {
    const next = !soundEnabled;
    sounds.enabled = next;
    setSoundEnabled(next);
    if (next) sounds.playCoin();
  };

  const isBase = chainId === base.id || chainId === baseSepolia.id;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1c2230] bg-[#090b10]/95 backdrop-blur-md">
      {/* Top Banner Notice */}
      <div className="bg-[#0e131d] border-b border-[#182030] px-4 py-1.5 text-xs text-[#9ba3b8] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#0052FF] font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-[#0052FF] animate-pulse"></span>
            Base L2 Live
          </span>
          <span className="hidden sm:inline text-[#3a4459]">|</span>
          <span className="hidden sm:inline text-[#cbd2e0]">
            Gas Avg: <span className="text-[#34d399] font-mono">0.001 Gwei ($0.0003)</span>
          </span>
          <span className="hidden md:inline text-[#3a4459]">|</span>
          <span className="hidden md:inline text-[#e5a93c] font-medium">
            Weekly Royal Vault Pool: 5.25 ETH
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Demo Sandbox / Real Web3 Mode Toggle */}
          <button
            id="demo-mode-toggle-btn"
            onClick={() => {
              setIsDemoMode(!isDemoMode);
              sounds.playCoin();
            }}
            className={`px-2.5 py-0.5 rounded text-[11px] font-semibold border transition-colors ${
              isDemoMode
                ? 'bg-[#d99b26]/20 border-[#d99b26]/50 text-[#f6c358]'
                : 'bg-[#161c28] border-[#252f44] text-[#8e9bb5] hover:text-white'
            }`}
            title="Toggle between Real Web3 Wallet mode and Sandbox Test Mode"
          >
            {isDemoMode ? '⚡ Sandbox Mode: ON (0.25 ETH)' : 'Web3 Wallet Mode'}
          </button>

          {/* Sound Toggle */}
          <button
            id="sound-toggle-btn"
            onClick={toggleSound}
            aria-label="Toggle game sound effects"
            className="p-1 rounded text-[#8e9bb5] hover:text-white hover:bg-[#182030] transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#e5a93c]" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Lockup */}
        <div className="flex items-center gap-6">
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => setActiveTab('arena')}
          >
            <div className="w-9 h-9 rounded-lg bg-[#0052FF] flex items-center justify-center text-white font-black shadow-inner shadow-white/20 relative">
              <Crown className="w-5 h-5 text-[#fcd34d]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-cinzel text-lg font-bold tracking-wider text-white">ROYAL<span className="text-[#0052FF]">BASE</span></span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#0052FF]/20 text-[#60a5fa] border border-[#0052FF]/30 font-semibold uppercase">
                  Base
                </span>
              </div>
              <p className="text-[10px] text-[#8e9bb5] font-medium leading-none">GameFi Tipping Protocol</p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              id="nav-arena-tab"
              onClick={() => setActiveTab('arena')}
              className={`px-3.5 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                activeTab === 'arena'
                  ? 'bg-[#182030] text-white border border-[#26334d]'
                  : 'text-[#8e9bb5] hover:text-white hover:bg-[#121722]'
              }`}
            >
              Tipping Arena
            </button>
            <button
              id="nav-leaderboard-tab"
              onClick={() => setActiveTab('leaderboard')}
              className={`px-3.5 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                activeTab === 'leaderboard'
                  ? 'bg-[#182030] text-white border border-[#26334d]'
                  : 'text-[#8e9bb5] hover:text-white hover:bg-[#121722]'
              }`}
            >
              Leaderboard
            </button>
            <button
              id="nav-vault-tab"
              onClick={() => setActiveTab('vault')}
              className={`px-3.5 py-1.5 rounded-md text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'vault'
                  ? 'bg-[#182030] text-white border border-[#26334d]'
                  : 'text-[#8e9bb5] hover:text-white hover:bg-[#121722]'
              }`}
            >
              <span>Loot Vault</span>
              {userLootCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#d99b26] text-[#090b10]">
                  {userLootCount}
                </span>
              )}
            </button>
            <button
              id="nav-contract-tab"
              onClick={() => setActiveTab('contract')}
              className={`px-3.5 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                activeTab === 'contract'
                  ? 'bg-[#182030] text-white border border-[#26334d]'
                  : 'text-[#8e9bb5] hover:text-white hover:bg-[#121722]'
              }`}
            >
              Base Contracts
            </button>
          </nav>
        </div>

        {/* Right Area: Player stats & RainbowKit Connect */}
        <div className="flex items-center gap-3">
          {/* User EXP & Combo Badge */}
          <div className="hidden lg:flex items-center gap-3 bg-[#111622] border border-[#1d2537] rounded-lg px-3 py-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-[#f6c358]">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-bold font-mono">{userExp}</span>
              <span className="text-[#8e9bb5]">EXP</span>
            </div>
            <div className="w-[1px] h-3 bg-[#242e44]"></div>
            <div className="flex items-center gap-1 text-[#60a5fa]">
              <Zap className="w-3.5 h-3.5 text-[#0052FF]" />
              <span className="font-semibold font-mono">{comboStreak}x</span>
              <span className="text-[#8e9bb5]">Combo</span>
            </div>
            {isDemoMode && (
              <>
                <div className="w-[1px] h-3 bg-[#242e44]"></div>
                <div className="text-[#34d399] font-mono font-bold">
                  {demoBalance.toFixed(3)} ETH
                </div>
              </>
            )}
          </div>

          {/* Network Switcher if connected on wrong chain */}
          {isConnected && !isBase && (
            <button
              id="switch-to-base-btn"
              onClick={() => switchChain?.({ chainId: base.id })}
              className="px-3 py-1.5 rounded-md bg-[#e11d48] hover:bg-[#be123c] text-white text-xs font-bold transition-colors animate-pulse"
            >
              Switch to Base
            </button>
          )}

          {/* Official RainbowKit v2 ConnectButton */}
          <div id="rainbowkit-connect-wrapper">
            <ConnectButton
              showBalance={{ smallScreen: false, largeScreen: true }}
              chainStatus="icon"
              accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="flex md:hidden border-t border-[#182030] bg-[#0c1017] px-2 py-1 justify-around text-xs">
        <button
          onClick={() => setActiveTab('arena')}
          className={`py-1 px-2 font-semibold ${activeTab === 'arena' ? 'text-[#0052FF] border-b-2 border-[#0052FF]' : 'text-[#8e9bb5]'}`}
        >
          Arena
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`py-1 px-2 font-semibold ${activeTab === 'leaderboard' ? 'text-[#0052FF] border-b-2 border-[#0052FF]' : 'text-[#8e9bb5]'}`}
        >
          Rankings
        </button>
        <button
          onClick={() => setActiveTab('vault')}
          className={`py-1 px-2 font-semibold ${activeTab === 'vault' ? 'text-[#0052FF] border-b-2 border-[#0052FF]' : 'text-[#8e9bb5]'}`}
        >
          Vault ({userLootCount})
        </button>
        <button
          onClick={() => setActiveTab('contract')}
          className={`py-1 px-2 font-semibold ${activeTab === 'contract' ? 'text-[#0052FF] border-b-2 border-[#0052FF]' : 'text-[#8e9bb5]'}`}
        >
          Contract
        </button>
      </div>
    </header>
  );
};
