import { TierInfo, PrizePoolInfo, GameSlotItem } from '../types';

export const TIERS_CONFIG: TierInfo[] = [
  {
    name: 'Bronze',
    minPoints: 0,
    maxPoints: 999,
    rpMultiplier: 1.0,
    cashbackPct: 0,
    perks: ['Akses Dasar Tipping Arena', 'Peluang Common Loot Drop'],
  },
  {
    name: 'Silver',
    minPoints: 1000,
    maxPoints: 4999,
    rpMultiplier: 1.25,
    cashbackPct: 0.5,
    perks: ['1.25x Multiplier Royal Points', '0.5% Protocol Gas Rebate', 'Badge Silver Onchain'],
  },
  {
    name: 'Gold',
    minPoints: 5000,
    maxPoints: 19999,
    rpMultiplier: 1.5,
    cashbackPct: 1.0,
    perks: ['1.5x Multiplier Royal Points', '1.0% Cashback Tip Pool', 'Peluang Rare & Epic Relik 2x'],
  },
  {
    name: 'Platinum',
    minPoints: 20000,
    maxPoints: 49999,
    rpMultiplier: 2.0,
    cashbackPct: 1.5,
    perks: ['2.0x Multiplier Royal Points', 'Akses Private Discord High Roller', 'Prioritas Tiket Prize Pool'],
  },
  {
    name: 'Sovereign',
    minPoints: 50000,
    maxPoints: Infinity,
    rpMultiplier: 3.0,
    cashbackPct: 2.5,
    perks: ['3.0x Multiplier Maksimal', 'B20 Royal Crown Sovereign NFT', 'Hak Tata Kelola & Revenue Share'],
  },
];

export const INITIAL_PRIZE_POOL: PrizePoolInfo = {
  totalEth: 4.28,
  usdValue: 14552,
  drawEpoch: 42,
  participantsCount: 318,
  nextDrawSecondsRemaining: 18840, // ~5 jam 14 menit
  topContributor: '0x3249...3510 (1.20 ETH)',
};

export const OTHER_GAME_SLOTS: GameSlotItem[] = [
  {
    id: 'tip-game',
    title: 'TipGame (B20Royal V2)',
    subtitle: 'Core GameFi Tipping & Instant Rewards',
    status: 'active',
    description: 'Kirim tip ETH langsung ke kreator di Base, dapatkan Royal Points instan dan tiket undian Prize Pool harian.',
    minEntry: '0.001 ETH',
    bannerText: 'LIVE DI BASE MAINNET',
  },
  {
    id: 'royal-coinflip',
    title: 'Royal Coinflip 1v1',
    subtitle: 'Onchain Provably Fair PvP',
    status: 'coming_soon',
    description: 'Duel head-to-head onchain menggunakan Chainlink VRF di Base dengan smart contract escrow tanpa perantara.',
    minEntry: '0.005 ETH',
    bannerText: 'TAHAP TESTNET V2',
  },
  {
    id: 'guild-jackpot',
    title: 'Guild Wars Jackpot Pool',
    subtitle: 'Weekly Sovereign Guild Battles',
    status: 'coming_soon',
    description: 'Kompetisi tipping guild mingguan. Guild dengan akumulasi tip tertinggi memenangkan 60% alokasi pool treasury.',
    minEntry: '0.01 ETH',
    bannerText: 'DEVELOPMENT',
  },
  {
    id: 'mystery-vault-spin',
    title: 'Royal Relic Wheel',
    subtitle: 'NFT Lootbox & Multiplier Perks',
    status: 'coming_soon',
    description: 'Putar roda relik misterius menggunakan Royal Points yang diperoleh untuk membuka boost permanen & badge langka.',
    minEntry: '500 RP',
    bannerText: 'SEGERA HADIR',
  },
];
