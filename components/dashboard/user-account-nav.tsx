"use client"

import { User } from "next-auth"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { Icons } from "../icons"
import { siteConfig } from "@/config/site"
import { DropdownMenu } from "@/ui/dropdown"
import { UserAvatar } from "@/components/dashboard/user-avatar"
import { Button } from "@/ui/button"
import { NotificationList } from "@/components/notification-list"
import { trpc } from "@/client/trpcClient"
import { useRouter } from "next/navigation"

export type TUser = Pick<User, "id" | "name" | "image" | "email">
export interface UserAccountNavProps
    extends React.HTMLAttributes<HTMLDivElement> {
    user: TUser
    children?: React.ReactNode
}

export function UserAccountNav({ user, children }: UserAccountNavProps) {
    const router = useRouter()
    const markAllRead = trpc.notification.markAllRead.useMutation()

    router.prefetch(`/dashboard`)
    router.prefetch(`/browse`)
    router.prefetch(`/dashboard/settings`)
    router.prefetch(`/dashboard/settings/billing`)
    router.prefetch(`/u/${user.id}`)

    return (
        <div className="relative flex items-center gap-4">
            <DropdownMenu
                onOpenChange={async (e) => {
                    if (e) {
                        await markAllRead.mutateAsync()
                        router.refresh()
                    }
                }}
            >
                <DropdownMenu.Trigger
                    asChild
                    className="focus:ring-brand-900 flex items-center gap-2 overflow-hidden focus:ring-0 focus:ring-offset-2 focus-visible:outline-none"
                >
                    <div>
                        {children}
                        <Button
                            className="p-2 text-brandtext-500"
                            borderRadius="full"
                            size="small"
                            intent="outline"
                        >
                            <Icons.bell size={20} />
                        </Button>
                    </div>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content
                        className="z-50 mt-2 w-72 md:w-96"
                        align="end"
                    >
                        <div className="flex items-center justify-between gap-2 p-4">
                            <div className="flex flex-col space-y-1 leading-none">
                                Notifications
                            </div>
                        </div>
                        <DropdownMenu.Separator />
                        <NotificationList
                            user={{
                                id: user.id,
                            }}
                        />
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenu.Trigger className="focus:ring-brand-900 flex items-center gap-2 overflow-hidden focus:ring-2 focus:ring-offset-2 focus-visible:outline-none">
                    <UserAvatar
                        user={{
                            id: user.id,
                            name: user.name,
                            image: user.image,
                        }}
                    />
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content
                        className="z-50 mt-2 md:w-[240px]"
                        align="end"
                    >
                        <div className="flex items-center justify-start gap-2 p-4">
                            <div className="flex flex-col space-y-1 leading-none">
                                {user.name && (
                                    <p className="font-medium text-white">
                                        {user.name}
                                    </p>
                                )}
                                {user.email && (
                                    <p className="w-[200px] truncate text-sm text-brandtext-600">
                                        {user.email}
                                    </p>
                                )}
                            </div>
                        </div>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item
                            onSelect={() => {
                                router.push(`/u/${user.id}`)
                            }}
                        >
                            Profile
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                            onSelect={() => {
                                router.push(`/dashboard`)
                            }}
                        >
                            Dashboard
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                            onSelect={() => {
                                router.push(`/browse`)
                            }}
                        >
                            Browse
                        </DropdownMenu.Item>

                        <DropdownMenu.Item
                            onSelect={() => {
                                router.push(`/dashboard/settings`)
                            }}
                        >
                            Settings
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                            onSelect={() => {
                                router.push(`/dashboard/settings/billing`)
                            }}
                        >
                            Billing
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item>
                            <Link
                                href={siteConfig.links.github}
                                className="w-full"
                                target="_blank"
                            >
                                GitHub
                            </Link>
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item
                            className="cursor-pointer"
                            onSelect={(event) => {
                                event.preventDefault()
                                if (typeof window !== "undefined") {
                                    signOut({
                                        callbackUrl: `${window.location.origin}/login`,
                                    })
                                }
                            }}
                        >
                            Sign out
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu>
        </div>
    )
}
