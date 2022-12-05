"use client"

import { useSelectedLayoutSegment } from "next/navigation"
import { Project } from "@prisma/client"
import { SecondaryLinkItem } from "../dashboard/secondary-nav"
import { GithubIssue, GithubIssueSearch } from "types"

export type TProject = Pick<Project, "id">

type TProjectSecondaryNav = {
    project: TProject
    issueCount: number
}
export const ProjectSecondaryNav = ({
    project,
    issueCount,
}: TProjectSecondaryNav) => {
    const segment = useSelectedLayoutSegment()

    console.log("Issue count", issueCount)

    return (
        <div className="-mb-0.5 flex h-12 items-center justify-start space-x-2">
            <SecondaryLinkItem
                href={`/project/${project.id}`}
                isActive={!segment}
            >
                Bounties
            </SecondaryLinkItem>
            <SecondaryLinkItem
                badge={
                    <span className="inline-flex items-center rounded-full bg-palette-300 px-2.5 py-0.5 text-xs font-medium text-brandtext-500">
                        {issueCount}
                    </span>
                }
                href={`/project/${project.id}/issues`}
                isActive={segment === "issues"}
            >
                GitHub Issues
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
