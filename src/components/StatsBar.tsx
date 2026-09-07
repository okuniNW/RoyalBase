import React from 'react';
import { Crown, Flame, Shield, Coins, Sparkles } from 'lucide-react';

interface StatsBarProps {
  totalTippedEth: number;
  totalTipsCount: number;
  totalLootUnlocked: number;
  activeKingsCount: number;
}

export const StatsBar: React.FC<StatsBarProps> = ({
  totalTippedEth,
  totalTipsCount,
  totalLootUnlocked,
  activeKingsCount,
}) => {
  return (
    <div className="w-full bg-[#0c0f16] border-b border-[#182030] py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1 */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#0052FF]/10 border border-[#0052FF]/20 flex items-center justify-center shrink-0">
            <Coins className="w-5 h-5 text-[#0052FF]" />
          </div>
          <div>
            <div className="text-xs text-[#8e9bb5] uppercase tracking-wider font-semibold">Total Onchain Volume</div>
            <div className="text-lg sm:text-xl font-extrabold font-mono text-white flex items-baseline gap-1">
              <span>{totalTippedEth.toFixed(2)}</span>
              <span className="text-xs font-bold text-[#0052FF]">ETH</span>
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#d99b26]/10 border border-[#d99b26]/20 flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5 text-[#d99b26]" />
          </div>
          <div>
            <div className="text-xs text-[#8e9bb5] uppercase tracking-wider font-semibold">Royal Tips Processed</div>
            <div className="text-lg sm:text-xl font-extrabold font-mono text-white">
              {totalTipsCount.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-[#10b981]" />
          </div>
          <div>
            <div className="text-xs text-[#8e9bb5] uppercase tracking-wider font-semibold">Loot Chests Rolled</div>
            <div className="text-lg sm:text-xl font-extrabold font-mono text-white">
              {totalLootUnlocked.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center shrink-0">
            <Crown className="w-5 h-5 text-[#f59e0b]" />
          </div>
          <div>
            <div className="text-xs text-[#8e9bb5] uppercase tracking-wider font-semibold">Active Sovereign Kings</div>
            <div className="text-lg sm:text-xl font-extrabold font-mono text-white">
              {activeKingsCount} <span className="text-xs text-[#8e9bb5] font-normal">Ranked</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
