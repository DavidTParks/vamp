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
                    <div className="font-bold inline-flex justify-center items-center absolute top-0 left-0 text-xs rounded-full h-4 min-w-[1rem] bg-rose-600 text-brandtext-500 pointer-events-none">
                        {unreadNotificationCount}
                    </div>
                )}
            </UserAccountNav>
        </>
    )
}
