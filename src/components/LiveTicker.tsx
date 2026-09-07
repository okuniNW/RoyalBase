import React from 'react';
import { TipTransaction } from '../types';
import { Sparkles, ArrowRight, ExternalLink } from 'lucide-react';

interface LiveTickerProps {
  tips: TipTransaction[];
  onSelectRecipient?: (recipientId: string) => void;
}

export const LiveTicker: React.FC<LiveTickerProps> = ({ tips, onSelectRecipient }) => {
  return (
    <div className="w-full bg-[#080a0f] border-b border-[#182030] overflow-hidden py-2.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        {/* Label */}
        <div className="flex items-center gap-1.5 shrink-0 pr-3 border-r border-[#1c2436] text-xs font-bold text-[#0052FF]">
          <span className="w-2 h-2 rounded-full bg-[#0052FF] animate-ping"></span>
          <span className="uppercase tracking-wide">Live Feed</span>
        </div>

        {/* Scrollable feed items */}
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-0.5 text-xs">
          {tips.slice(0, 6).map((tx) => (
            <div
              key={tx.id}
              onClick={() => onSelectRecipient?.(tx.recipientId)}
              className="shrink-0 flex items-center gap-2 bg-[#10141d] hover:bg-[#161c28] border border-[#1e273a] hover:border-[#2b3852] px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
            >
              <span className="font-semibold text-white">{tx.senderName || tx.senderAddress.slice(0, 6)}</span>
              <ArrowRight className="w-3 h-3 text-[#4b5563]" />
              <span className="font-semibold text-[#60a5fa]">{tx.recipientName}</span>

              <span className="px-1.5 py-0.2 rounded font-mono font-bold bg-[#0052FF]/20 text-[#93c5fd]">
                {tx.amount} {tx.token}
              </span>

              {tx.lootDrop && (
                <span className="flex items-center gap-1 px-1.5 py-0.2 rounded bg-[#d99b26]/20 text-[#fcd34d] font-semibold text-[10px]">
                  <Sparkles className="w-3 h-3" />
                  {tx.lootDrop.name.slice(0, 16)}...
                </span>
              )}

              {tx.message && (
                <span className="hidden xl:inline text-[#8e9bb5] italic max-w-xs truncate border-l border-[#212c42] pl-2">
                  "{tx.message}"
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
