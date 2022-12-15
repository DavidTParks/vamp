"use client"

import { User } from "next-auth"
import { signOut } from "next-auth/react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { DropdownMenu } from "@/ui/dropdown"
import { UserAvatar } from "@/components/dashboard/user-avatar"

export type TUser = Pick<User, "name" | "image" | "email">
export interface UserAccountNavProps
    extends React.HTMLAttributes<HTMLDivElement> {
    user: TUser
}

export function UserAccountNav({ user }: UserAccountNavProps) {
    return (
        <DropdownMenu>
            <DropdownMenu.Trigger className="flex items-center gap-2 overflow-hidden focus:ring-2 focus:ring-brand-900 focus:ring-offset-2 focus-visible:outline-none">
                <UserAvatar user={{ name: user.name, image: user.image }} />
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
                                <p className="w-[200px] truncate text-sm text-slate-500">
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
                        <Link
                            href="/dashboard/settings/billing"
                            className="w-full"
                        >
                            Billing
                        </Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                        <Link href="/dashboard/settings" className="w-full">
                            Settings
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
    )
}
