import { connectorsForWallets } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import { infuraProvider } from "@wagmi/core/providers/infura"
import { configureChains, createClient as createWagmiClient } from "wagmi"
import { polygon, polygonMumbai } from "wagmi/chains"

import {
    coinbaseWallet,
    injectedWallet,
    metaMaskWallet,
    rainbowWallet,
    walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets"

const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY as string

export const { chains, provider, webSocketProvider } = configureChains(
    [
        polygon,
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
            ? [polygonMumbai]
            : []),
    ],
    [infuraProvider({ apiKey: INFURA_KEY })]
)

const connectors = connectorsForWallets([
    {
        groupName: "Recommended",
        wallets: [
            injectedWallet({ chains }),
            metaMaskWallet({ chains }),
            coinbaseWallet({ chains, appName: "Vamp" }),
            rainbowWallet({ chains }),
            walletConnectWallet({ chains }),
        ],
    },
])

export const wagmiClient = createWagmiClient({
    autoConnect: true,
    connectors,
    provider,
    webSocketProvider,
})

export const ironOptions = {
    cookieName: "vamp_web3_auth_cookie",
    password: "NhK62taqrJBkdPV8knBhreqWC5oKygOSPZCCriJxndg=",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
}
