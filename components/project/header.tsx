"use client"

import Link from "next/link"
import { Button } from "@/ui/button"
import { useSelectedLayoutSegment } from "next/navigation"
import { TProject } from "./secondary-nav"
import { BountyCreateButton } from "./bounty-create-button"

interface ProjectHeaderProps {
    project: TProject
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
    const segment = useSelectedLayoutSegment()

    console.log("Segment", segment)

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
