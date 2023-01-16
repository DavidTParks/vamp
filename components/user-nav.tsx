import { UserAccountNav } from "@/components/dashboard/user-account-nav"
import { getUnreadNotificationCount } from "@/lib/notifications"
import { getCurrentUser } from "@/lib/session"
import { Button } from "@/ui/button"
import { Skeleton } from "@/ui/skeleton"
import Link from "next/link"
import { Suspense } from "react"

export function UserNav() {
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

    const unreadNotificationCount = await getUnreadNotificationCount(user.id)

    return (
        <>
            <UserAccountNav
                user={{
                    id: user.id,
                    name: user.name,
                    image: user.image,
                    email: user.email,
                }}
            >
                {unreadNotificationCount > 0 && (
                    <div className="pointer-events-none absolute top-0 left-0 -m-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-rose-600 text-xs font-bold text-brandtext-500">
                        {unreadNotificationCount}
                    </div>
                )}
            </UserAccountNav>
        </>
    )
}
