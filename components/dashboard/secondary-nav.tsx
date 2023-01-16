"use client"
import { useSelectedLayoutSegment } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

const activeClass = "border-rose-600 text-white"

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

type TSecondaryLinkItem = {
    children: React.ReactNode
    badge?: React.ReactNode
    isActive: boolean
    href: string
}

export const SecondaryLinkItem = ({
    children,
    badge,
    isActive,
    href,
    ...props
}: TSecondaryLinkItem) => {
    return (
        <Link
            {...props}
            className={cn(
                "border-b-2 border-transparent p-1 font-bold text-brandtext-400 hover:text-white",
                isActive ? activeClass : null
            )}
            href={href}
        >
            <div className="inline-flex gap-2 rounded-md px-3 py-2">
                <p className="text-sm">{children}</p>
                {badge}
            </div>
        </Link>
    )
}
