"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { returnUrlQueryParams } from "pages/api/users/stripe"
import { useRouter } from "next/navigation"

export function RefreshListener() {
    const router = useRouter()

    const searchParams = useSearchParams()

    const from = searchParams.get("from") as returnUrlQueryParams

    React.useEffect(() => {
        if (from === "create") {
            router.refresh()
        }
    }, [from])
}
