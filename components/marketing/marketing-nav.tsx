import { getCurrentUser } from "@/lib/session"
import { Button } from "@/ui/button"
import { Skeleton } from "@/ui/skeleton"
import Link from "next/link"
import { Suspense } from "react"

export function MarketingNav() {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-between gap-4">
                    <Skeleton className="h-9 w-9 rounded-full"></Skeleton>
                    <Skeleton className="h-9 w-9 rounded-full"></Skeleton>
                </div>
            }
        >
            {/* @ts-expect-error Server Component */}
            <Wrapper />
        </Suspense>
    )
}

async function Wrapper() {
    const user = await getCurrentUser()

    if (!user) {
        return (
            <Link href="/login">
                <Button intent="primary" borderRadius="full">
                    Login
                </Button>
            </Link>
        )
    }

    return (
        <>
            <Link href="/dashboard">
                <Button intent="primary" borderRadius="full">
                    Dashboard
                </Button>
            </Link>
        </>
    )
}
