"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { MainNavItem } from "types"
import { Button } from "@/ui/button"
import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"

interface MainNavProps {
    items?: MainNavItem[]
    children?: React.ReactNode
}

export function MainNav({ items, children }: MainNavProps) {
    const segment = useSelectedLayoutSegment()
    const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

    return (
        <div className="flex gap-6 md:gap-10 text-red-50">
            <Link
                href="/"
                className="hidden items-center space-x-2 md:flex text-2xl"
            >
                <Icons.logo size={32} color="white" />
                <span className="hidden font-bold sm:inline-block">
                    {siteConfig.name}
                </span>
            </Link>

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
