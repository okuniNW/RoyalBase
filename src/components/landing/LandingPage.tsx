import React from 'react';
import { LandingHero } from './LandingHero';
import { ArrowRight, ShieldCheck, CheckCircle2, ExternalLink, Zap, Users, Gift, Lock, Crown } from 'lucide-react';
import { CONTRACT_ADDRESSES, getBaseScanAddressUrl } from '../../config/contracts';

interface LandingPageProps {
  onLaunchApp: () => void;
}

export function LandingPage({ onLaunchApp }: LandingPageProps) {
  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <LandingHero onLaunchApp={onLaunchApp} />

      {/* Section: 3-Step Protocol Mechanism */}
      <section className="w-full py-14 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/60">
          <div>
            <div className="text-[11px] font-mono font-bold text-sky-900 uppercase tracking-wider bg-white/75 backdrop-blur-md px-3 py-1 rounded-full inline-block border border-white/80">
              Mekanisme Onchain
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight mt-2">
              Cara Kerja <span className="font-serif italic font-normal text-sky-950">Protokol RoyalBase</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 font-medium max-w-md mt-2 md:mt-0">
            Transaksi dieksekusi langsung lewat smart contract B20Royal V2 di Base Mainnet dengan transparansi 100%.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="sky-card rounded-3xl p-6 sm:p-7 text-left hover:bg-white/90 transition-all duration-200">
            <div className="w-12 h-12 rounded-2xl bg-[#0052FF] text-white flex items-center justify-center font-mono font-black text-lg mb-4 shadow-[0_4px_12px_rgba(0,82,255,0.35)] border border-blue-400/30">
              01
            </div>
            <h3 className="text-lg font-black text-slate-950">Koneksikan Wallet Base</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Gunakan RainbowKit dengan MetaMask, Coinbase Wallet, atau Rabby. Pastikan jaringan terhubung ke Base Mainnet (Chain ID 8453).
            </p>
            <div className="mt-5 pt-3 border-t border-sky-100 text-[11px] font-mono text-sky-900 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#0052FF]" />
              <span>Zero setup & non-custodial</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="sky-card rounded-3xl p-6 sm:p-7 text-left hover:bg-white/90 transition-all duration-200">
            <div className="w-12 h-12 rounded-2xl bg-[#0052FF] text-white flex items-center justify-center font-mono font-black text-lg mb-4 shadow-[0_4px_12px_rgba(0,82,255,0.35)] border border-blue-400/30">
              02
            </div>
            <h3 className="text-lg font-black text-slate-950">Kirim Tip Instan</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Pilih kreator favorit dan tentukan jumlah ETH. 98% dana langsung masuk ke wallet kreator, 2% disalurkan ke Prize Pool harian.
            </p>
            <div className="mt-5 pt-3 border-t border-sky-100 text-[11px] font-mono text-sky-900 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#0052FF]" />
              <span>Biaya gas L2 sub-cent</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="sky-card rounded-3xl p-6 sm:p-7 text-left hover:bg-white/90 transition-all duration-200">
            <div className="w-12 h-12 rounded-2xl bg-[#0052FF] text-white flex items-center justify-center font-mono font-black text-lg mb-4 shadow-[0_4px_12px_rgba(0,82,255,0.35)] border border-blue-400/30">
              03
            </div>
            <h3 className="text-lg font-black text-slate-950">Dapatkan RP & Tiket Pool</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Smart contract RoyalPoints secara otomatis mencatat poin Anda, meningkatkan Tier loyalty, dan mendaftarkan tiket undian pool.
            </p>
            <div className="mt-5 pt-3 border-t border-sky-100 text-[11px] font-mono text-sky-900 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#0052FF]" />
              <span>Tier booster hingga 3.0x</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Contract Architecture & Base Ecosystem */}
      <section className="w-full py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="sky-card rounded-3xl p-6 sm:p-10 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-xs border border-white text-[11px] font-mono font-bold text-[#0052FF] mb-3 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0052FF]" />
                TRANSPARANSI TINGKAT PROTOKOL
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
                Dibangun di Atas Fondasi <span className="font-serif italic font-normal text-sky-950">Onchain Base L2</span>
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                RoyalBase memisahkan logika tipping dan reward ke dalam dua smart contract yang saling terhubung di Base Mainnet. Seluruh event tip, akumulasi poin, dan distribusi prize pool dapat diverifikasi secara publik di BaseScan.
              </p>

              <div className="mt-6 space-y-2.5 text-xs sm:text-sm text-slate-800 font-semibold">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-[#0052FF] flex items-center justify-center font-bold text-xs">✓</div>
                  <span>Non-Kustodial: Kontrak tidak menahan saldo pengguna</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-[#0052FF] flex items-center justify-center font-bold text-xs">✓</div>
                  <span>98% Alokasi Langsung: Kreator menerima dana dalam 1 blok</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-[#0052FF] flex items-center justify-center font-bold text-xs">✓</div>
                  <span>Ledger Poin Onchain: RoyalPoints tercatat permanen di Base</span>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <button
                  onClick={onLaunchApp}
                  className="px-6 py-3 rounded-full bg-[#0052FF] hover:bg-[#0045d8] text-white text-xs font-black flex items-center gap-2 shadow-[0_4px_16px_rgba(0,82,255,0.4)] border border-blue-400/40 transition-all cursor-pointer"
                >
                  <span>Mulai Tipping Sekarang</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 sky-card-solid rounded-2xl p-5 text-left font-mono text-xs border border-white/80">
              <div className="text-[11px] font-bold text-slate-500 uppercase mb-3 flex items-center justify-between border-b border-slate-100 pb-2">
                <span>Base Mainnet Contract Summary</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">Live & Audited</span>
              </div>

              <div className="space-y-3.5">
                <div className="bg-sky-50/70 backdrop-blur-xs rounded-xl p-3.5 border border-sky-100">
                  <div className="flex items-center justify-between text-slate-950 font-black">
                    <span>1. B20Royal V2</span>
                    <a
                      href={getBaseScanAddressUrl(CONTRACT_ADDRESSES.B20_ROYAL_V2)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-700 hover:underline flex items-center gap-1 text-[11px] font-bold"
                    >
                      <span>BaseScan</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="text-[11px] text-slate-600 font-medium mt-1 break-all">
                    {CONTRACT_ADDRESSES.B20_ROYAL_V2}
                  </div>
                  <div className="mt-2 text-[10px] text-slate-600 bg-white/70 px-2.5 py-1 rounded-lg border border-sky-100">
                    Fungsi: atomicTip(), distributePrizePool(), getPrizePoolBalance()
                  </div>
                </div>

                <div className="bg-sky-50/70 backdrop-blur-xs rounded-xl p-3.5 border border-sky-100">
                  <div className="flex items-center justify-between text-slate-950 font-black">
                    <span>2. RoyalPoints (RP)</span>
                    <a
                      href={getBaseScanAddressUrl(CONTRACT_ADDRESSES.ROYAL_POINTS)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-700 hover:underline flex items-center gap-1 text-[11px] font-bold"
                    >
                      <span>BaseScan</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="text-[11px] text-slate-600 font-medium mt-1 break-all">
                    {CONTRACT_ADDRESSES.ROYAL_POINTS}
                  </div>
                  <div className="mt-2 text-[10px] text-slate-600 bg-white/70 px-2.5 py-1 rounded-lg border border-sky-100">
                    Fungsi: getPoints(address), getTier(address), getMultiplier()
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Minimal Glass Strip */}
      <footer className="w-full mt-8 py-10 px-4 sm:px-6 text-xs text-slate-700">
        <div className="max-w-7xl mx-auto sky-card rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#0052FF] text-white flex items-center justify-center font-black text-xs shadow-xs border border-blue-400/40">
              <Crown className="w-4 h-4 text-white fill-white" />
            </div>
            <div>
              <span className="font-extrabold text-slate-950 text-sm">RoyalBase</span>
              <span className="text-slate-600 text-xs ml-1.5 font-medium">· GameFi Tipping Protocol on Base Mainnet</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 font-mono text-[11px]">
            <a
              href="https://base.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-slate-950 transition-colors font-semibold"
            >
              Base.org
            </a>
            <a
              href={getBaseScanAddressUrl(CONTRACT_ADDRESSES.B20_ROYAL_V2)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-slate-950 transition-colors font-semibold"
            >
              BaseScan Explorer
            </a>
            <button
              onClick={onLaunchApp}
              className="font-black text-white bg-[#0052FF] hover:bg-[#0045d8] px-4 py-1.5 rounded-full border border-blue-400/40 transition-all cursor-pointer shadow-[0_2px_8px_rgba(0,82,255,0.3)]"
            >
              Buka App
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
