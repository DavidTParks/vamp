"use client"
import { useSelectedLayoutSegment } from "next/navigation"

import { SecondaryLinkItem } from "../dashboard/secondary-nav"
import { TProject } from "@/lib/projects"
import { GithubIssue } from "types"

type TProjectSecondaryNav = {
    project: TProject
    githubIssues: GithubIssue[]
}
export const ProjectSecondaryNav = ({
    project,
    githubIssues,
}: TProjectSecondaryNav) => {
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
                GitHub Issues
                {/* {githubIssues?.length ? (
                    <div className="inline-flex items-center rounded-md bg-palette-300 px-2.5 py-0.5 text-sm font-medium text-brandtext-300 ml-2">
                        {githubIssues?.length}
                    </div>
                ) : null} */}
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
