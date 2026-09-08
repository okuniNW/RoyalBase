import React, { useState, useMemo } from 'react';
import { TipTransaction } from '../types';
import { 
  Clock, 
  ExternalLink, 
  Copy, 
  Check, 
  Search, 
  Coins, 
  Sparkles, 
  ArrowUpRight, 
  Crown,
  ShieldCheck,
  Filter
} from 'lucide-react';
import { getBaseScanAddressUrl, getBaseScanTxUrl } from '../config/contracts';

interface TipHistoryProps {
  tips: TipTransaction[];
  title?: string;
  subtitle?: string;
  maxHeight?: string;
  showSearch?: boolean;
  className?: string;
}

export function TipHistory({
  tips,
  title = 'Log Transaksi Tip Onchain',
  subtitle = 'Daftar riwayat tip terkini yang terverifikasi di Base Mainnet',
  maxHeight = 'max-h-[460px]',
  showSearch = true,
  className = '',
}: TipHistoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterToken, setFilterToken] = useState<'ALL' | 'ETH' | 'TOP'>('ALL');

  // Format short address: 0x1234...abcd
  const formatAddress = (addr: string) => {
    if (!addr || addr.length < 10) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Format relative time in Indonesian
  const formatTimeAgo = (timestamp: number) => {
    const diff = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
    if (diff < 60) return `${diff}d yang lalu`;
    const mins = Math.floor(diff / 60);
    if (mins < 60) return `${mins}m yang lalu`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}j yang lalu`;
    const days = Math.floor(hours / 24);
    return `${days}h yang lalu`;
  };

  const handleCopy = (id: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId((current) => (current === id ? null : current));
      }, 2000);
    }
  };

  // Filtered tips
  const filteredTips = useMemo(() => {
    return tips.filter((tip) => {
      // Token / Amount filter
      if (filterToken === 'ETH' && tip.token !== 'ETH') return false;
      if (filterToken === 'TOP' && tip.amount < 0.05) return false;

      // Text search
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchSender = tip.senderAddress.toLowerCase().includes(q) || (tip.senderName && tip.senderName.toLowerCase().includes(q));
      const matchRecipient = tip.recipientName.toLowerCase().includes(q) || tip.recipientAddress.toLowerCase().includes(q);
      const matchMessage = tip.message.toLowerCase().includes(q);
      const matchTx = tip.txHash.toLowerCase().includes(q);
      return matchSender || matchRecipient || matchMessage || matchTx;
    });
  }, [tips, searchQuery, filterToken]);

  // Aggregate stats
  const totalVolumeEth = useMemo(() => {
    return tips
      .filter((t) => t.token === 'ETH')
      .reduce((acc, curr) => acc + curr.amount, 0);
  }, [tips]);

  return (
    <section 
      id="tip-history-section"
      className={`sky-card rounded-3xl p-5 sm:p-7 border border-white/80 shadow-[0_8px_30px_rgba(12,74,110,0.06)] text-left ${className}`}
    >
      {/* Header section with title and stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-sky-100/70 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0052FF] animate-pulse" />
            <span className="text-[10px] font-mono font-black text-[#0052FF] uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              Live Onchain Feed · Base L2
            </span>
            <span className="text-[11px] font-mono text-slate-500 font-bold">
              {tips.length} Transaksi Tercatat
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight flex items-center gap-2">
            <span>{title}</span>
            <Coins className="w-5 h-5 text-[#0052FF]" />
          </h3>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            {subtitle}
          </p>
        </div>

        {/* Quick summary stats */}
        <div className="flex items-center gap-2.5 font-mono text-xs">
          <div className="sky-card-solid rounded-2xl px-3.5 py-2 border border-white/90 shadow-xs">
            <div className="text-[10px] text-slate-500 font-bold uppercase">Total Volume Tip</div>
            <div className="text-sm font-black text-slate-950">
              {totalVolumeEth.toFixed(3)} ETH
            </div>
          </div>
          <div className="sky-card-solid rounded-2xl px-3.5 py-2 border border-white/90 shadow-xs">
            <div className="text-[10px] text-slate-500 font-bold uppercase">Status Jaringan</div>
            <div className="text-sm font-black text-[#0052FF] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Base Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      {showSearch && (
        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pengirim (0x... / ENS), kreator, atau pesan..."
              className="w-full pl-9 pr-3.5 py-2 text-xs bg-white/80 border border-white/90 rounded-xl focus:outline-none focus:bg-white focus:border-[#0052FF] text-slate-950 shadow-xs font-medium placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Filter buttons */}
          <div className="flex items-center gap-1.5 shrink-0 font-mono text-xs">
            <button
              onClick={() => setFilterToken('ALL')}
              className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-bold text-[11px] ${
                filterToken === 'ALL'
                  ? 'bg-[#0052FF] text-white border-blue-400/40 shadow-xs'
                  : 'bg-white/70 text-slate-700 border-white/80 hover:bg-white'
              }`}
            >
              Semua ({tips.length})
            </button>
            <button
              onClick={() => setFilterToken('ETH')}
              className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-bold text-[11px] ${
                filterToken === 'ETH'
                  ? 'bg-[#0052FF] text-white border-blue-400/40 shadow-xs'
                  : 'bg-white/70 text-slate-700 border-white/80 hover:bg-white'
              }`}
            >
              ETH Only
            </button>
            <button
              onClick={() => setFilterToken('TOP')}
              className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-bold text-[11px] ${
                filterToken === 'TOP'
                  ? 'bg-[#0052FF] text-white border-blue-400/40 shadow-xs'
                  : 'bg-white/70 text-slate-700 border-white/80 hover:bg-white'
              }`}
            >
              Top Tips (&ge;0.05)
            </button>
          </div>
        </div>
      )}

      {/* Scrollable Transaction List */}
      <div className={`mt-4 ${maxHeight} overflow-y-auto pr-1 space-y-2.5 scrollbar-thin scrollbar-thumb-sky-200 scrollbar-track-transparent`}>
        {filteredTips.length === 0 ? (
          <div className="bg-white/60 border border-white/80 rounded-2xl p-8 text-center text-slate-500 space-y-2">
            <Filter className="w-8 h-8 text-slate-400 mx-auto stroke-1" />
            <p className="text-xs font-bold text-slate-700">Tidak ada transaksi tip yang cocok</p>
            <p className="text-[11px]">Coba ubah kata kunci pencarian atau reset filter</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-xs font-black text-[#0052FF] hover:underline cursor-pointer"
              >
                Reset Pencarian
              </button>
            )}
          </div>
        ) : (
          filteredTips.map((tip) => {
            const isCopied = copiedId === tip.id;

            return (
              <div
                key={tip.id}
                className="bg-white/80 hover:bg-white/95 transition-all duration-150 border border-white/90 rounded-2xl p-4 shadow-xs hover:shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Left Column: Sender & Recipient Information */}
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Sender Info */}
                      <div className="inline-flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200/80 text-xs font-mono">
                        <span className="text-[10px] text-slate-400 font-bold">Dari:</span>
                        {tip.senderName ? (
                          <span className="font-black text-slate-900">{tip.senderName}</span>
                        ) : null}
                        <span 
                          title={tip.senderAddress}
                          className="font-bold text-slate-700"
                        >
                          {formatAddress(tip.senderAddress)}
                        </span>

                        {/* Quick Copy Sender Address */}
                        <button
                          onClick={() => handleCopy(tip.id, tip.senderAddress)}
                          title="Salin alamat pengirim"
                          className="p-1 rounded-md hover:bg-slate-200/70 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
                        >
                          {isCopied ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>

                        {/* Link to BaseScan Sender Address */}
                        <a
                          href={getBaseScanAddressUrl(tip.senderAddress)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Lihat alamat pengirim di BaseScan"
                          className="p-1 rounded-md hover:bg-slate-200/70 text-slate-500 hover:text-[#0052FF] transition-all"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      {/* Direction Arrow */}
                      <span className="text-slate-400 font-bold text-xs">→</span>

                      {/* Recipient Info */}
                      <div className="inline-flex items-center gap-1.5 bg-blue-50/80 px-2.5 py-1 rounded-xl border border-blue-100 text-xs font-mono">
                        <span className="text-[10px] text-blue-500 font-bold">Kreator:</span>
                        <span className="font-black text-slate-950">{tip.recipientName}</span>
                      </div>

                      {/* Time Ago */}
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        <span>{formatTimeAgo(tip.timestamp)}</span>
                      </span>
                    </div>

                    {/* Tip Message */}
                    {tip.message && (
                      <p className="text-xs text-slate-700 italic bg-sky-50/40 px-3 py-1.5 rounded-xl border border-sky-100/50 mt-1 font-sans">
                        "{tip.message}"
                      </p>
                    )}
                  </div>

                  {/* Right Column: Amount & Rewards */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1.5 shrink-0 font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm sm:text-base font-black text-slate-950">
                        +{tip.amount} {tip.token}
                      </span>
                      {tip.token === 'ETH' && (
                        <span className="text-[10px] font-bold text-slate-400">
                          (~${(tip.amount * 3400).toFixed(1)})
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-[#0052FF] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                        +{tip.expEarned} RP
                      </span>

                      {tip.comboMultiplier && tip.comboMultiplier > 1 && (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          {tip.comboMultiplier}x Boost
                        </span>
                      )}

                      {/* BaseScan Tx Link */}
                      <a
                        href={getBaseScanTxUrl(tip.txHash)}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Verifikasi transaksi di BaseScan Explorer"
                        className="inline-flex items-center gap-0.5 text-[10px] font-bold text-slate-500 hover:text-[#0052FF] hover:bg-slate-100 px-1.5 py-0.5 rounded transition-colors"
                      >
                        <span>Tx</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Optional Loot Item banner if dropped */}
                {tip.lootDrop && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-amber-800">
                    <div className="flex items-center gap-1.5">
                      <Crown className="w-3.5 h-3.5 text-amber-600" />
                      <span className="font-black">Loot Terbuka:</span>
                      <span>{tip.lootDrop.name}</span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full">
                      {tip.lootDrop.rarity}
                    </span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer info note */}
      <div className="mt-4 pt-3 border-t border-sky-100/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500 font-mono">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0052FF]" />
          <span>Semua tip diproses secara non-kustodial oleh Smart Contract B20Royal V2</span>
        </div>
        <div className="text-slate-400">
          Scroll untuk melihat lebih banyak riwayat
        </div>
      </div>
    </section>
  );
}

export default TipHistory;
