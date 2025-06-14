// wagmiConfig.js
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, sepolia } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // ❗️Replace this
  chains: [sepolia, mainnet],
})
