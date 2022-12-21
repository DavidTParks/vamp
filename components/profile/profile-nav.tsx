"use client"

import Link from "next/link"

import { Icons } from "@/components/icons"
import { MobileNavButton } from "@/ui/mobile-nav-button"

export function ProfileNav() {
    return (
        <div className="flex gap-6 md:gap-10 text-red-50">
            <div className=" gap-4 items-center hidden md:flex">
                <Link
                    href="/dashboard"
                    className="hidden items-center space-x-2 md:flex text-2xl"
                >
                    <Icons.logo size={32} color="white" />
                </Link>
            </div>

            <MobileNavButton />
        </div>
    )
}
