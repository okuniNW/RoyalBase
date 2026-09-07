import React, { useState, useEffect } from 'react';
import { ArrowRight, ExternalLink, Copy, Check, ShieldCheck, Zap, Coins, Trophy, Sparkles } from 'lucide-react';
import { CONTRACT_ADDRESSES, getBaseScanAddressUrl } from '../../config/contracts';
import { INITIAL_PRIZE_POOL } from '../../data/protocolData';

interface LandingHeroProps {
  onLaunchApp: () => void;
  onExploreContract?: () => void;
}

export function LandingHero({ onLaunchApp }: LandingHeroProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [simulatedAmount, setSimulatedAmount] = useState<number>(0.01);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(INITIAL_PRIZE_POOL.nextDrawSecondsRemaining);

  // Live countdown timer for the prize pool draw
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : 86400));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const calculatedRecipientEth = (simulatedAmount * 0.98).toFixed(4);
  const calculatedPoolEth = (simulatedAmount * 0.02).toFixed(5);
  const calculatedPoints = Math.round(simulatedAmount * 10000 * 1.25);

  return (
    <section className="relative w-full pt-10 pb-16 lg:pt-14 lg:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main 2-column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Typography, Value Proposition & Contract Verification */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* 3D Inflatable Brand Highlight ala TOUCH GRASS */}
            <div className="flex items-center gap-3 mb-4">
              <span className="inflatable-3d-coinbase text-2xl sm:text-3xl font-bubble font-bold select-none tracking-tight">
                ROYALBASE
              </span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-white/80 text-[10px] font-mono font-bold text-[#0052FF] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#0052FF] animate-pulse" />
                BASE L2 PROTOCOL
              </div>
            </div>

            {/* Bold Display Headline with Signature Serif Accent */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-[1.08]">
              Tip Kreator & Gamer, <br />
              <span className="font-serif italic font-normal text-sky-950">Menangkan Pool</span> di Base.
            </h1>

            {/* Sub-paragraph */}
            <p className="mt-5 text-base sm:text-lg text-slate-800 font-medium leading-relaxed max-w-2xl">
              Protokol tipping onchain non-kustodial dengan reward instan. Kirim tip ke kreator favorit, kumpulkan{' '}
              <strong className="text-slate-950 font-bold bg-white/60 px-1.5 py-0.5 rounded-md">Royal Points (RP)</strong>, dan rebut{' '}
              <strong className="text-white font-bold bg-[#0052FF] px-2 py-0.5 rounded-md shadow-xs">Prize Pool harian</strong> dengan gas fee sub-cent di Base L2.
            </p>

            {/* Action CTA Row with Coinbase Blue Button */}
            <div className="mt-7 flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onLaunchApp}
                id="hero-launch-app-btn"
                className="px-7 py-3.5 rounded-full bg-[#0052FF] hover:bg-[#0045d8] active:bg-[#003bb5] text-white text-sm font-black tracking-tight flex items-center gap-2.5 shadow-[0_4px_16px_rgba(0,82,255,0.4)] border border-blue-400/40 transition-all transform hover:-translate-y-0.5 focus:outline-none cursor-pointer"
              >
                <span>Buka App (Launch App)</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <a
                href={getBaseScanAddressUrl(CONTRACT_ADDRESSES.B20_ROYAL_V2)}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-view-contract-btn"
                className="px-6 py-3.5 rounded-full bg-white/75 hover:bg-white border border-white/80 text-slate-900 text-sm font-bold flex items-center gap-2 backdrop-blur-md shadow-xs transition-all focus:outline-none"
              >
                <span>BaseScan Explorer</span>
                <ExternalLink className="w-4 h-4 text-slate-500" />
              </a>
            </div>

            {/* Verified Smart Contracts Box (Frosted Glass Card) */}
            <div className="mt-8 w-full sky-card rounded-3xl p-5 sm:p-6">
              <div className="flex items-center justify-between border-b border-sky-100/60 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                    Verified Smart Contracts on Base
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-100/80 backdrop-blur-xs px-2.5 py-0.5 rounded-full font-bold border border-emerald-200">
                  Mainnet 8453
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* B20Royal V2 */}
                <div className="sky-card-subtle rounded-2xl p-3.5 hover:bg-white/85 transition-colors">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-extrabold text-slate-900">B20Royal V2</span>
                    <span className="text-[10px] text-sky-800 font-mono font-semibold">Tipping & Prize Pool</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <code className="text-[11px] font-mono text-slate-700 truncate font-medium">
                      {CONTRACT_ADDRESSES.B20_ROYAL_V2}
                    </code>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleCopy(CONTRACT_ADDRESSES.B20_ROYAL_V2, 'b20')}
                        className="p-1.5 rounded-lg hover:bg-white text-slate-600 hover:text-slate-950 transition-colors"
                        title="Salin Alamat"
                      >
                        {copiedKey === 'b20' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <a
                        href={getBaseScanAddressUrl(CONTRACT_ADDRESSES.B20_ROYAL_V2)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg hover:bg-white text-slate-600 hover:text-slate-950 transition-colors"
                        title="Buka di BaseScan"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* RoyalPoints */}
                <div className="sky-card-subtle rounded-2xl p-3.5 hover:bg-white/85 transition-colors">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-extrabold text-slate-900">RoyalPoints (RP)</span>
                    <span className="text-[10px] text-sky-800 font-mono font-semibold">Reward Ledger</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <code className="text-[11px] font-mono text-slate-700 truncate font-medium">
                      {CONTRACT_ADDRESSES.ROYAL_POINTS}
                    </code>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleCopy(CONTRACT_ADDRESSES.ROYAL_POINTS, 'rp')}
                        className="p-1.5 rounded-lg hover:bg-white text-slate-600 hover:text-slate-950 transition-colors"
                        title="Salin Alamat"
                      >
                        {copiedKey === 'rp' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <a
                        href={getBaseScanAddressUrl(CONTRACT_ADDRESSES.ROYAL_POINTS)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg hover:bg-white text-slate-600 hover:text-slate-950 transition-colors"
                        title="Buka di BaseScan"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Simulator & Live Engine Card */}
          <div className="lg:col-span-5 w-full">
            <div className="sky-card-solid rounded-3xl shadow-xl overflow-hidden border border-white/80">
              {/* Card Header Bar */}
              <div className="bg-sky-50/60 backdrop-blur-md px-5 py-3.5 border-b border-sky-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Live Onchain Engine
                  </span>
                </div>
                <span className="text-[11px] font-mono text-sky-900 font-bold bg-white/80 px-2.5 py-0.5 rounded-full border border-sky-100">
                  Epoch #42
                </span>
              </div>

              {/* Prize Pool Highlight Block */}
              <div className="p-6 border-b border-sky-100/70 bg-gradient-to-b from-white to-sky-50/30">
                <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5">
                  <span className="font-bold uppercase tracking-wider text-[11px] text-sky-900">Active Daily Prize Pool</span>
                  <span className="font-mono text-[#0052FF] font-bold flex items-center gap-1 bg-blue-100/90 px-2 py-0.5 rounded-full text-[10px]">
                    <Trophy className="w-3 h-3 text-amber-600" />
                    <span>24h Draw</span>
                  </span>
                </div>

                <div className="flex items-baseline justify-between gap-4 mt-2">
                  <div>
                    <div className="text-3xl sm:text-4xl font-black font-mono text-slate-950 tracking-tight">
                      {INITIAL_PRIZE_POOL.totalEth.toFixed(3)} <span className="text-xl text-[#0052FF]">ETH</span>
                    </div>
                    <div className="text-xs font-mono text-slate-500 font-semibold mt-0.5">
                      ≈ ${INITIAL_PRIZE_POOL.usdValue.toLocaleString()} USD
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Undian Berikutnya
                    </div>
                    <div className="text-sm sm:text-base font-bold font-mono text-slate-950 bg-sky-100/90 backdrop-blur-xs px-3 py-1 rounded-full border border-sky-200 mt-1 inline-block">
                      {formatCountdown(countdownSeconds)}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-sky-100 grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="text-slate-600">
                    Partisipan: <span className="font-bold text-slate-900">{INITIAL_PRIZE_POOL.participantsCount} Tiket</span>
                  </div>
                  <div className="text-right text-slate-600 truncate">
                    Top Tipper: <span className="font-bold text-slate-900">0x3249...3510</span>
                  </div>
                </div>
              </div>

              {/* Interactive Tip & RP Calculator Simulator */}
              <div className="p-6">
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-black text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#0052FF]" />
                    <span>Simulasi Tip & Royal Points</span>
                  </span>
                  <span className="text-[11px] font-mono text-[#0052FF] bg-blue-50 px-2 py-0.5 rounded-full font-bold border border-blue-100">
                    1.25x Multiplier
                  </span>
                </div>

                {/* Preset Amount Selector */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[0.005, 0.01, 0.05, 0.1].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setSimulatedAmount(amt)}
                      className={`py-2 px-1 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                        simulatedAmount === amt
                          ? 'bg-[#0052FF] text-white border-[#0052FF] shadow-sm'
                          : 'bg-white/80 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      {amt} ETH
                    </button>
                  ))}
                </div>

                {/* Breakdown Table */}
                <div className="bg-sky-50/50 backdrop-blur-xs border border-sky-100 rounded-2xl p-3.5 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Alokasi Kreator (98%):</span>
                    <span className="font-bold text-slate-950">{calculatedRecipientEth} ETH</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Kontribusi Prize Pool (2%):</span>
                    <span className="font-bold text-[#0052FF]">+{calculatedPoolEth} ETH</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-sky-100">
                    <span className="text-slate-900 font-black">Royal Points (RP):</span>
                    <span className="font-bold text-[#0052FF]">+{calculatedPoints} RP</span>
                  </div>
                </div>

                {/* Forward Button to App */}
                <button
                  onClick={onLaunchApp}
                  id="simulator-send-tip-btn"
                  className="mt-4 w-full py-3 px-4 rounded-full bg-[#0052FF] hover:bg-[#0045d8] active:bg-[#003bb5] text-white text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-[#0052FF]/20"
                >
                  <Coins className="w-3.5 h-3.5 text-blue-200" />
                  <span>Kirim Tip Ini di App</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Card Footer */}
              <div className="bg-sky-50/60 backdrop-blur-md px-5 py-3 border-t border-sky-100 flex items-center justify-between text-[11px] font-mono text-slate-600">
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span>Gas: &lt; $0.001</span>
                </span>
                <span>Konfirmasi: ~2 Detik</span>
                <span className="text-emerald-700 font-bold">Non-Kustodial</span>
              </div>
            </div>
          </div>
        </div>

        {/* Protocol Highlights Strip (Frosted Glass Cards) */}
        <div className="mt-14 pt-8 border-t border-white/60 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          <div className="sky-card rounded-3xl p-5 text-left transition-all duration-200 hover:translate-y-[-2px]">
            <div className="text-[11px] font-mono text-sky-900 uppercase tracking-wider font-bold">Total Volume Tipped</div>
            <div className="text-xl sm:text-2xl font-black font-mono text-slate-950 mt-1">248.85 ETH</div>
            <div className="text-xs text-slate-600 font-medium mt-0.5">≈ $846,090 USD di Base</div>
          </div>

          <div className="sky-card rounded-3xl p-5 text-left transition-all duration-200 hover:translate-y-[-2px]">
            <div className="text-[11px] font-mono text-sky-900 uppercase tracking-wider font-bold">Royal Points Diterbitkan</div>
            <div className="text-xl sm:text-2xl font-black font-mono text-slate-950 mt-1">1,450,200 RP</div>
            <div className="text-xs text-emerald-700 font-bold mt-0.5">Semua Tier Aktif</div>
          </div>

          <div className="sky-card rounded-3xl p-5 text-left transition-all duration-200 hover:translate-y-[-2px]">
            <div className="text-[11px] font-mono text-sky-900 uppercase tracking-wider font-bold">Active Prize Pool</div>
            <div className="text-xl sm:text-2xl font-black font-mono text-sky-700 mt-1">4.280 ETH</div>
            <div className="text-xs text-slate-600 font-medium mt-0.5">Undian tiap 24 Jam</div>
          </div>

          <div className="sky-card rounded-3xl p-5 text-left transition-all duration-200 hover:translate-y-[-2px]">
            <div className="text-[11px] font-mono text-sky-900 uppercase tracking-wider font-bold">Kecepatan & Biaya Gas</div>
            <div className="text-xl sm:text-2xl font-black font-mono text-emerald-600 mt-1">&lt; $0.001</div>
            <div className="text-xs text-slate-600 font-medium mt-0.5">Base Layer-2 Mainnet</div>
          </div>
        </div>
      </div>
    </section>
  );
}
