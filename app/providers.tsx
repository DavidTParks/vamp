"use client"

import { ClientProvider } from "@/client/trpcClient"
import { PropsWithChildren } from "react"

export function Providers({ children }: PropsWithChildren) {
    return <ClientProvider>{children}</ClientProvider>
}
