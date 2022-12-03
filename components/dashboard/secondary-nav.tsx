"use client"
import { useSelectedLayoutSegment } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

const activeClass = "border-fuchsia-600 text-white"

export const DashboardSecondaryNav = () => {
    const segment = useSelectedLayoutSegment()

    return (
        <div className="-mb-0.5 flex h-12 items-center justify-start space-x-2">
            <SecondaryLinkItem href="/dashboard" isActive={!segment}>
                Projects
            </SecondaryLinkItem>
            <SecondaryLinkItem
                href="/dashboard/settings"
                isActive={segment === "settings"}
            >
                Settings
            </SecondaryLinkItem>
        </div>
    )
}

const SecondaryLinkItem = ({ children, isActive, href, ...props }) => {
    return (
        <Link
            {...props}
            className={cn(
                "border-b-2 p-1 border-transparent text-brandtext-400 font-bold hover:text-white",
                isActive ? activeClass : null
            )}
            href={href}
        >
            <div className="rounded-md px-3 py-2 ">
                <p className="text-sm">{children}</p>
            </div>
        </Link>
    )
}
