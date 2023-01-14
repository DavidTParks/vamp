"use client"
import { useSelectedLayoutSegment } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { SecondaryLinkItem } from "@/components/dashboard/secondary-nav"

const activeClass = "border-rose-600 text-white"

export const ProfileTabNav = () => {
    const segment = useSelectedLayoutSegment()

    return (
        <div className="-mb-0.5 flex h-12 items-center justify-start space-x-2">
            <SecondaryLinkItem href="/dashboard" isActive={!segment}>
                Overview
            </SecondaryLinkItem>

            {/* <SecondaryLinkItem
                href="/dashboard/settings"
                isActive={segment === "settings"}
            >
                Projects
            </SecondaryLinkItem>
            <SecondaryLinkItem
                href="/dashboard/settings"
                isActive={segment === "settings"}
            >
                Bounties
            </SecondaryLinkItem> */}
        </div>
    )
}
