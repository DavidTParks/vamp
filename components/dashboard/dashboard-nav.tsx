"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { MainNavItem } from "types"
import { Button } from "@/ui/button"
import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"
import { TUser } from "./dashboard/user-account-nav"
import { UserAvatar } from "@/components/dashboard/user-avatar"

interface MainNavProps {
    items?: MainNavItem[]
    children?: React.ReactNode
    user: TUser
}

export function DashboardNav({ items, children, user }: MainNavProps) {
    const segment = useSelectedLayoutSegment()

    const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

    return (
        <div className="flex gap-6 md:gap-10 text-red-50">
            <div className=" gap-4 items-center hidden md:flex">
                <Link
                    href="/"
                    className="hidden items-center space-x-2 md:flex text-2xl"
                >
                    <Icons.logo size={32} color="white" />
                </Link>
                <svg
                    data-testid="geist-icon"
                    fill="none"
                    height="32"
                    shape-rendering="geometricPrecision"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    viewBox="0 0 24 24"
                    width="32"
                >
                    <path d="M16.88 3.549L7.12 20.451"></path>
                </svg>
                <div className="flex items-center gap-4 w-56">
                    <div className="w-8 h-8">
                        <UserAvatar
                            user={{ name: user.name, image: user.image }}
                        />
                    </div>
                    <span className="text-sm text-brandtext-500 truncate">
                        {" "}
                        {user.email}
                    </span>
                </div>
            </div>

            <Button
                className="flex items-center space-x-2 md:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
                {showMobileMenu ? (
                    <Icons.close />
                ) : (
                    <Icons.logo size={24} color="white" />
                )}
                <span className="font-bold">Menu</span>
            </Button>
            {showMobileMenu && <MobileNav items={items}>{children}</MobileNav>}
        </div>
    )
}
