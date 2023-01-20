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
import { Tooltip } from "@/ui/tooltip"

interface BountyCreateButtonProps extends TButtonProps {
    issue?: GithubIssue
    project: TProject
}

export function BountyCreateMultipleButton({
    project,
}: BountyCreateButtonProps) {
    const { selectedIssues } = useStore()

    const router = useRouter()

    const createBounty = trpc.bounty.createMultipleBounties.useMutation({
        onSuccess: (data) => {
            console.log("Success data", data)
            toast({
                title: "Multiple bounties initialized!",
                message: "Redirecting to multi-editor",
                type: "success",
            })
            const redirectUrl = new URL(`${window.location.href}/edit-multiple`)
            data.forEach((bounty) => {
                redirectUrl.searchParams.append("bountyId", bounty.id)
            })
            console.log("Redirect URL", redirectUrl.toString())
            router.push(redirectUrl.toString())
            router.refresh()
        },
        onError: () => {
            toast({
                title: "Something went wrong.",
                message: "Your bounties were not created. Please try again.",
                type: "error",
            })
        },
    })

    if (selectedIssues?.length === 0) return null

    return (
        <Button
            onClick={() => {
                createBounty.mutate({
                    issues: selectedIssues.map((selectedIssue) => {
                        return {
                            projectId: project.id,
                            title: selectedIssue?.title ?? "Untitled bounty",
                            content: undefined,
                            issueLink: selectedIssue?.html_url ?? null,
                            issue: selectedIssue,
                        }
                    }),
                })
            }}
            disabled={createBounty.isLoading}
            intent="primary"
            size="small"
        >
            {createBounty.isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Icons.add className="mr-2 h-4 w-4" />
            )}
            Create multiple
        </Button>
    )
}
