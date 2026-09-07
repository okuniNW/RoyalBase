import React from 'react';
import { LootItem } from '../types';
import { LOOT_POOL } from '../data/initialData';
import { Crown, Sparkles, Shield, Zap, Flame, Gift, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/audio';

interface LootVaultViewProps {
  userLoot: LootItem[];
  userExp: number;
  comboStreak: number;
  onOpenMysteryRoll: () => void;
}

export const LootVaultView: React.FC<LootVaultViewProps> = ({
  userLoot,
  userExp,
  comboStreak,
  onOpenMysteryRoll,
}) => {
  const getRarityBadge = (rarity: LootItem['rarity']) => {
    switch (rarity) {
      case 'Legendary':
        return 'bg-[#d99b26]/20 border-[#d99b26]/50 text-[#fcd34d]';
      case 'Epic':
        return 'bg-[#8b5cf6]/20 border-[#8b5cf6]/50 text-[#c084fc]';
      case 'Rare':
        return 'bg-[#0052FF]/20 border-[#0052FF]/50 text-[#93c5fd]';
      default:
        return 'bg-[#10b981]/20 border-[#10b981]/50 text-[#6ee7b7]';
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Crown':
        return <Crown className="w-6 h-6 text-[#fcd34d]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#a855f7]" />;
      case 'Shield':
        return <Shield className="w-6 h-6 text-[#0052FF]" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-[#ef4444]" />;
      default:
        return <Zap className="w-6 h-6 text-[#10b981]" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Player Inventory Overview */}
      <div className="bg-[#10141d] border border-[#1b2333] rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#1a2232]">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#d99b26] flex items-center gap-1.5 mb-1">
              <Crown className="w-4 h-4" />
              Sovereign Patron Inventory
            </div>
            <h2 className="text-2xl font-extrabold text-white font-cinzel">Royal Loot Vault</h2>
            <p className="text-xs text-[#8e9bb5] mt-1">
              Setiap kali Anda memberikan tip minimal 0.002 ETH di Base chain, Anda berkesempatan membuka peti pusaka berhadiah item langka dengan buff pasif.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="test-open-chest-btn"
              onClick={() => {
                sounds.playFanfare();
                onOpenMysteryRoll();
              }}
              className="px-5 py-2.5 rounded-xl bg-[#d99b26] hover:bg-[#c2881b] text-[#090b10] font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-[#d99b26]/20 transition-all active:scale-95"
            >
              <Gift className="w-4 h-4" />
              <span>Roll Mystery Chest</span>
            </button>
          </div>
        </div>

        {/* Current Active Buffs Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div className="bg-[#131924] border border-[#1e273a] rounded-xl p-4">
            <div className="text-xs text-[#8e9bb5] uppercase font-semibold">Total EXP Terkumpul</div>
            <div className="text-2xl font-bold font-mono text-white mt-1 flex items-baseline gap-1">
              <span>{userExp.toLocaleString()}</span>
              <span className="text-xs text-[#fcd34d]">EXP</span>
            </div>
            <div className="text-[11px] text-[#60a5fa] mt-1">Rank: Sovereign Baron</div>
          </div>

          <div className="bg-[#131924] border border-[#1e273a] rounded-xl p-4">
            <div className="text-xs text-[#8e9bb5] uppercase font-semibold">Streak Tipping Kombo</div>
            <div className="text-2xl font-bold font-mono text-[#f6c358] mt-1">
              {comboStreak}x <span className="text-xs text-[#8e9bb5] font-normal">Active</span>
            </div>
            <div className="text-[11px] text-[#34d399] mt-1">+{comboStreak * 10}% EXP Multiplier Bonus</div>
          </div>

          <div className="bg-[#131924] border border-[#1e273a] rounded-xl p-4">
            <div className="text-xs text-[#8e9bb5] uppercase font-semibold">Relik Koleksi</div>
            <div className="text-2xl font-bold font-mono text-white mt-1">
              {userLoot.length} <span className="text-xs text-[#8e9bb5] font-normal">Item</span>
            </div>
            <div className="text-[11px] text-[#8e9bb5] mt-1">Buff Aktif Tersimpan di Akun Anda</div>
          </div>
        </div>
      </div>

      {/* Vault Items Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span>Koleksi Relik & Loot Drop Milik Anda</span>
          <span className="text-xs px-2 py-0.5 rounded bg-[#182030] text-[#93c5fd] font-mono">
            {userLoot.length}
          </span>
        </h3>

        {userLoot.length === 0 ? (
          <div className="bg-[#10141d] border border-dashed border-[#243046] rounded-2xl p-12 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#182030] flex items-center justify-center text-[#8e9bb5]">
              <Gift className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Belum Ada Loot yang Dibuka</h4>
            <p className="text-xs text-[#8e9bb5] max-w-sm mx-auto">
              Berikan tip kepada streamer favorit di Arena (minimal 0.002 ETH) untuk otomatis mendapatkan kesempatan roll peti misterius!
            </p>
            <button
              onClick={onOpenMysteryRoll}
              className="mt-2 px-4 py-2 rounded-lg bg-[#0052FF] hover:bg-[#0047e0] text-white text-xs font-bold transition-colors"
            >
              Uji Coba Buka Peti Pertama Sekarang
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {userLoot.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="bg-[#10141d] border border-[#1e273a] hover:border-[#2f3d59] rounded-xl p-5 space-y-4 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#141b28] border border-[#243149] flex items-center justify-center shrink-0">
                    {getIcon(item.icon)}
                  </div>
                  <span className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded border ${getRarityBadge(item.rarity)}`}>
                    {item.rarity}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <p className="text-xs text-[#8e9bb5] mt-1 leading-relaxed">
                    {item.perkDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#182030] flex items-center justify-between text-xs">
                  <span className="text-[#8e9bb5]">Buff Multiplier:</span>
                  <span className="font-mono font-bold text-[#f6c358]">
                    x{item.buffMultiplier.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Loot Pool Catalog */}
      <div className="bg-[#0e1219] border border-[#182030] rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#fcd34d]" />
          <span>Katalog Seluruh Drop Misteri (Loot Drop Table on Base)</span>
        </h3>
        <p className="text-xs text-[#8e9bb5]">
          Berikut adalah daftar item pusaka yang dapat didapatkan secara acak melalui smart contract RoyalBase saat memberi tip.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {LOOT_POOL.map((item) => (
            <div key={item.id} className="bg-[#121622] border border-[#1b2333] rounded-lg p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white">{item.name}</span>
                <span className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded border ${getRarityBadge(item.rarity)}`}>
                  {item.rarity}
                </span>
              </div>
              <p className="text-[11px] text-[#8e9bb5]">{item.perkDescription}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
