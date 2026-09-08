import React, { useState, useMemo } from 'react';
import { GamerProfile } from '../types';
import { Crown, Zap, Shield, Search, Sparkles, Radio, CheckCircle2, ChevronRight, Swords, ArrowUpDown, Clock } from 'lucide-react';
import { sounds } from '../utils/audio';
import { formatTimeAgo } from '../utils/formatters';

interface ArenaViewProps {
  creators: GamerProfile[];
  onOpenTipModal: (creator: GamerProfile, quickAmount?: number) => void;
  comboStreak: number;
}

export const ArenaView: React.FC<ArenaViewProps> = ({
  creators,
  onOpenTipModal,
  comboStreak,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'top' | 'recent'>('top');

  const categories = ['All', 'Live Now', 'Base RPG', 'Parallel TCG', 'FrenPet', 'Esports Arena', 'Base Builders'];

  const filteredCreators = creators.filter((c) => {
    if (selectedCategory === 'Live Now' && c.streamStatus !== 'live') return false;
    if (selectedCategory !== 'All' && selectedCategory !== 'Live Now' && c.gameCategory !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.gameTitle.toLowerCase().includes(q) ||
        c.guildTag.toLowerCase().includes(q) ||
        c.handle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const sortedCreators = useMemo(() => {
    return [...filteredCreators].sort((a, b) => {
      if (sortBy === 'top') {
        return b.totalTipsReceivedEth - a.totalTipsReceivedEth;
      } else {
        const timeA = a.lastTippedAt || 0;
        const timeB = b.lastTippedAt || 0;
        return timeB - timeA;
      }
    });
  }, [filteredCreators, sortBy]);

  // Spotlight Sovereign King
  const sovereignKing = creators.find((c) => c.crownRank === 'Sovereign King') || creators[0];

  return (
    <div className="space-y-8">
      {/* King of the Hill / Sovereign Spotlight Banner */}
      {sovereignKing && (
        <div className="relative overflow-hidden rounded-xl border border-[#d99b26]/30 bg-gradient-to-r from-[#17140f] via-[#12151c] to-[#0c121e] p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            {/* Left: Crown & Player Info */}
            <div className="flex items-start sm:items-center gap-5">
              <div className="relative shrink-0">
                <img
                  src={sovereignKing.avatarUrl}
                  alt={sovereignKing.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border-2 border-[#d99b26] shadow-lg shadow-[#d99b26]/10"
                />
                <div className="absolute -top-2.5 -right-2.5 bg-[#d99b26] text-[#090b10] p-1.5 rounded-full shadow-md">
                  <Crown className="w-4 h-4 fill-current" />
                </div>
                {sovereignKing.streamStatus === 'live' && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#ef4444] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    Live
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#d99b26]/20 text-[#f6c358] border border-[#d99b26]/30 flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    Reigning Sovereign King
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#1e2638] text-[#93c5fd]">
                    Guild [{sovereignKing.guildTag}]
                  </span>
                  <span className="text-[11px] font-mono text-[#8e9bb5]">
                    Lvl {sovereignKing.level}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-cinzel tracking-wide">
                    {sovereignKing.name}
                  </h2>
                  {sovereignKing.verified && (
                    <CheckCircle2 className="w-5 h-5 text-[#0052FF]" />
                  )}
                </div>

                <p className="text-sm text-[#cbd2e0] max-w-xl line-clamp-2">
                  {sovereignKing.gameTitle} — {sovereignKing.bio}
                </p>

                {sovereignKing.activeBuff && (
                  <div className="flex items-center gap-1.5 text-xs text-[#f6c358] font-medium pt-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{sovereignKing.activeBuff}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Quick Tipping Action */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <div className="bg-[#121622] border border-[#212c42] rounded-lg p-3 text-center sm:text-left">
                <div className="text-[11px] text-[#8e9bb5] uppercase font-semibold">Total Bounty Received</div>
                <div className="text-xl font-extrabold font-mono text-[#d99b26]">
                  {sovereignKing.totalTipsReceivedEth.toFixed(2)} ETH
                </div>
              </div>

              <button
                id="spotlight-tip-btn"
                onClick={() => {
                  sounds.playCoin();
                  onOpenTipModal(sovereignKing);
                }}
                className="px-6 py-3 rounded-lg bg-[#0052FF] hover:bg-[#0047e0] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#0052FF]/20 transition-transform active:scale-95"
              >
                <Crown className="w-4 h-4 text-[#fcd34d]" />
                <span>Tip Sovereign & Roll Loot</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => {
                setSelectedCategory(cat);
                sounds.playCoin();
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#0052FF] text-white shadow-sm'
                  : 'bg-[#11151e] text-[#8e9bb5] hover:text-white hover:bg-[#182030] border border-[#1b2333]'
              }`}
            >
              {cat === 'Live Now' && <Radio className="w-3 h-3 inline mr-1 text-[#ef4444]" />}
              {cat}
            </button>
          ))}
        </div>

        {/* Sort and Search controls */}
        <div className="flex items-center gap-3">
          {/* Dropdown Filter for Sorting */}
          <div className="flex items-center gap-1.5 bg-[#11151e] border border-[#1b2333] rounded-lg px-3 py-1.5 shadow-xs shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#0052FF]" />
            <label htmlFor="arena-creator-sort" className="text-xs text-[#8e9bb5] font-mono whitespace-nowrap">
              Urutkan:
            </label>
            <select
              id="arena-creator-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'top' | 'recent')}
              className="bg-transparent text-xs text-white font-bold focus:outline-none cursor-pointer pr-1"
            >
              <option value="top" className="bg-[#11151e] text-white">Top Tipped</option>
              <option value="recent" className="bg-[#11151e] text-white">Most Recent</option>
            </select>
          </div>

          {/* Search input */}
          <div className="relative w-full md:w-60">
            <Search className="w-4 h-4 text-[#606f8c] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="arena-search-input"
              type="text"
              placeholder="Cari kreator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#11151e] border border-[#1b2333] focus:border-[#0052FF] text-sm text-white placeholder-[#5a6884] rounded-lg pl-9 pr-3 py-1.5 outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Grid of Creators / Streamers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sortedCreators.map((creator) => (
          <div
            key={creator.id}
            id={`creator-card-${creator.id}`}
            className="bg-[#10141d] border border-[#1a2232] hover:border-[#2b3954] rounded-xl p-5 flex flex-col justify-between transition-all duration-200"
          >
            {/* Top Bar: Live Status & Guild Tag */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  {creator.streamStatus === 'live' ? (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#ef4444]/15 border border-[#ef4444]/30 text-[#ef4444] text-[10px] font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-pulse"></span>
                      LIVE ({creator.viewerCount?.toLocaleString()} viewers)
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-[#182030] text-[#718096] text-[10px] font-semibold uppercase">
                      Offline
                    </span>
                  )}
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#161f30] text-[#93c5fd] font-semibold border border-[#23314c]">
                    [{creator.guildTag}]
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-bold text-[#f6c358]">
                  <Crown className="w-3.5 h-3.5" />
                  <span>{creator.crownRank}</span>
                </div>
              </div>

              {/* Creator Header */}
              <div className="flex items-start gap-3.5 mb-3">
                <img
                  src={creator.avatarUrl}
                  alt={creator.name}
                  className="w-14 h-14 rounded-lg object-cover border border-[#253046] shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <h3 className="text-base font-bold text-white truncate">{creator.name}</h3>
                    {creator.verified && <CheckCircle2 className="w-4 h-4 text-[#0052FF] shrink-0" />}
                  </div>
                  <div className="text-xs text-[#8e9bb5] truncate font-mono">{creator.handle}</div>
                  <div className="text-xs font-semibold text-[#cbd2e0] mt-0.5 truncate">
                    {creator.gameTitle}
                  </div>
                </div>
              </div>

              {/* Tips & Activity Badge */}
              <div className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-[#141a26] border border-[#1e2638] mb-3">
                <div className="flex items-center gap-1 text-[#8e9bb5]">
                  <span>Tip:</span>
                  <span className="font-mono font-bold text-white">{creator.totalTipsReceivedEth.toFixed(2)} ETH</span>
                </div>
                {creator.lastTippedAt && (
                  <div className="flex items-center gap-1 text-[#0052FF] font-mono text-[11px] font-semibold">
                    <Clock className="w-3 h-3" />
                    <span>{formatTimeAgo(creator.lastTippedAt)}</span>
                  </div>
                )}
              </div>

              {/* Bio / Description */}
              <p className="text-xs text-[#8e9bb5] line-clamp-2 mb-4 leading-relaxed">
                {creator.bio}
              </p>
            </div>

            {/* Bottom Actions & Quick Tips */}
            <div className="pt-3 border-t border-[#182030] space-y-3">
              {/* Quick tip chip row */}
              <div className="flex items-center justify-between gap-1.5">
                <span className="text-[11px] text-[#718096] font-medium">Quick Tip:</span>
                <div className="flex items-center gap-1.5">
                  {[0.001, 0.005, 0.02].map((amt) => (
                    <button
                      key={amt}
                      id={`quick-tip-${creator.id}-${amt}`}
                      onClick={() => {
                        sounds.playCoin();
                        onOpenTipModal(creator, amt);
                      }}
                      className="px-2 py-1 rounded bg-[#161c28] hover:bg-[#1e2638] text-[11px] font-mono font-bold text-[#cbd2e0] hover:text-[#0052FF] border border-[#242f44] transition-colors"
                    >
                      +{amt} ETH
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Tip Action Button */}
              <button
                id={`open-tip-modal-${creator.id}`}
                onClick={() => {
                  sounds.playCoin();
                  onOpenTipModal(creator);
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-[#0052FF] hover:bg-[#0047e0] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Send Royal Tip & Roll Loot</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
