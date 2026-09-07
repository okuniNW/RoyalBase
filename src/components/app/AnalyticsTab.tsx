import React, { useState } from 'react';
import { LeaderboardEntry } from '../../types';
import { TIERS_CONFIG } from '../../data/protocolData';
import { Trophy, Sparkles, Crown, ArrowUpRight, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CONTRACT_ADDRESSES, getBaseScanAddressUrl } from '../../config/contracts';

interface AnalyticsTabProps {
  leaderboard: LeaderboardEntry[];
  userExp: number;
}

export function AnalyticsTab({ leaderboard, userExp }: AnalyticsTabProps) {
  const [leaderboardFilter, setLeaderboardFilter] = useState<'all' | 'tipper' | 'creator'>('all');

  // Find user current tier based on userExp
  const currentTier =
    TIERS_CONFIG.slice().reverse().find((t) => userExp >= t.minPoints) || TIERS_CONFIG[0];
  
  const currentTierIndex = TIERS_CONFIG.findIndex((t) => t.name === currentTier.name);
  const nextTier = TIERS_CONFIG[currentTierIndex + 1];

  const progressPercent = nextTier
    ? Math.min(100, Math.round(((userExp - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100))
    : 100;

  const pointsToNext = nextTier ? nextTier.minPoints - userExp : 0;

  const filteredLeaderboard = leaderboard.filter((entry) => {
    if (leaderboardFilter === 'all') return true;
    return entry.role === leaderboardFilter;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 space-y-6 text-left">
      {/* Royal Points & Tier Progress Block */}
      <div className="sky-card rounded-3xl p-6 sm:p-7 border border-white/80 shadow-[0_8px_30px_rgba(12,74,110,0.06)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-100/70 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-[10px] font-mono font-black text-sky-900 border border-white/80 mb-2">
              <Sparkles className="w-3 h-3 text-lime-600" />
              <span>LOYALTY TIERS · ROYALPOINTS (RP)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Status Royal Points <span className="font-serif italic font-normal text-sky-950">&amp; Progres Tier</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-800 font-medium mt-1">
              Sistem reputasi onchain: semakin aktif bertransaksi, semakin tinggi multiplier reward dan hak istimewa protokol.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono">
            <span className="text-xs bg-white/80 border border-white px-3.5 py-2 rounded-2xl shadow-xs font-bold text-slate-800">
              Smart Contract: <span className="font-black text-sky-800">0xF6F9...e47</span>
            </span>
          </div>
        </div>

        {/* Current Tier Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="sky-card-solid rounded-2xl p-5 font-mono border border-white/90 shadow-xs">
            <span className="text-[11px] text-slate-600 font-bold uppercase tracking-wider">Total Royal Points Anda</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-950 mt-1.5">
              {userExp.toLocaleString()} RP
            </div>
            <div className="text-[11px] text-emerald-700 font-bold mt-1">✓ Onchain Verified di Base</div>
          </div>

          <div className="sky-card-solid rounded-2xl p-5 font-mono border border-white/90 shadow-xs">
            <span className="text-[11px] text-slate-600 font-bold uppercase tracking-wider">Tier Saat Ini</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-950 mt-1.5 flex items-center gap-2">
              <span>{currentTier.name}</span>
              <Crown className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-[11px] text-sky-800 font-bold mt-1 bg-sky-100/70 px-2 py-0.5 rounded-full inline-block">
              Multiplier {currentTier.rpMultiplier}x Boost
            </div>
          </div>

          <div className="sky-card-solid rounded-2xl p-5 font-mono border border-white/90 shadow-xs">
            <span className="text-[11px] text-slate-600 font-bold uppercase tracking-wider">Menuju Tier Berikutnya</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-950 mt-1.5">
              {nextTier ? nextTier.name : 'Max Tier'}
            </div>
            <div className="text-[11px] text-slate-600 font-bold mt-1">
              {nextTier ? `Butuh ${pointsToNext.toLocaleString()} RP lagi` : 'Tier Sovereign tertinggi diraih!'}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-5 border-t border-sky-100/70">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="font-black text-slate-950">
              Progres Tier: {currentTier.name} ({progressPercent}%)
            </span>
            <span className="text-slate-600 font-bold">
              Target: {nextTier ? `${nextTier.minPoints.toLocaleString()} RP (${nextTier.name})` : 'Puncak'}
            </span>
          </div>

          <div className="w-full h-3.5 bg-sky-100/80 rounded-full overflow-hidden p-0.5 border border-sky-200/60">
            <div
              className="h-full bg-lime-400 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(163,230,53,0.6)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Tier Matrix Table */}
        <div className="mt-8">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3">
            Struktur Tier &amp; Keuntungan Onchain
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {TIERS_CONFIG.map((tier) => {
              const isUserTier = tier.name === currentTier.name;
              return (
                <div
                  key={tier.name}
                  className={`p-4 rounded-2xl border text-xs transition-all ${
                    isUserTier
                      ? 'bg-white/95 border-lime-400 ring-2 ring-lime-400/40 shadow-sm'
                      : 'bg-white/60 border-white/80'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono mb-1.5">
                    <span className="font-black text-sm text-slate-950">{tier.name}</span>
                    <span className="text-[11px] font-black text-slate-950 bg-lime-400 px-2 py-0.5 rounded-full">{tier.rpMultiplier}x</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-600 font-bold mb-2.5">
                    {tier.maxPoints === Infinity
                      ? `≥ ${tier.minPoints.toLocaleString()} RP`
                      : `${tier.minPoints.toLocaleString()} - ${tier.maxPoints.toLocaleString()} RP`}
                  </div>

                  <ul className="space-y-1.5 text-[11px] text-slate-700 pt-2.5 border-t border-slate-200/60 font-medium">
                    {tier.perks.map((p, i) => (
                      <li key={i} className="flex items-start gap-1.5 leading-tight">
                        <span className="text-emerald-700 font-black">·</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sovereign Leaderboard Block */}
      <div className="sky-card rounded-3xl p-6 sm:p-7 border border-white/80 shadow-[0_8px_30px_rgba(12,74,110,0.06)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-100/70 pb-4 mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-[10px] font-mono font-black text-slate-950 border border-white/80 mb-2">
              <Trophy className="w-3 h-3 text-amber-500" />
              <span>ONCHAIN CLASSIFICATION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Klasemen <span className="font-serif italic font-normal text-sky-950">Sovereign Leaderboard</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-white/80 p-1.5 rounded-full border border-white shadow-xs text-xs font-bold">
            <button
              onClick={() => setLeaderboardFilter('all')}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                leaderboardFilter === 'all'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setLeaderboardFilter('tipper')}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                leaderboardFilter === 'tipper'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Top Tipper
            </button>
            <button
              onClick={() => setLeaderboardFilter('creator')}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                leaderboardFilter === 'creator'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Top Kreator
            </button>
          </div>
        </div>

        {/* Clean Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-sky-100 text-[11px] text-slate-600 font-bold uppercase tracking-wider">
                <th className="py-3 px-3">Peringkat</th>
                <th className="py-3 px-3">Pengguna</th>
                <th className="py-3 px-3">Peran</th>
                <th className="py-3 px-3">Total ETH</th>
                <th className="py-3 px-3">Total Tip</th>
                <th className="py-3 px-3">Crown Rank</th>
                <th className="py-3 px-3 text-right">BaseScan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-100/60">
              {filteredLeaderboard.map((item) => (
                <tr key={item.rank} className="hover:bg-white/50 transition-colors">
                  <td className="py-3 px-3 font-bold">
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-xl text-xs font-black shadow-xs ${
                        item.rank === 1
                          ? 'bg-amber-300 text-amber-950'
                          : item.rank === 2
                          ? 'bg-slate-200 text-slate-900'
                          : item.rank === 3
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-white/60 text-slate-700'
                      }`}
                    >
                      #{item.rank}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-sans">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.avatarUrl}
                        alt={item.name}
                        className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-xs"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-black text-slate-950 text-xs leading-none">{item.name}</div>
                        <div className="font-mono text-[10px] text-slate-500 font-bold mt-0.5">{item.handle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-black ${
                        item.role === 'tipper'
                          ? 'bg-sky-100 text-sky-900 border border-sky-200'
                          : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                      }`}
                    >
                      {item.role}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-black text-slate-950 text-xs">
                    {item.totalAmountEth.toFixed(2)} ETH
                  </td>
                  <td className="py-3 px-3 text-slate-600 font-bold">
                    {item.tipsCount} tx
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-amber-800 font-black text-[11px] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">{item.crownRank}</span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <a
                      href={getBaseScanAddressUrl(item.address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-800 hover:text-sky-950 font-bold inline-flex items-center gap-1 text-[11px]"
                    >
                      <span>Lihat</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
