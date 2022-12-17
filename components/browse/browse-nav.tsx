"use client"

import Link from "next/link"
import * as React from "react"

import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/ui/button"
import { MainNavItem } from "types"

interface BrowseNavProps {
    items?: MainNavItem[]
    children?: React.ReactNode
}

export function BrowseNav({ items, children }: BrowseNavProps) {
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
            </div>

            <Button
                intent="tertiary"
                size="small"
                className="flex items-center space-x-2 md:hidden px-2"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
                {showMobileMenu ? (
                    <Icons.close />
                ) : (
                    <Icons.menu size={24} color="white" />
                )}
            </Button>
            {showMobileMenu && <MobileNav items={items}>{children}</MobileNav>}
        </div>
    )
}
