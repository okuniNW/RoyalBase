import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base, baseSepolia } from 'wagmi/chains';
import { http } from 'viem';

// WalletConnect Project ID (dapat diganti via env VITE_WALLETCONNECT_PROJECT_ID)
export const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '3a8170812b534d0ff9d794f19a901d64';

export const wagmiConfig = getDefaultConfig({
  appName: 'RoyalBase Protocol',
  projectId,
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http('https://mainnet.base.org'),
    [baseSepolia.id]: http('https://sepolia.base.org'),
  },
  ssr: false,
});
