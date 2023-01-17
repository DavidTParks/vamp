"use client"

import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"
import Link from "next/link"
import { Button } from "@/ui/button"
import { SubmissionCreateButton } from "../project/submission-create-button"
import { getCurrentUser } from "@/lib/session"
import { getBountyById } from "@/lib/bounties"
import { StripeNotConnectedModal } from "@/ui/stripe-not-connected-modal"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { getBaseUrl } from "@/lib/utils"
interface TBountySubmissionsEmpty {
    nextCursor: string
    bountyId: string
}
export function BountySubmissionsLoadMore({
    nextCursor,
    bountyId,
}: TBountySubmissionsEmpty) {
    const [isPending, startTransition] = useTransition()

    const router = useRouter()
    return (
        <Button
            isLoading={isPending}
            disabled={isPending}
            onClick={() => {
                router.push(
                    `${getBaseUrl()}/bounty/${bountyId}?cursor=${nextCursor}`
                )
                startTransition(() => {
                    router.refresh()
                })
            }}
            size="small"
            intent="outline"
        >
            Load more
        </Button>
    )
}
