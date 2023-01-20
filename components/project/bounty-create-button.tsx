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
import { trpc } from "@/client/trpcClient"
import { useStore } from "@/store"
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
    const { selectedIssues } = useStore()
    const router = useRouter()

    const createBounty = trpc.bounty.createBounty.useMutation()

    async function onClick() {
        try {
            const bounty = await createBounty.mutateAsync({
                projectId: project.id,
                title: issue?.title ?? "Untitled bounty",
                content: undefined,
                issueLink: issue?.html_url ?? null,
                issue,
            })

            // This forces a cache invalidation.
            router.refresh()

            toast({
                title: "Bounty initialized",
                message: "Redirecting...",
                type: "success",
            })

            router.push(`/bounty/${bounty.id}/edit`)
        } catch (e) {
            return toast({
                title: "Something went wrong.",
                message: "Your bounty was not created. Please try again.",
                type: "error",
            })
        }
    }

    if (selectedIssues?.length > 0) return null

    return (
        <Button
            intent={intent}
            size={size}
            onClick={onClick}
            className={cn(
                {
                    "cursor-not-allowed opacity-60":
                        createBounty.isLoading || createBounty.isSuccess,
                },
                className
            )}
            disabled={createBounty.isLoading || createBounty.isSuccess}
            {...props}
        >
            {createBounty.isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Icons.add className="mr-2 h-4 w-4" />
            )}
            New bounty
        </Button>
    )
}
