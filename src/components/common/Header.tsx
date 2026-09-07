import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ExternalLink, Copy, Check, Menu, X, ArrowUpRight, Crown } from 'lucide-react';
import { CONTRACT_ADDRESSES, getBaseScanAddressUrl } from '../../config/contracts';

interface HeaderProps {
  currentRoute: 'landing' | 'app';
  onNavigate: (route: 'landing' | 'app') => void;
  activeAppTab?: 'game' | 'wallet' | 'analytics';
  onTabChange?: (tab: 'game' | 'wallet' | 'analytics') => void;
}

export function Header({ currentRoute, onNavigate }: HeaderProps) {
  const [copiedContract, setCopiedContract] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleCopy = (address: string, label: string) => {
    navigator.clipboard.writeText(address);
    setCopiedContract(label);
    setTimeout(() => setCopiedContract(null), 2000);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/70 backdrop-blur-xl border-b border-white/60 shadow-[0_4px_20px_rgba(12,74,110,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-3">
        {/* Brand: 3D Inflatable Style Badge + RoyalBase */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 text-left group focus:outline-none"
            id="brand-home-btn"
          >
            {/* 3D Inflatable Royal Badge with Coinbase Blue */}
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-b from-[#3b82f6] via-[#0052FF] to-[#0040cc] shadow-[0_4px_12px_rgba(0,82,255,0.45),inset_0_2px_2px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,35,120,0.3)] flex items-center justify-center text-white font-black text-base tracking-tighter transition-transform group-hover:scale-105 active:scale-95 border border-blue-300/40">
              <Crown className="w-5 h-5 text-white fill-white" />
            </div>

            <div className="flex flex-col">
              <span className="font-bubble text-xl font-bold tracking-tight text-slate-950 leading-none flex items-center gap-1 drop-shadow-xs">
                RoyalBase
              </span>
              <span className="text-[10px] font-mono text-[#0052FF] font-extrabold tracking-widest uppercase mt-0.5">
                Base L2 · GameFi
              </span>
            </div>
          </button>

          {/* Navigation Glass Pills */}
          <nav className="hidden md:flex items-center gap-1.5 ml-2">
            <button
              onClick={() => onNavigate('landing')}
              id="nav-landing-btn"
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                currentRoute === 'landing'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-white/60 hover:bg-white/90 text-slate-700 hover:text-slate-950 border border-white/70'
              }`}
            >
              Landing
            </button>
            <button
              onClick={() => onNavigate('app')}
              id="nav-app-btn"
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                currentRoute === 'app'
                  ? 'bg-[#0052FF] text-white shadow-[0_2px_10px_rgba(0,82,255,0.4)] border border-blue-400/40'
                  : 'bg-white/60 hover:bg-white/90 text-slate-700 hover:text-slate-950 border border-white/70'
              }`}
            >
              <span>Buka App</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </nav>
        </div>

        {/* Right Actions & Menu Pill */}
        <div className="flex items-center gap-2.5">
          {/* Base Mainnet status indicator pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-white/70 text-[11px] font-mono text-slate-800 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0052FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0052FF]"></span>
            </span>
            <span className="font-bold text-slate-800">Base Mainnet</span>
          </div>

          {/* Connect Wallet Button */}
          <div id="rainbowkit-connect-wrapper" className="scale-95 sm:scale-100">
            <ConnectButton
              showBalance={{ smallScreen: false, largeScreen: true }}
              chainStatus="icon"
              accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }}
            />
          </div>

          {/* MENU Pill (as seen in screenshots) */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="px-4 py-2 rounded-full bg-sky-100/70 hover:bg-sky-200/80 active:bg-sky-200 text-sky-950 text-xs font-extrabold uppercase tracking-wider backdrop-blur-md border border-white/80 shadow-xs flex items-center gap-1.5 transition-all focus:outline-none"
              id="tg-menu-btn"
            >
              {menuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
              <span>Menu</span>
            </button>

            {/* Dropdown Card */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-64 sky-card-solid rounded-3xl p-4 shadow-xl border border-white/80 z-50 text-left animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-2.5">
                  <span className="text-[11px] font-mono font-bold text-sky-900 uppercase tracking-wider">
                    Quick Navigation
                  </span>
                  <span className="text-[10px] font-mono bg-blue-100 text-[#0052FF] px-2 py-0.5 rounded-full font-bold">
                    8453
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => {
                      onNavigate('landing');
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-sky-50 text-slate-800 font-bold transition-colors"
                  >
                    Landing Page
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('app');
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl bg-[#0052FF] hover:bg-[#0045d8] text-white font-extrabold flex items-center justify-between transition-colors shadow-xs"
                  >
                    <span>Buka App (TipGame)</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="border-t border-slate-100 pt-2.5 mt-2.5 space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Smart Contracts
                  </div>
                  
                  <div className="flex items-center justify-between text-xs font-mono bg-slate-50 p-2 rounded-xl">
                    <span className="font-bold text-slate-700">B20Royal V2</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopy(CONTRACT_ADDRESSES.B20_ROYAL_V2, 'B20')}
                        className="p-1 hover:bg-white rounded text-slate-500"
                        title="Copy address"
                      >
                        {copiedContract === 'B20' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </button>
                      <a
                        href={getBaseScanAddressUrl(CONTRACT_ADDRESSES.B20_ROYAL_V2)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:bg-white rounded text-slate-500"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono bg-slate-50 p-2 rounded-xl">
                    <span className="font-bold text-slate-700">RoyalPoints</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopy(CONTRACT_ADDRESSES.ROYAL_POINTS, 'RP')}
                        className="p-1 hover:bg-white rounded text-slate-500"
                        title="Copy address"
                      >
                        {copiedContract === 'RP' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </button>
                      <a
                        href={getBaseScanAddressUrl(CONTRACT_ADDRESSES.ROYAL_POINTS)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:bg-white rounded text-slate-500"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
