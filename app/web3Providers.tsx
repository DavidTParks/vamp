"use client"

import { chains, wagmiClient } from "@/lib/wagmiClient"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { PropsWithChildren } from "react"
import { WagmiConfig } from "wagmi"

export function Web3Providers({ children }: PropsWithChildren) {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
        </WagmiConfig>
    )
}
