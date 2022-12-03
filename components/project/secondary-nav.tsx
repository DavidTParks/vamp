"use client"
import { useSelectedLayoutSegment } from "next/navigation"

import { SecondaryLinkItem } from "../dashboard/secondary-nav"
import { TProject } from "@/lib/projects"

type TProjectSecondaryNav = {
    project: TProject
}
export const ProjectSecondaryNav = ({ project }: TProjectSecondaryNav) => {
    const segment = useSelectedLayoutSegment()

    return (
        <div className="-mb-0.5 flex h-12 items-center justify-start space-x-2">
            <SecondaryLinkItem
                href={`/project/${project.id}`}
                isActive={!segment}
            >
                Bounties
            </SecondaryLinkItem>
            <SecondaryLinkItem
                href={`/project/${project.id}/issues`}
                isActive={segment === "issues"}
            >
                Issues
            </SecondaryLinkItem>
            <SecondaryLinkItem
                href={`/project/${project.id}/settings`}
                isActive={segment === "settings"}
            >
                Settings
            </SecondaryLinkItem>
        </div>
    )
}
