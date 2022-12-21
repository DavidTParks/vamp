"use client"

import Link from "next/link"

import { Icons } from "@/components/icons"
import { MobileNavButton } from "@/ui/mobile-nav-button"

export function BountyNav() {
    return (
        <div className="flex gap-6 md:gap-10 text-red-50">
            <Link
                href="/"
                className="hidden items-center space-x-2 md:flex text-2xl"
            >
                <Icons.logo size={32} color="white" />
                <span className="hidden font-bold sm:inline-block">Vamp</span>
            </Link>

            <MobileNavButton />
        </div>
    )
}
