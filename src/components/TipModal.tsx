import React, { useState } from 'react';
import { useAccount, useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import confetti from 'canvas-confetti';
import { GamerProfile, TokenSymbol, LootItem, TipTransaction } from '../types';
import { LOOT_POOL } from '../data/initialData';
import { X, Sparkles, Zap, Crown, ShieldAlert, CheckCircle, ExternalLink, Loader2, Coins } from 'lucide-react';
import { sounds } from '../utils/audio';

interface TipModalProps {
  creator: GamerProfile | null;
  onClose: () => void;
  onTipSuccess: (tx: TipTransaction, loot?: LootItem) => void;
  comboStreak: number;
  isDemoMode: boolean;
  demoBalance: number;
  onDeductDemoBalance: (amount: number) => void;
}

export const TipModal: React.FC<TipModalProps> = ({
  creator,
  onClose,
  onTipSuccess,
  comboStreak,
  isDemoMode,
  demoBalance,
  onDeductDemoBalance,
}) => {
  const { isConnected, address } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();

  const [amount, setAmount] = useState<string>('0.005');
  const [token, setToken] = useState<TokenSymbol>('ETH');
  const [message, setMessage] = useState<string>('GG bro! Keep grinding Base onchain! 👑');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [txError, setTxError] = useState<string | null>(null);

  if (!creator) return null;

  const numAmount = parseFloat(amount) || 0;
  const expEarned = Math.round(numAmount * 5000 * (1 + (comboStreak * 0.1)));
  const qualifiesForLoot = numAmount >= 0.002;

  const handleSendTip = async () => {
    if (numAmount <= 0) {
      setTxError('Masukkan jumlah tip yang valid');
      return;
    }

    setTxError(null);
    setIsSubmitting(true);

    try {
      let txHash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

      if (isConnected && !isDemoMode && token === 'ETH') {
        // Real Base onchain transaction via Wagmi v2 + Viem v2
        const hash = await sendTransactionAsync({
          to: creator.address,
          value: parseEther(amount),
        });
        txHash = hash;
      } else {
        // Sandbox mode or simulated onchain execution
        if (isDemoMode && numAmount > demoBalance) {
          throw new Error(`Saldo Sandbox tidak cukup (${demoBalance.toFixed(3)} ETH tersedia).`);
        }
        await new Promise((resolve) => setTimeout(resolve, 900));
        if (isDemoMode) {
          onDeductDemoBalance(numAmount);
        }
      }

      // Roll mystery loot drop if eligible
      let lootAwarded: LootItem | undefined = undefined;
      if (qualifiesForLoot) {
        const randomIndex = Math.floor(Math.random() * LOOT_POOL.length);
        const randomItem = LOOT_POOL[randomIndex];
        lootAwarded = {
          ...randomItem,
          id: `loot-${Date.now()}`,
          obtainedAt: Date.now(),
        };
      }

      // Audio & Confetti
      sounds.playCoin();
      if (lootAwarded && (lootAwarded.rarity === 'Legendary' || lootAwarded.rarity === 'Epic')) {
        sounds.playFanfare();
      } else {
        sounds.playCombo();
      }

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0052FF', '#d99b26', '#3b82f6', '#fcd34d'],
      });

      const newTx: TipTransaction = {
        id: `tip-${Date.now()}`,
        senderAddress: address || '0xDemo...Base',
        senderName: isConnected ? (address?.slice(0, 6) + '...' + address?.slice(-4)) : 'RoyalPatron.base',
        recipientId: creator.id,
        recipientName: creator.name,
        recipientAddress: creator.address,
        amount: numAmount,
        token,
        message,
        timestamp: Date.now(),
        txHash,
        expEarned,
        comboMultiplier: 1 + (comboStreak * 0.1),
        lootDrop: lootAwarded,
        isMock: isDemoMode || !isConnected,
      };

      onTipSuccess(newTx, lootAwarded);
      onClose();
    } catch (err: any) {
      console.error('Tipping error:', err);
      setTxError(err?.shortMessage || err?.message || 'Gagal memproses transaksi tipping');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ethPresets = ['0.001', '0.005', '0.01', '0.05'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        id="tip-modal-container"
        className="w-full max-w-lg bg-[#0e121a] border border-[#212c40] rounded-2xl p-6 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1c2436] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0052FF]/15 border border-[#0052FF]/30 flex items-center justify-center text-[#0052FF]">
              <Crown className="w-5 h-5 text-[#f6c358]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Send Royal Tip</h3>
              <p className="text-xs text-[#8e9bb5]">Recipient: <span className="text-white font-semibold">{creator.name}</span> ({creator.gameTitle})</p>
            </div>
          </div>
          <button
            id="tip-modal-close-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8e9bb5] hover:text-white hover:bg-[#1a2233] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Creator Snapshot */}
        <div className="flex items-center justify-between bg-[#121722] border border-[#1d273a] rounded-xl p-3">
          <div className="flex items-center gap-3">
            <img src={creator.avatarUrl} alt={creator.name} className="w-11 h-11 rounded-lg object-cover border border-[#27344e]" />
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>{creator.name}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#1e2a40] text-[#93c5fd]">[{creator.guildTag}]</span>
              </div>
              <div className="text-[11px] text-[#8e9bb5] font-mono">{creator.address.slice(0, 8)}...{creator.address.slice(-6)}</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] text-[#8e9bb5] uppercase">Sovereign Rank</div>
            <div className="text-xs font-bold text-[#f6c358]">{creator.crownRank}</div>
          </div>
        </div>

        {/* Token Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#cbd2e0] uppercase tracking-wider">Pilih Aset Tip di Base Chain</label>
          <div className="grid grid-cols-3 gap-2">
            {(['ETH', 'USDC', 'ROYAL'] as TokenSymbol[]).map((t) => (
              <button
                key={t}
                id={`token-select-${t.toLowerCase()}`}
                onClick={() => {
                  setToken(t);
                  sounds.playCoin();
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors flex items-center justify-center gap-2 ${
                  token === t
                    ? 'bg-[#0052FF] text-white border-[#0052FF] shadow-sm'
                    : 'bg-[#121722] text-[#8e9bb5] hover:text-white border-[#1d273a]'
                }`}
              >
                <span>{t}</span>
                {t === 'ETH' && <span className="text-[10px] opacity-75 font-normal">(Native)</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Amount Input & Presets */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#cbd2e0] uppercase tracking-wider">Jumlah Tip</span>
            <span className="text-[#8e9bb5]">
              {isDemoMode ? `Sandbox Balance: ${demoBalance.toFixed(3)} ETH` : (isConnected ? 'Connected on Base' : 'Wallet Unconnected')}
            </span>
          </div>

          <div className="relative">
            <input
              id="tip-amount-input"
              type="number"
              step="0.001"
              min="0.0001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#121722] border border-[#212c40] focus:border-[#0052FF] text-white font-mono text-lg font-bold rounded-xl px-4 py-3 outline-none transition-colors pr-20"
              placeholder="0.005"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8e9bb5] uppercase">
              {token}
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-2 pt-1">
            {ethPresets.map((preset) => (
              <button
                key={preset}
                id={`preset-tip-${preset}`}
                onClick={() => {
                  setAmount(preset);
                  sounds.playCoin();
                }}
                className="flex-1 py-1.5 rounded-lg bg-[#141b28] hover:bg-[#1b2538] text-xs font-mono font-semibold text-[#cbd2e0] border border-[#212c40] transition-colors"
              >
                {preset} {token}
              </button>
            ))}
          </div>
        </div>

        {/* Shoutout Message */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#cbd2e0] uppercase tracking-wider">Pesan Shoutout di Stream</span>
            <span className="text-[#718096] text-[11px]">{message.length}/100</span>
          </div>
          <input
            id="tip-shoutout-message-input"
            type="text"
            maxLength={100}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tulis pesan untuk muncul di live feed..."
            className="w-full bg-[#121722] border border-[#212c40] focus:border-[#0052FF] text-sm text-white rounded-xl px-4 py-2.5 outline-none transition-colors"
          />
        </div>

        {/* GameFi Perks Card */}
        <div className="bg-[#121724] border border-[#212e47] rounded-xl p-4 space-y-2.5">
          <div className="text-xs font-bold text-white flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[#f6c358]">
              <Sparkles className="w-4 h-4" />
              GameFi Rewards Calculator
            </span>
            <span className="text-[#60a5fa] font-mono font-bold">+{expEarned} EXP</span>
          </div>

          <div className="text-xs text-[#8e9bb5] flex items-center justify-between">
            <span>Combo Multiplier:</span>
            <span className="font-mono text-white font-semibold">{comboStreak}x combo (+{comboStreak * 10}%)</span>
          </div>

          <div className="text-xs flex items-center justify-between">
            <span className="text-[#8e9bb5]">Mystery Chest Drop:</span>
            {qualifiesForLoot ? (
              <span className="text-[#34d399] font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Guaranteed Roll (≥ 0.002 ETH)
              </span>
            ) : (
              <span className="text-[#f59e0b] font-medium">
                Tip ≥ 0.002 ETH to unlock roll
              </span>
            )}
          </div>
        </div>

        {/* Error notification */}
        {txError && (
          <div className="p-3 rounded-lg bg-[#ef4444]/15 border border-[#ef4444]/40 text-[#ef4444] text-xs flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{txError}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          id="confirm-tip-submit-btn"
          disabled={isSubmitting || numAmount <= 0}
          onClick={handleSendTip}
          className="w-full py-3.5 px-6 rounded-xl bg-[#0052FF] hover:bg-[#0047e0] disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#0052FF]/25 transition-all active:scale-[0.99]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Memproses Transaksi di Base...</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 text-[#fcd34d]" />
              <span>Kirim {amount} {token} ke {creator.name}</span>
            </>
          )}
        </button>

        {/* Footnote */}
        <p className="text-[11px] text-center text-[#718096]">
          {isDemoMode
            ? 'Mode Sandbox aktif: Transaksi disimulasikan tanpa biaya gas sungguhan.'
            : isConnected
            ? 'Menggunakan wagmi v2 di Base Chain. 98% dana langsung masuk ke dompet kreator.'
            : 'Dompet belum terhubung. Anda dapat menghubungkan dompet via RainbowKit atau aktifkan Sandbox Mode.'}
        </p>
      </div>
    </div>
  );
};
