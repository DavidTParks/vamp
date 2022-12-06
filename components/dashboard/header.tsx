"use client"

import { Button } from "@/ui/button"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

export function DashboardHeader() {
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
