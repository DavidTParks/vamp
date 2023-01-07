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
    const markAllUnread = trpc.notification.markAllUnread.useMutation()

    return (
        <div className="flex items-center gap-4 relative">
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
                    className="flex items-center gap-2 overflow-hidden focus:ring-2 focus:ring-brand-900 focus:ring-offset-2 focus-visible:outline-none"
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
                        className="mt-2 w-96 md:w-96 z-50"
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
                <DropdownMenu.Trigger className="flex items-center gap-2 overflow-hidden focus:ring-2 focus:ring-brand-900 focus:ring-offset-2 focus-visible:outline-none">
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
                        className="mt-2 md:w-[240px] z-50"
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

                        <DropdownMenu.Item>
                            <Link href="/dashboard" className="w-full">
                                Dashboard
                            </Link>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item>
                            <Link href="/browse" className="w-full">
                                Browse
                            </Link>
                        </DropdownMenu.Item>

                        <DropdownMenu.Item>
                            <Link href="/dashboard/settings" className="w-full">
                                Settings
                            </Link>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item>
                            <Link
                                href="/dashboard/settings/billing"
                                className="w-full"
                            >
                                Billing
                            </Link>
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
                                signOut({
                                    callbackUrl: `${window.location.origin}/login`,
                                })
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
