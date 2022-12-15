import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"
import Link from "next/link"
import { Button } from "@/ui/button"
import { SubmissionCreateButton } from "../project/submission-create-button"
import { getCurrentUser } from "@/lib/session"
import { getBountyById } from "@/lib/bounties"

interface TBountySubmissionsEmpty {
    bountyId: string
}
export async function BountySubmissionsEmpty({
    bountyId,
}: TBountySubmissionsEmpty) {
    const [user, bounty] = await Promise.all([
        getCurrentUser(),
        getBountyById(bountyId),
    ])

    return (
        <EmptyPlaceholder className="min-h-[200px]">
            <EmptyPlaceholder.Icon name="frown" />
            <EmptyPlaceholder.Title>No submissions yet!</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
                Be the first to submit a solution to this bug bounty. If
                accepted by the project owners, you get paid!
            </EmptyPlaceholder.Description>
            {!user ? (
                <Link href="/login">
                    <Button intent="primary">Login to contribute</Button>
                </Link>
            ) : (
                <SubmissionCreateButton
                    bounty={{
                        id: bounty.id,
                    }}
                />
            )}
        </EmptyPlaceholder>
    )
}
