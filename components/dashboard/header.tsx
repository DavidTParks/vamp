"use client"

import Link from "next/link"
import { User } from "@/lib/session"
import { Button } from "@/ui/button"
import { useSelectedLayoutSegment } from "next/navigation"
interface DashboardHeaderProps {
    user: User
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
    const segment = useSelectedLayoutSegment()

    return (
        <>
            {!segment ? (
                <>
                    <h1 className="text-2xl font-medium text-brandtext-500">
                        My Projects
                    </h1>
                    <Link href="/new">
                        <Button>New Project</Button>
                    </Link>
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
