"use client"

import Link from "next/link"
import { Button } from "@/ui/button"
import { useSelectedLayoutSegment } from "next/navigation"
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
                        Bounties
                    </h1>
                    <Link href={`/project/${project.id}/create`}>
                        <Button>New Bounty</Button>
                    </Link>
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
        </>
    )
}
