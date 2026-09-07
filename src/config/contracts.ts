export const CONTRACT_ADDRESSES = {
  B20_ROYAL_V2: '0xB0419341d9d09adDE403DbD276C42684C22AA4E8' as `0x${string}`,
  ROYAL_POINTS: '0xF6F9c77116431a650420b08C2c1Bfd05D5b16e47' as `0x${string}`,
} as const;

export const BASE_CHAIN_ID = 8453;

export const getBaseScanAddressUrl = (address: string) => `https://basescan.org/address/${address}`;
export const getBaseScanTxUrl = (txHash: string) => `https://basescan.org/tx/${txHash}`;

export const CONTRACT_METADATA = {
  b20RoyalV2: {
    name: 'B20Royal V2',
    address: CONTRACT_ADDRESSES.B20_ROYAL_V2,
    purpose: 'Core GameFi Tipping & Prize Pool Protocol Engine',
    network: 'Base Mainnet',
    explorer: getBaseScanAddressUrl(CONTRACT_ADDRESSES.B20_ROYAL_V2),
  },
  royalPoints: {
    name: 'RoyalPoints',
    address: CONTRACT_ADDRESSES.ROYAL_POINTS,
    purpose: 'Loyalty Reward Points, Multiplier & Tier Progression',
    network: 'Base Mainnet',
    explorer: getBaseScanAddressUrl(CONTRACT_ADDRESSES.ROYAL_POINTS),
  },
};
