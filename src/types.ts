export type TokenSymbol = 'ETH' | 'USDC' | 'ROYAL';

export type CrownRank = 'Knight' | 'Baron' | 'Count' | 'Duke' | 'Sovereign King';

export interface GamerProfile {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  gameTitle: string;
  gameCategory: 'Base RPG' | 'Parallel TCG' | 'FrenPet' | 'Esports Arena' | 'Base Builders';
  streamStatus: 'live' | 'offline';
  viewerCount?: number;
  totalTipsReceivedEth: number;
  level: number;
  crownRank: CrownRank;
  verified: boolean;
  guildTag: string;
  address: `0x${string}`;
  bio: string;
  activeBuff?: string;
}

export interface LootItem {
  id: string;
  name: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  icon: string;
  perkDescription: string;
  buffMultiplier: number;
  obtainedAt: number;
}

export interface TipTransaction {
  id: string;
  senderAddress: string;
  senderName?: string;
  recipientId: string;
  recipientName: string;
  recipientAddress: string;
  amount: number;
  token: TokenSymbol;
  message: string;
  timestamp: number;
  txHash: string;
  expEarned: number;
  comboMultiplier: number;
  lootDrop?: LootItem;
  isMock?: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  handle: string;
  address: string;
  role: 'tipper' | 'creator';
  totalAmountEth: number;
  tipsCount: number;
  crownRank: CrownRank;
  streakDays: number;
  avatarUrl: string;
}

export interface GuildData {
  id: string;
  name: string;
  tag: string;
  leader: string;
  members: number;
  totalTippedEth: number;
  weeklyBuff: string;
  bannerColor: string;
}

export type RoyalTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Sovereign';

export interface TierInfo {
  name: RoyalTier;
  minPoints: number;
  maxPoints: number;
  rpMultiplier: number;
  cashbackPct: number;
  perks: string[];
}

export interface PrizePoolInfo {
  totalEth: number;
  usdValue: number;
  drawEpoch: number;
  participantsCount: number;
  nextDrawSecondsRemaining: number;
  topContributor: string;
}

export interface GameSlotItem {
  id: string;
  title: string;
  subtitle: string;
  status: 'active' | 'coming_soon';
  description: string;
  minEntry: string;
  bannerText: string;
}
