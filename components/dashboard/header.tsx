"use client"

import { ProjectCreateButton } from "@/components/dashboard/project-create-button"
import { User } from "@/lib/session"
import { useSelectedLayoutSegment } from "next/navigation"
interface DashboardHeaderProps {
    user: User
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
    const segment = useSelectedLayoutSegment()

    console.log("Segment", segment)
    return (
        <>
            {!segment ? (
                <>
                    <h1 className="text-2xl font-medium text-brandtext-500">
                        My Projects
                    </h1>
                    <ProjectCreateButton user={user} />
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
