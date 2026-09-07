import React, { useState } from 'react';
import { GamerProfile, TipTransaction } from '../../types';
import { INITIAL_PRIZE_POOL } from '../../data/protocolData';
import { 
  Coins, 
  Trophy, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  UserCheck, 
  Play, 
  Bell, 
  Info, 
  RefreshCw,
  Clock,
  Flame
} from 'lucide-react';
import { CONTRACT_ADDRESSES, getBaseScanAddressUrl } from '../../config/contracts';

interface GameTabProps {
  creators: GamerProfile[];
  onTipSuccess: (tx: TipTransaction) => void;
  recentTips: TipTransaction[];
  userExp: number;
}

export function GameTab({ creators, onTipSuccess, recentTips, userExp }: GameTabProps) {
  // TipGame States
  const [selectedCreatorId, setSelectedCreatorId] = useState<string>(creators[0]?.id || 'creator-1');
  const [tipAmount, setTipAmount] = useState<number>(0.01);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [tipMessage, setTipMessage] = useState<string>('GG on the raid! Keep crushing on Base 👑');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Slot Machine Demo & Teaser States
  const slotSymbols = ['👑', '💎', '7', '⚡', '🔷', '⭐'];
  const [reels, setReels] = useState<[string, string, string]>(['👑', '💎', '7']);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [spinFeedback, setSpinFeedback] = useState<string | null>(null);
  const [isNotified, setIsNotified] = useState<boolean>(false);

  const selectedCreator = creators.find((c) => c.id === selectedCreatorId) || creators[0];
  const activeAmount = customAmount ? parseFloat(customAmount) || 0 : tipAmount;

  const recipientEth = (activeAmount * 0.98).toFixed(4);
  const prizePoolEth = (activeAmount * 0.02).toFixed(5);
  const rpEarned = Math.round(activeAmount * 10000 * 1.25);

  const handleSendTip = () => {
    if (activeAmount <= 0) return;
    setIsSending(true);

    setTimeout(() => {
      const newTx: TipTransaction = {
        id: `tip-${Date.now()}`,
        senderAddress: '0x71C...a891',
        senderName: 'You (Sovereign Tipper)',
        recipientId: selectedCreator.id,
        recipientName: selectedCreator.name,
        recipientAddress: selectedCreator.address,
        amount: activeAmount,
        token: 'ETH',
        message: tipMessage || 'Tip dari RoyalBase TipGame!',
        timestamp: Date.now(),
        txHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        expEarned: rpEarned,
        comboMultiplier: 1.25,
      };

      onTipSuccess(newTx);
      setIsSending(false);
      setSuccessToast(`Berhasil mengirim ${activeAmount} ETH ke ${selectedCreator.name}! +${rpEarned} RP ditambahkan.`);
      setTimeout(() => setSuccessToast(null), 4000);
    }, 850);
  };

  const handleDemoSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSpinFeedback(null);

    let counter = 0;
    const interval = setInterval(() => {
      setReels([
        slotSymbols[Math.floor(Math.random() * slotSymbols.length)],
        slotSymbols[Math.floor(Math.random() * slotSymbols.length)],
        slotSymbols[Math.floor(Math.random() * slotSymbols.length)],
      ]);
      counter++;
      if (counter > 12) {
        clearInterval(interval);
        const winCombo: boolean = Math.random() > 0.45;
        let finalReels: [string, string, string];
        if (winCombo) {
          const sym = Math.random() > 0.5 ? '👑' : '💎';
          finalReels = [sym, sym, sym];
          setSpinFeedback(`JACKPOT SIMULASI! 3x ${sym} Match (Payout: 50x Pool + 2,500 RP)`);
        } else {
          finalReels = ['👑', '⚡', '7'];
          setSpinFeedback('Provably Fair VRF Seed terverifikasi. Coba spin lagi!');
        }
        setReels(finalReels);
        setIsSpinning(false);
      }
    }, 80);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 space-y-6 text-left">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 bg-slate-950/95 backdrop-blur-xl border border-lime-400 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-mono animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
          <span className="font-bold">{successToast}</span>
          <button 
            onClick={() => setSuccessToast(null)} 
            className="ml-2 text-slate-400 hover:text-white font-bold cursor-pointer"
            aria-label="Tutup notifikasi"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Context Strip: Sky Glass Header */}
      <div className="sky-card rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/80 shadow-[0_8px_30px_rgba(12,74,110,0.06)]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />
            <span className="text-[11px] font-mono font-bold text-sky-900 uppercase tracking-wider bg-white/70 px-2.5 py-0.5 rounded-full border border-white/80">
              RoyalBase GameFi Hub · Base Mainnet
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Game Arena <span className="font-serif italic font-normal text-sky-950">&amp; Tip Hub</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-800 font-medium mt-1">
            Protokol GameFi terdesentralisasi: kirim tip dengan reward RP instan atau uji simulasi provably fair onchain slot machine.
          </p>
        </div>

        {/* Global Prize Pool Mini Ticker */}
        <div className="flex items-center gap-3 font-mono shrink-0">
          <div className="sky-card-solid rounded-2xl p-3 sm:p-4 text-right border border-white/90 shadow-xs">
            <div className="text-[11px] text-sky-900 font-bold flex items-center justify-end gap-1.5 mb-0.5">
              <Trophy className="w-3.5 h-3.5 text-lime-600" />
              <span>Prize Pool Harian</span>
            </div>
            <div className="text-base sm:text-lg font-black text-slate-950">
              {INITIAL_PRIZE_POOL.totalEth} ETH <span className="text-xs font-bold text-emerald-600">(${INITIAL_PRIZE_POOL.usdValue.toLocaleString()})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary 2-Column Grid: TipGame Card & Slot Machine Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* ========================================================================= */}
        {/* CARD 1: TipGame (B20Royal V2) */}
        {/* ========================================================================= */}
        <div className="sky-card rounded-3xl p-5 sm:p-7 space-y-5 border border-white/80 shadow-[0_10px_32px_rgba(12,74,110,0.08)]">
          {/* Card Header */}
          <div className="flex items-start justify-between border-b border-sky-100/70 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100/90 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-black">
                  ● LIVE DI BASE
                </span>
                <span className="text-[11px] font-mono text-sky-900/70 font-bold">v2.4.1</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight flex items-center gap-2">
                <span className="font-bubble text-slate-950">TipGame Protocol</span>
                <Coins className="w-5 h-5 text-lime-600" />
              </h3>
              <p className="text-xs text-slate-700 font-medium mt-1">
                Kirim tip ETH langsung ke kreator, alokasikan 2% ke undian prize pool, dan cetak Royal Points.
              </p>
            </div>

            <a
              href={getBaseScanAddressUrl(CONTRACT_ADDRESSES.B20_ROYAL_V2)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-2xl bg-white/80 border border-white text-slate-700 hover:text-slate-950 hover:bg-white shadow-xs transition-colors shrink-0"
              title="Lihat Smart Contract B20Royal V2 di BaseScan"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Recipient / Creator Picker */}
          <div>
            <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-2">
              Pilih Kreator Penerima
            </label>
            <div className="space-y-2">
              {creators.slice(0, 3).map((c) => {
                const isSelected = c.id === selectedCreatorId;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCreatorId(c.id)}
                    className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-white/95 border-lime-400 ring-2 ring-lime-400/40 shadow-sm'
                        : 'bg-white/60 border-white/70 hover:bg-white/85 hover:border-sky-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={c.avatarUrl}
                        alt={c.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="truncate">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-slate-950 truncate">{c.name}</span>
                          {c.verified && <UserCheck className="w-3.5 h-3.5 text-sky-600 shrink-0" />}
                        </div>
                        <div className="text-[11px] text-slate-600 font-mono truncate">{c.gameTitle}</div>
                      </div>
                    </div>

                    <div className="text-right shrink-0 font-mono">
                      <div className="text-xs font-black text-slate-950">{c.totalTipsReceivedEth.toFixed(2)} ETH</div>
                      <div className="text-[10px] text-emerald-700 font-bold">{c.crownRank}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Amount Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Nominal Tip (ETH)
              </label>
              <span className="text-[11px] font-mono text-sky-900 font-bold bg-white/60 px-2 py-0.5 rounded-full">Saldo Demo: 1.45 ETH</span>
            </div>
            
            <div className="grid grid-cols-4 gap-2 mb-2.5">
              {[0.005, 0.01, 0.05, 0.1].map((amt) => (
                <button
                  key={amt}
                  onClick={() => {
                    setTipAmount(amt);
                    setCustomAmount('');
                  }}
                  className={`py-2 px-1 rounded-xl text-xs font-mono font-black border transition-all cursor-pointer ${
                    !customAmount && tipAmount === amt
                      ? 'bg-lime-400 text-slate-950 border-lime-300 shadow-[0_2px_8px_rgba(163,230,53,0.4)]'
                      : 'bg-white/70 text-slate-800 border-white/80 hover:bg-white'
                  }`}
                >
                  {amt} ETH
                </button>
              ))}
            </div>

            <div className="relative">
              <input
                type="number"
                step="0.001"
                min="0.0001"
                placeholder="Jumlah ETH kustom..."
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-mono bg-white/75 border border-white/80 rounded-xl focus:outline-none focus:bg-white focus:border-lime-400 text-slate-950 shadow-xs font-bold"
              />
              <span className="absolute right-3.5 top-2.5 text-xs font-mono font-bold text-sky-900">ETH</span>
            </div>
          </div>

          {/* Cheer Message */}
          <div>
            <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5">
              Pesan Apresiasi
            </label>
            <input
              type="text"
              value={tipMessage}
              onChange={(e) => setTipMessage(e.target.value)}
              placeholder="Tulis pesan penyemangat onchain..."
              className="w-full px-3.5 py-2.5 text-xs bg-white/75 border border-white/80 rounded-xl focus:outline-none focus:bg-white focus:border-lime-400 text-slate-950 shadow-xs font-medium"
            />
          </div>

          {/* Smart Onchain Breakdown */}
          <div className="sky-card-solid rounded-2xl p-4 space-y-2 text-xs font-mono border border-white/90 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Penerima ({selectedCreator.name}):</span>
              <span className="font-bold text-slate-950">{recipientEth} ETH (98%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Alokasi Prize Pool:</span>
              <span className="font-bold text-sky-700">+{prizePoolEth} ETH (2%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Perkiraan Gas Fee Base:</span>
              <span className="font-bold text-emerald-600">&lt; $0.001 USD</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="font-black text-slate-950">Royal Points (RP):</span>
              <span className="font-black text-emerald-700">+{rpEarned} RP</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSendTip}
            disabled={isSending || activeAmount <= 0}
            className="w-full py-3.5 px-5 rounded-full bg-lime-400 hover:bg-lime-300 active:bg-lime-500 text-slate-950 text-sm font-black tracking-tight flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(163,230,53,0.4)] border border-lime-300 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSending ? (
              <span className="flex items-center gap-2 font-mono text-xs">
                <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Memproses Transaksi di Base...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Coins className="w-4 h-4" />
                <span>Kirim {activeAmount} ETH ke {selectedCreator.name}</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </div>

        {/* ========================================================================= */}
        {/* CARD 2: Placeholder Slot Machine Game (Royal Slots 777) */}
        {/* ========================================================================= */}
        <div className="sky-card rounded-3xl p-5 sm:p-7 space-y-5 border border-white/80 shadow-[0_10px_32px_rgba(12,74,110,0.08)]">
          {/* Card Header */}
          <div className="flex items-start justify-between border-b border-sky-100/70 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100/90 text-amber-900 border border-amber-200 text-[10px] font-mono font-black">
                  ● COMING SOON · TESTNET V2
                </span>
                <span className="text-[11px] font-mono text-sky-900/70 font-bold">Provably Fair</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight flex items-center gap-2">
                <span className="font-bubble text-slate-950">Royal Slots 777</span>
                <Sparkles className="w-5 h-5 text-amber-500" />
              </h3>
              <p className="text-xs text-slate-700 font-medium mt-1">
                Onchain 3-reel slot machine game ditenagai Chainlink VRF on Base. Gunakan ETH atau Royal Points untuk spin jackpot.
              </p>
            </div>

            <div className="p-2.5 rounded-2xl bg-white/80 border border-white text-slate-700 shadow-xs shrink-0" title="Smart Contract Onchain Slot">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
          </div>

          {/* 3-Reel Slot Machine Frame */}
          <div className="sky-card-solid rounded-2xl p-5 text-center space-y-4 border border-white/90 shadow-xs">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-600 font-bold">
              <span>VRF Seed: 0x8f...4e19</span>
              <span className="text-sky-800 bg-sky-100/80 px-2 py-0.5 rounded-full font-black">Jackpot: 10.50 ETH</span>
            </div>

            {/* 3 Reels Display */}
            <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
              {reels.map((symbol, idx) => (
                <div
                  key={idx}
                  className={`h-20 sm:h-24 rounded-2xl bg-white/90 border flex items-center justify-center text-3xl sm:text-4xl shadow-sm select-none transition-transform ${
                    isSpinning 
                      ? 'animate-bounce border-lime-400 text-lime-600' 
                      : 'border-sky-100 text-slate-950'
                  }`}
                >
                  <span className={isSpinning ? 'blur-[1px]' : ''}>{symbol}</span>
                </div>
              ))}
            </div>

            {/* Spin Feedback / Message */}
            {spinFeedback ? (
              <div className="text-xs font-mono font-black text-emerald-900 bg-emerald-100/80 border border-emerald-200 py-2 px-3 rounded-xl animate-in fade-in">
                {spinFeedback}
              </div>
            ) : (
              <div className="text-xs text-slate-600 font-mono font-medium">
                Model simulasi reel preview — Chainlink VRF v2.5
              </div>
            )}

            {/* Interactive Demo Spin Button */}
            <button
              onClick={handleDemoSpin}
              disabled={isSpinning}
              className="w-full py-2.5 px-4 rounded-full bg-white/80 hover:bg-white border border-white text-xs font-mono font-black text-slate-950 flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-sky-700 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'Mengacak Onchain Seed...' : 'Uji Spin Demo (Preview Mode)'}</span>
            </button>
          </div>

          {/* Specifications Data Table */}
          <div className="sky-card-solid rounded-2xl p-4 space-y-2 text-xs font-mono border border-white/90 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">RNG Protocol:</span>
              <span className="font-bold text-slate-950">Chainlink VRF v2.5 (Base)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Provably Fair RTP:</span>
              <span className="font-bold text-emerald-700">97.5% (2.5% Protocol Fee)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Biaya Taruhan:</span>
              <span className="font-bold text-slate-950">0.002 ETH atau 250 RP</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-slate-600">Maksimal Multiplier:</span>
              <span className="font-black text-sky-700">50x Progressive Pool</span>
            </div>
          </div>

          {/* Paytable Mini Grid */}
          <div>
            <div className="text-[11px] font-mono font-black text-slate-700 uppercase tracking-wider mb-2">
              Kombinasi Hadiah (Paytable)
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono font-bold">
              <div className="bg-white/60 border border-white/80 p-2.5 rounded-xl flex items-center justify-between">
                <span>👑 👑 👑</span>
                <span className="font-black text-sky-800">50x Jackpot</span>
              </div>
              <div className="bg-white/60 border border-white/80 p-2.5 rounded-xl flex items-center justify-between">
                <span>💎 💎 💎</span>
                <span className="font-black text-emerald-700">20x + 5k RP</span>
              </div>
              <div className="bg-white/60 border border-white/80 p-2.5 rounded-xl flex items-center justify-between">
                <span>7  7  7</span>
                <span className="font-black text-slate-900">15x Win</span>
              </div>
              <div className="bg-white/60 border border-white/80 p-2.5 rounded-xl flex items-center justify-between">
                <span>⚡ ⚡ ⚡</span>
                <span className="font-black text-amber-700">5x + Free Spin</span>
              </div>
            </div>
          </div>

          {/* Notification / Waitlist Action */}
          <button
            onClick={() => setIsNotified(!isNotified)}
            className={`w-full py-3 px-4 rounded-full text-xs font-black transition-all flex items-center justify-center gap-2 border cursor-pointer ${
              isNotified
                ? 'bg-emerald-100/90 text-emerald-800 border-emerald-300'
                : 'bg-white/70 text-slate-800 border-white/80 hover:bg-white'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>
              {isNotified
                ? '✓ Notifikasi Aktif — Address Anda Terdaftar'
                : 'Ingatkan Saya Saat Mainnet Rilis'}
            </span>
          </button>
        </div>

      </div>

      {/* Recent Tips Minimalist Activity Feed */}
      <div className="sky-card rounded-3xl p-5 sm:p-6 border border-white/80 shadow-[0_8px_30px_rgba(12,74,110,0.06)]">
        <div className="flex items-center justify-between mb-4 border-b border-sky-100/70 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-800" />
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Aktivitas TipGame Terkini di Base
            </h4>
          </div>
          <span className="text-[11px] font-mono text-sky-900/80 font-bold bg-white/60 px-2.5 py-0.5 rounded-full">Onchain Feed</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {recentTips.slice(0, 3).map((tip) => (
            <div
              key={tip.id}
              className="bg-white/70 border border-white/80 rounded-2xl p-3.5 text-xs font-mono space-y-1.5 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-black text-slate-950 truncate">{tip.recipientName}</span>
                <span className="text-sky-700 font-black">+{tip.amount} ETH</span>
              </div>
              <p className="text-[11px] text-slate-600 truncate italic font-sans">"{tip.message}"</p>
              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1.5 border-t border-slate-100 font-bold">
                <span>{tip.senderAddress}</span>
                <span className="text-emerald-700">+{tip.expEarned} RP</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

