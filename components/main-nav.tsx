"use client"

import Link from "next/link"
import * as React from "react"

import { Icons } from "@/components/icons"
import { siteConfig } from "@/config/site"
import { MobileNavButton } from "@/ui/mobile-nav-button"
import { MainNavItem } from "types"

interface MainNavProps {
    items?: MainNavItem[]
    children?: React.ReactNode
    showBrandText?: boolean
}

export function MainNav({ showBrandText = true }: MainNavProps) {
    return (
        <div className="flex gap-6 md:gap-10 text-red-50">
            <Link
                href="/"
                className="hidden items-center space-x-2 md:flex text-2xl"
            >
                <Icons.logo size={32} color="white" />
                {showBrandText && (
                    <span className="hidden font-bold sm:inline-block">
                        {siteConfig.name}
                    </span>
                )}
            </Link>

            <MobileNavButton />
        </div>
    )
}
