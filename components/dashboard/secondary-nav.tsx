"use client"
import { useSelectedLayoutSegment } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Icons } from "../icons"

const activeClass = "border-rose-600 text-white"

export const DashboardSecondaryNav = () => {
    const segment = useSelectedLayoutSegment()

    return (
        <div className="-mb-0.5 flex h-12 items-center justify-start space-x-2">
            <SecondaryLinkItem
                icon={<Icons.book size={16} />}
                href="/dashboard"
                isActive={!segment}
            >
                Projects
            </SecondaryLinkItem>

            <SecondaryLinkItem
                icon={<Icons.settings size={16} />}
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
    icon?: React.ReactElement
}

export const SecondaryLinkItem = ({
    icon,
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
            <div className="inline-flex items-center gap-2 rounded-md px-3 py-2">
                {icon}
                <p className="text-sm">{children}</p>
                {badge}
            </div>
        </Link>
    )
}
