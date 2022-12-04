"use client"

import Link from "next/link"
import { User } from "@/lib/session"
import { Button } from "@/ui/button"
import { useSelectedLayoutSegment } from "next/navigation"

interface ProjectHeaderProps {
    user: User
}

export function ProjectHeader({ user }: ProjectHeaderProps) {
    const segment = useSelectedLayoutSegment()

    console.log("Segment", segment)

    return (
        <>
            {!segment ? (
                <>
                    <h1 className="text-2xl font-medium text-brandtext-500">
                        Bounties
                    </h1>
                    <Link href="/create">
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
