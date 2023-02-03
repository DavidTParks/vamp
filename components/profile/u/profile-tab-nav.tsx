"use client"
import { SecondaryLinkItem } from "@/components/dashboard/secondary-nav"
import { User } from "@prisma/client"
import { useSelectedLayoutSegment } from "next/navigation"
import { usePathname } from "next/navigation"
interface IUserProjectList {
    user?: Pick<User, "id">
}

export const ProfileTabNav = ({ user }: IUserProjectList) => {
    const pathname = usePathname()
    const segment = useSelectedLayoutSegment()

    return (
        <div className="-mb-0.5 flex h-12 items-center justify-start space-x-2">
            <SecondaryLinkItem
                href={`/u/${user?.id}`}
                isActive={!pathname?.includes("submissions")}
            >
                Overview
            </SecondaryLinkItem>

            <SecondaryLinkItem
                href={`/u/${user?.id}/submissions`}
                isActive={!!pathname?.includes("submissions")}
            >
                Submissions
            </SecondaryLinkItem>
            {/* <SecondaryLinkItem
                href="/dashboard/settings"
                isActive={segment === "settings"}
            >
                Bounties
            </SecondaryLinkItem> */}
        </div>
    )
}
