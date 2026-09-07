import React, { useState, useEffect } from 'react';
import { LootItem } from '../types';
import { LOOT_POOL } from '../data/initialData';
import { Crown, Sparkles, X, Gift, Shield, Zap, Flame, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

interface LootBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onItemClaimed: (item: LootItem) => void;
}

export const LootBoxModal: React.FC<LootBoxModalProps> = ({
  isOpen,
  onClose,
  onItemClaimed,
}) => {
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const [revealedItem, setRevealedItem] = useState<LootItem | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsOpening(true);
      setRevealedItem(null);

      // Simulate suspense rolling
      const timer = setTimeout(() => {
        const randItem = LOOT_POOL[Math.floor(Math.random() * LOOT_POOL.length)];
        const newItem: LootItem = {
          ...randItem,
          id: `loot-${Date.now()}`,
          obtainedAt: Date.now(),
        };
        setRevealedItem(newItem);
        setIsOpening(false);

        sounds.playFanfare();
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#0052FF', '#d99b26', '#fcd34d', '#a855f7'],
        });
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getRarityColor = (rarity?: LootItem['rarity']) => {
    switch (rarity) {
      case 'Legendary':
        return 'text-[#fcd34d] border-[#d99b26] bg-[#d99b26]/20';
      case 'Epic':
        return 'text-[#c084fc] border-[#8b5cf6] bg-[#8b5cf6]/20';
      case 'Rare':
        return 'text-[#93c5fd] border-[#0052FF] bg-[#0052FF]/20';
      default:
        return 'text-[#6ee7b7] border-[#10b981] bg-[#10b981]/20';
    }
  };

  const getIcon = (name?: string) => {
    switch (name) {
      case 'Crown':
        return <Crown className="w-12 h-12 text-[#fcd34d]" />;
      case 'Sparkles':
        return <Sparkles className="w-12 h-12 text-[#a855f7]" />;
      case 'Shield':
        return <Shield className="w-12 h-12 text-[#0052FF]" />;
      case 'Flame':
        return <Flame className="w-12 h-12 text-[#ef4444]" />;
      default:
        return <Zap className="w-12 h-12 text-[#10b981]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div
        id="loot-box-modal"
        className="w-full max-w-md bg-[#0e121a] border border-[#212c40] rounded-2xl p-6 shadow-2xl text-center space-y-6 relative"
      >
        <button
          id="close-lootbox-btn"
          onClick={onClose}
          className="absolute right-4 top-4 text-[#8e9bb5] hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#d99b26]">
            Base Onchain Mystery Chest
          </span>
          <h3 className="text-xl font-extrabold text-white font-cinzel mt-1">
            Royal Relic Unlocked!
          </h3>
        </div>

        {isOpening ? (
          <div className="py-12 space-y-4">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-[#0052FF]/20 border-2 border-[#0052FF] flex items-center justify-center animate-bounce">
              <Gift className="w-10 h-10 text-[#60a5fa]" />
            </div>
            <p className="text-xs font-mono font-semibold text-[#8e9bb5] animate-pulse">
              Memverifikasi smart contract & rolling rarity RNG...
            </p>
          </div>
        ) : revealedItem ? (
          <div className="space-y-4 py-2">
            <div className="w-24 h-24 mx-auto rounded-2xl bg-[#141b28] border-2 border-[#2b3852] flex items-center justify-center shadow-xl">
              {getIcon(revealedItem.icon)}
            </div>

            <div>
              <span className={`text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded border ${getRarityColor(revealedItem.rarity)}`}>
                {revealedItem.rarity}
              </span>
              <h4 className="text-lg font-bold text-white mt-2 font-cinzel">
                {revealedItem.name}
              </h4>
              <p className="text-xs text-[#cbd2e0] mt-1 max-w-xs mx-auto">
                {revealedItem.perkDescription}
              </p>
            </div>

            <div className="bg-[#121622] border border-[#1b2333] rounded-xl p-3 text-xs flex items-center justify-between">
              <span className="text-[#8e9bb5]">Buff Multiplier:</span>
              <span className="font-mono font-bold text-[#f6c358]">
                +{Math.round((revealedItem.buffMultiplier - 1) * 100)}% Bonus
              </span>
            </div>

            <button
              id="claim-loot-btn"
              onClick={() => {
                sounds.playCoin();
                onItemClaimed(revealedItem);
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-[#0052FF] hover:bg-[#0047e0] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#0052FF]/25 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Klaim ke Loot Vault Saya</span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
