"use client"

import { useSelectedLayoutSegment } from "next/navigation"
import { BountyCreateButton } from "./bounty-create-button"
import { TProject } from "./secondary-nav"

interface ProjectHeaderProps {
    project: TProject
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
    const segment = useSelectedLayoutSegment()

    return (
        <>
            {!segment ? (
                <>
                    <h1 className="text-2xl font-medium text-brandtext-500">
                        Overview
                    </h1>
                    <BountyCreateButton
                        project={{
                            id: project.id,
                        }}
                    />
                </>
            ) : null}

            {segment === "issues" ? (
                <>
                    <h1 className="text-2xl font-medium text-brandtext-500">
                        Issues
                    </h1>
                </>
            ) : null}

            {segment === "settings" ? (
                <>
                    <h1 className="text-2xl font-medium text-brandtext-500">
                        Settings
                    </h1>
                </>
            ) : null}

            {segment === "bounty" ? (
                <>
                    <h1 className="text-2xl font-medium text-brandtext-500">
                        Edit Bounty
                    </h1>
                </>
            ) : null}
        </>
    )
}
