import React, { useState } from 'react';
import { Wallet, ExternalLink, Copy, Check, ShieldCheck, Layers, ArrowUpRight, Sparkles, Lock, Coins } from 'lucide-react';
import { CONTRACT_ADDRESSES, getBaseScanAddressUrl } from '../../config/contracts';

interface WalletTabProps {
  userExp: number;
}

export function WalletTab({ userExp }: WalletTabProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const userAddress = '0x71C2d8f615f269a891000B268153A0483981881B';

  const handleCopy = () => {
    navigator.clipboard.writeText(userAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 space-y-6 text-left">
      {/* Wallet Header & V2 Badge */}
      <div className="sky-card rounded-3xl p-6 sm:p-7 border border-white/80 shadow-[0_8px_30px_rgba(12,74,110,0.06)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-100/70 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-[10px] font-mono font-black text-sky-900 border border-white/80 mb-2">
              <Layers className="w-3 h-3 text-sky-700" />
              <span>WALLET PROTOCOL V2 · ROADMAP</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Manajemen Wallet <span className="font-serif italic font-normal text-sky-950">&amp; Saldo Onchain</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-800 font-medium mt-1">
              Pantau aset native Base Anda, poin royalti loyalitas, dan status jaringan secara real-time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black text-emerald-900 bg-emerald-100/90 px-3 py-1.5 rounded-full border border-emerald-300 flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              <span>Base Mainnet Terhubung</span>
            </span>
          </div>
        </div>

        {/* Balances Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="sky-card-solid rounded-2xl p-4 sm:p-5 font-mono border border-white/90 shadow-xs">
            <span className="text-[11px] text-slate-600 font-bold uppercase tracking-wider">Alamat Terhubung</span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs font-black text-slate-950">{userAddress.slice(0, 8)}...{userAddress.slice(-6)}</span>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-xl bg-white/80 hover:bg-white text-slate-700 hover:text-slate-950 border border-white shadow-xs transition-colors cursor-pointer"
                title="Salin Alamat"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <a
              href={getBaseScanAddressUrl(userAddress)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold text-sky-800 hover:text-sky-950 flex items-center gap-1 mt-3 font-sans"
            >
              <span>Lihat di BaseScan</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="sky-card-solid rounded-2xl p-4 sm:p-5 font-mono border border-white/90 shadow-xs">
            <span className="text-[11px] text-slate-600 font-bold uppercase tracking-wider">Saldo Base Native ETH</span>
            <div className="text-2xl font-black text-slate-950 mt-2">0.245 ETH</div>
            <div className="text-[11px] text-emerald-700 font-bold mt-1">≈ $833.00 USD</div>
          </div>

          <div className="sky-card-solid rounded-2xl p-4 sm:p-5 font-mono border border-white/90 shadow-xs">
            <span className="text-[11px] text-slate-600 font-bold uppercase tracking-wider">Royal Points (RP)</span>
            <div className="text-2xl font-black text-sky-900 mt-2">{userExp.toLocaleString()} RP</div>
            <div className="text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full inline-block mt-1">
              Gold Tier (Multiplier 1.5x)
            </div>
          </div>
        </div>
      </div>

      {/* V2 Protocol Architecture Placeholder Features */}
      <div className="sky-card rounded-3xl p-6 sm:p-7 border border-white/80 shadow-[0_8px_30px_rgba(12,74,110,0.06)]">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-sky-100/70">
          <div>
            <span className="text-[11px] font-mono font-black text-sky-900 uppercase tracking-wider bg-white/70 px-2.5 py-0.5 rounded-full">
              Under Active Development
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight mt-1.5">
              Fitur Smart Wallet V2 yang Akan Datang
            </h3>
          </div>
          <span className="text-xs font-mono font-black text-white bg-[#0052FF] px-3 py-1 rounded-full border border-blue-400/30 shadow-xs">
            Target: Q2 2026
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="sky-card-solid rounded-2xl p-5 text-xs border border-white/90 shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-2xl bg-white text-slate-950 border border-white flex items-center justify-center font-black text-sm shadow-xs">
              01
            </div>
            <h4 className="font-black text-slate-950 text-sm tracking-tight">Automated Cashback Escrow</h4>
            <p className="text-slate-600 leading-relaxed font-medium">
              Smart contract escrow otomatis yang mengembalikan 0.5% - 2.5% volume tipping mingguan langsung ke wallet Anda sebagai potongan gas &amp; cashback.
            </p>
            <div className="pt-2.5 border-t border-slate-100 font-mono text-[11px] text-slate-600">
              Status: <span className="text-amber-700 font-bold bg-amber-100/80 px-2 py-0.5 rounded-full">Audit Smart Contract</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="sky-card-solid rounded-2xl p-5 text-xs border border-white/90 shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-2xl bg-white text-slate-950 border border-white flex items-center justify-center font-black text-sm shadow-xs">
              02
            </div>
            <h4 className="font-black text-slate-950 text-sm tracking-tight">Royal Points Yield Staking</h4>
            <p className="text-slate-600 leading-relaxed font-medium">
              Kunci Royal Points (RP) Anda di protokol staking untuk mendapatkan porsi dari 2% Prize Pool dan pembagian revenue fee platform.
            </p>
            <div className="pt-2.5 border-t border-slate-100 font-mono text-[11px] text-slate-600">
              Status: <span className="text-sky-800 font-bold bg-sky-100/80 px-2 py-0.5 rounded-full">Spesifikasi Arsitektur</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="sky-card-solid rounded-2xl p-5 text-xs border border-white/90 shadow-xs space-y-3">
            <div className="w-9 h-9 rounded-2xl bg-white text-slate-950 border border-white flex items-center justify-center font-black text-sm shadow-xs">
              03
            </div>
            <h4 className="font-black text-slate-950 text-sm tracking-tight">Multi-Sig Guild Vault V2</h4>
            <p className="text-slate-600 leading-relaxed font-medium">
              Wallet bersama untuk tim esports dan guild Base untuk mengumpulkan tip donasi turnamen secara terdesentralisasi tanpa admin pusat.
            </p>
            <div className="pt-2.5 border-t border-slate-100 font-mono text-[11px] text-slate-600">
              Status: <span className="text-slate-700 font-bold bg-slate-100 px-2 py-0.5 rounded-full">Perencanaan Teknis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
