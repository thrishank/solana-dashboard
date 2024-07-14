import { create } from 'zustand'

type Network = 'testnet' | 'devnet'

interface NetworkState {
    network: Network
    setNetwork: (network: Network) => void
}

export const useNetworkStore = create<NetworkState>((set) => ({
    network: 'devnet',
    setNetwork: (network) => set({ network }),
}))