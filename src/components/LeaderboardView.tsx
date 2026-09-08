import React, { useState, useMemo } from 'react';
import { LeaderboardEntry, GuildData } from '../types';
import { INITIAL_GUILDS } from '../data/initialData';
import { Crown, Trophy, Swords, Flame, Sparkles, Shield, User, Award, ArrowUpDown, Clock } from 'lucide-react';
import { sounds } from '../utils/audio';
import { formatTimeAgo } from '../utils/formatters';

interface LeaderboardViewProps {
  entries: LeaderboardEntry[];
  guilds?: GuildData[];
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  entries,
  guilds = INITIAL_GUILDS,
}) => {
  const [subTab, setSubTab] = useState<'individual' | 'guilds'>('individual');
  const [sortBy, setSortBy] = useState<'top' | 'recent'>('top');

  const sortedEntries = useMemo(() => {
    return [...entries].sort((a, b) => {
      if (sortBy === 'top') {
        return b.totalAmountEth - a.totalAmountEth;
      } else {
        const timeA = a.lastActiveTimestamp || 0;
        const timeB = b.lastActiveTimestamp || 0;
        return timeB - timeA;
      }
    });
  }, [entries, sortBy]);

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="w-7 h-7 rounded-full bg-[#d99b26] text-[#090b10] font-black text-xs flex items-center justify-center shadow-md shadow-[#d99b26]/30">
            <Crown className="w-4 h-4 fill-current" />
          </div>
        );
      case 2:
        return (
          <div className="w-7 h-7 rounded-full bg-[#94a3b8] text-[#090b10] font-black text-xs flex items-center justify-center">
            2
          </div>
        );
      case 3:
        return (
          <div className="w-7 h-7 rounded-full bg-[#b45309] text-white font-black text-xs flex items-center justify-center">
            3
          </div>
        );
      default:
        return (
          <div className="w-7 h-7 rounded-full bg-[#161d2b] text-[#8e9bb5] font-mono font-bold text-xs flex items-center justify-center border border-[#212c40]">
            {rank}
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#1a2232]">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#0052FF] flex items-center gap-1.5 mb-1">
            <Trophy className="w-4 h-4" />
            Hall of Sovereigns (Base L2)
          </div>
          <h2 className="text-2xl font-extrabold text-white font-cinzel">Leaderboard & Guild Wars</h2>
          <p className="text-xs text-[#8e9bb5] mt-1">
            Klasemen peringkat tipper paling dermawan dan kreator paling berjaya di Base chain.
          </p>
        </div>

        {/* Filter and Tab switch */}
        <div className="flex flex-wrap items-center gap-3">
          {subTab === 'individual' && (
            <div className="flex items-center gap-1.5 bg-[#10141d] border border-[#1b2333] rounded-lg px-3 py-1.5 shadow-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#0052FF]" />
              <label htmlFor="leaderboard-view-sort" className="text-xs text-[#8e9bb5] font-mono">
                Urutkan:
              </label>
              <select
                id="leaderboard-view-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'top' | 'recent')}
                className="bg-transparent text-xs text-white font-bold focus:outline-none cursor-pointer pr-1"
              >
                <option value="top" className="bg-[#10141d] text-white">Top Tipped</option>
                <option value="recent" className="bg-[#10141d] text-white">Most Recent</option>
              </select>
            </div>
          )}

          <div className="flex items-center gap-1 bg-[#10141d] p-1 rounded-lg border border-[#1b2333]">
            <button
              id="tab-sub-individual"
              onClick={() => {
                setSubTab('individual');
                sounds.playCoin();
              }}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-colors ${
                subTab === 'individual'
                  ? 'bg-[#0052FF] text-white'
                  : 'text-[#8e9bb5] hover:text-white'
              }`}
            >
              Individu (Patron & Streamer)
            </button>
            <button
              id="tab-sub-guilds"
              onClick={() => {
                setSubTab('guilds');
                sounds.playCoin();
              }}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-colors flex items-center gap-1.5 ${
                subTab === 'guilds'
                  ? 'bg-[#0052FF] text-white'
                  : 'text-[#8e9bb5] hover:text-white'
              }`}
            >
              <Swords className="w-3.5 h-3.5" />
              <span>Guild Wars</span>
            </button>
          </div>
        </div>
      </div>

      {subTab === 'individual' ? (
        <div className="bg-[#10141d] border border-[#1a2232] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#182030] bg-[#0c0f16] text-[#718096] uppercase font-bold text-[11px]">
                  <th className="py-3.5 px-4 w-16 text-center">Rank</th>
                  <th className="py-3.5 px-4">Nama & Address</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">Sovereign Rank</th>
                  <th className="py-3.5 px-4 text-center">Streak</th>
                  <th className="py-3.5 px-4 text-right">
                    {sortBy === 'recent' ? 'Aktivitas Terakhir / Tip' : 'Total Tipped / Received'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#161d2b]">
                {sortedEntries.map((entry, idx) => {
                  const currentRank = idx + 1;
                  return (
                    <tr key={`${entry.name}-${currentRank}`} className="hover:bg-[#141a26] transition-colors">
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex justify-center">{getRankBadge(currentRank)}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={entry.avatarUrl}
                            alt={entry.name}
                            className="w-9 h-9 rounded-lg object-cover border border-[#243046]"
                          />
                          <div>
                            <div className="font-bold text-white text-sm">{entry.name}</div>
                            <div className="text-[#8e9bb5] font-mono text-[11px]">{entry.handle} ({entry.address})</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          entry.role === 'creator'
                            ? 'bg-[#0052FF]/20 text-[#60a5fa] border border-[#0052FF]/30'
                            : 'bg-[#d99b26]/20 text-[#f6c358] border border-[#d99b26]/30'
                        }`}>
                          {entry.role === 'creator' ? 'Streamer' : 'Patron Tipper'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 font-bold text-[#cbd2e0]">
                          <Crown className="w-3.5 h-3.5 text-[#f6c358]" />
                          <span>{entry.crownRank}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className="font-mono font-bold text-[#f59e0b] bg-[#1a2130] px-2 py-0.5 rounded">
                          {entry.streakDays}d 🔥
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono">
                        <div className="font-bold text-white text-sm">
                          {entry.totalAmountEth.toFixed(2)} ETH
                        </div>
                        {sortBy === 'recent' && (
                          <div className="text-[10px] text-[#0052FF] flex items-center justify-end gap-1 font-bold mt-0.5">
                            <Clock className="w-3 h-3" />
                            <span>{formatTimeAgo(entry.lastActiveTimestamp)}</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Guild Wars Standings */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {guilds.map((g, idx) => (
              <div
                key={g.id}
                className="bg-[#10141d] border border-[#1e273a] hover:border-[#2f3d59] rounded-2xl p-6 space-y-4 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded bg-[#182030] text-[#93c5fd] border border-[#243149]">
                    [{g.tag}]
                  </span>
                  <span className="text-xs font-bold text-[#f6c358]">
                    Rank #{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">{g.name}</h3>
                  <p className="text-xs text-[#8e9bb5] mt-1">Guild Leader: <span className="font-mono text-[#cbd2e0]">{g.leader}</span></p>
                </div>

                <div className="p-3 rounded-lg bg-[#141a26] border border-[#1d2638] space-y-1">
                  <div className="text-[10px] text-[#8e9bb5] uppercase font-semibold">Buff Guild Mingguan</div>
                  <div className="text-xs text-[#34d399] font-semibold">{g.weeklyBuff}</div>
                </div>

                <div className="pt-3 border-t border-[#182030] flex items-center justify-between text-xs">
                  <span className="text-[#8e9bb5]">{g.members} Anggota Aktif</span>
                  <span className="font-mono font-extrabold text-[#d99b26] text-sm">
                    {g.totalTippedEth} ETH
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#0e1219] border border-[#182030] rounded-xl p-5 text-xs text-[#8e9bb5] flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#0052FF] shrink-0" />
              <span>
                Guild Wars mereset ranking setiap hari Minggu pukul 00:00 UTC. Guild #1 membagikan 50% Royal Vault Pool kepada seluruh member yang aktif memberi tip pada pekan berjalan!
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
