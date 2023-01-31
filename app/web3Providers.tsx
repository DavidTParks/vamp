"use client"

import { chains, wagmiClient } from "@/lib/wagmiClient"
import {
    RainbowKitProvider,
    RainbowKitAuthenticationProvider,
} from "@rainbow-me/rainbowkit"
import { PropsWithChildren } from "react"
import { WagmiConfig } from "wagmi"
import { authenticationAdapter } from "@/lib/auth"

export function Web3Providers({ children }: PropsWithChildren) {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitAuthenticationProvider
                adapter={authenticationAdapter}
                status={"unauthenticated"}
            >
                <RainbowKitProvider chains={chains}>
                    {children}
                </RainbowKitProvider>
            </RainbowKitAuthenticationProvider>
        </WagmiConfig>
    )
}
