"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { toast } from "@/ui/toast"
import { Button } from "@/ui/button"
import { TProject } from "./secondary-nav"
import { GithubIssue } from "types"
import { TButtonProps } from "@/ui/button"

interface BountyCreateButtonProps extends TButtonProps {
    issue?: GithubIssue
    project: TProject
}

export function BountyCreateButton({
    issue,
    project,
    className,
    intent,
    size,
    ...props
}: BountyCreateButtonProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    async function onClick() {
        setIsLoading(true)

        const response = await fetch(`/api/bounties?projectId=${project.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: issue?.title ?? "Untitled bounty",
                content: undefined,
                projectId: project.id,
                issueLink: issue?.html_url ?? null,
                issue,
            }),
        })

        setIsLoading(false)

        if (!response?.ok) {
            return toast({
                title: "Something went wrong.",
                message: "Your bounty was not created. Please try again.",
                type: "error",
            })
        }

        const bounty = await response.json()

        // This forces a cache invalidation.
        router.refresh()

        toast({
            title: "Bounty initialized",
            message: "Redirecting...",
            type: "success",
        })

        router.push(`/bounty/${bounty.id}/edit`)
    }

    return (
        <Button
            intent={intent}
            size={size}
            onClick={onClick}
            className={cn(
                {
                    "cursor-not-allowed opacity-60": isLoading,
                },
                className
            )}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Icons.add className="mr-2 h-4 w-4" />
            )}
            New bounty
        </Button>
    )
}
