"use client"

import { PropsWithChildren } from "react"
import { SWRConfig } from "swr"
import { ClientProvider } from "@/client/trpcClient"

export function Providers({ children }: PropsWithChildren) {
    return (
        <ClientProvider>
            <SWRConfig
                value={{
                    fetcher: (resource, init) =>
                        fetch(resource, init).then((res) => res.json()),
                }}
            >
                {children}
            </SWRConfig>
        </ClientProvider>
    )
}
