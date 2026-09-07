import React, { useState } from 'react';
import { ExternalLink, Copy, Check, FileCode, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import { sounds } from '../utils/audio';

export const ContractViewer: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    sounds.playCoin();
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const contracts = [
    {
      network: 'Base Mainnet',
      chainId: 8453,
      name: 'RoyalBaseTippingRouter.sol',
      address: '0x8a923C91079F5E2429f52a792E5C9A364fEbF021',
      explorerUrl: 'https://basescan.org/address/0x8a923C91079F5E2429f52a792E5C9A364fEbF021',
      status: 'Verified & Audited',
    },
    {
      network: 'Base Sepolia Testnet',
      chainId: 84532,
      name: 'RoyalBaseTestnetCore.sol',
      address: '0x247e92B088cFf5904D9F8eD54eA8a9C05E232F12',
      explorerUrl: 'https://sepolia.basescan.org/address/0x247e92B088cFf5904D9F8eD54eA8a9C05E232F12',
      status: 'Live Testnet',
    },
    {
      network: 'Base Mainnet',
      chainId: 8453,
      name: 'RoyalVaultLootDrop.sol',
      address: '0x5c42173F3294E2713919864c230Ac0B91f9b1A84',
      explorerUrl: 'https://basescan.org/address/0x5c42173F3294E2713919864c230Ac0B91f9b1A84',
      status: 'Verified',
    },
  ];

  const sampleAbiCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IRoyalBaseTipping {
    event RoyalTipSent(
        address indexed sender,
        address indexed recipient,
        uint256 amount,
        string message,
        uint256 comboStreak,
        bool lootChestAwarded
    );

    function tipETH(address payable recipient, string calldata message) external payable;
    
    function tipERC20(
        address token,
        address recipient,
        uint256 amount,
        string calldata message
    ) external;

    function claimLootReward(uint256 rollId) external returns (uint256 rarityTier);
}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-[#1a2232]">
        <div className="text-xs font-bold uppercase tracking-wider text-[#0052FF] flex items-center gap-1.5 mb-1">
          <Terminal className="w-4 h-4" />
          Web3 Architecture & Base Chain Smart Contracts
        </div>
        <h2 className="text-2xl font-extrabold text-white font-cinzel">Smart Contracts & Developer SDK</h2>
        <p className="text-xs text-[#8e9bb5] mt-1">
          RoyalBase dibangun di atas jaringan Base L2 dengan biaya transaksi gas sub-sen dan finalitas instan.
        </p>
      </div>

      {/* Contract Addresses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {contracts.map((c) => (
          <div
            key={c.address}
            className="bg-[#10141d] border border-[#1b2333] hover:border-[#28354c] rounded-xl p-5 space-y-3 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#0052FF]/20 text-[#60a5fa] border border-[#0052FF]/30">
                {c.network} (Chain ID: {c.chainId})
              </span>
              <span className="text-[10px] text-[#34d399] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                {c.status}
              </span>
            </div>

            <div>
              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-[#cbd2e0]" />
                <span>{c.name}</span>
              </div>
              <div className="font-mono text-xs text-[#8e9bb5] bg-[#0c0f16] p-2 rounded-md mt-2 flex items-center justify-between border border-[#182030]">
                <span className="truncate">{c.address}</span>
                <button
                  onClick={() => copyToClipboard(c.address, c.address)}
                  className="ml-2 text-[#8e9bb5] hover:text-white shrink-0"
                  title="Copy address"
                >
                  {copiedKey === c.address ? (
                    <Check className="w-3.5 h-3.5 text-[#34d399]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            <a
              href={c.explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#0052FF] hover:text-[#3b82f6] font-semibold"
            >
              <span>Lihat di BaseScan</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ))}
      </div>

      {/* Protocol Architecture Matrix */}
      <div className="bg-[#10141d] border border-[#1b2333] rounded-2xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-[#0052FF]" />
          <span>Arsitektur Pembagian Dana (Fee Structure & Loot Vault)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#131924] border border-[#1d273a] p-4 rounded-xl space-y-1">
            <div className="text-2xl font-extrabold font-mono text-[#34d399]">98.0%</div>
            <div className="text-xs font-bold text-white">Langsung ke Kreator / Streamer</div>
            <p className="text-[11px] text-[#8e9bb5]">
              Disalurkan secara instan (atomic onchain settlement) tanpa potongan perantara platform tradisional.
            </p>
          </div>

          <div className="bg-[#131924] border border-[#1d273a] p-4 rounded-xl space-y-1">
            <div className="text-2xl font-extrabold font-mono text-[#d99b26]">2.0%</div>
            <div className="text-xs font-bold text-white">Royal Vault Pool & GameFi Drops</div>
            <p className="text-[11px] text-[#8e9bb5]">
              Dihimpun untuk hadiah mingguan Guild Wars, Mystery Loot Drops, dan jackpot tipper.
            </p>
          </div>

          <div className="bg-[#131924] border border-[#1d273a] p-4 rounded-xl space-y-1">
            <div className="text-2xl font-extrabold font-mono text-[#0052FF]">0.0%</div>
            <div className="text-xs font-bold text-white">Biaya Protokol untuk Tiper</div>
            <p className="text-[11px] text-[#8e9bb5]">
              Tiper tidak dikenakan biaya platform tersembunyi selain gas L2 Base yang mendekati $0.0003.
            </p>
          </div>
        </div>

        {/* Solidity ABI Interface Code */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#cbd2e0] uppercase tracking-wider">
              Solidity Contract Interface
            </span>
            <button
              onClick={() => copyToClipboard(sampleAbiCode, 'abi')}
              className="text-xs text-[#8e9bb5] hover:text-white flex items-center gap-1"
            >
              {copiedKey === 'abi' ? <Check className="w-3 h-3 text-[#34d399]" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey === 'abi' ? 'Tersalin' : 'Salin Interface'}</span>
            </button>
          </div>
          <pre className="bg-[#080a0f] border border-[#171d2b] p-4 rounded-xl text-xs font-mono text-[#a5b4fc] overflow-x-auto leading-relaxed">
            {sampleAbiCode}
          </pre>
        </div>
      </div>
    </div>
  );
};
