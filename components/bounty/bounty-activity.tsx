import { BountySubmissionList } from "@/components/bounty/bounty-submission-list"
import { BountySubmissionsEmpty } from "@/components/bounty/bounty-submissions-empty"
import { SubmissionCreateButton } from "@/components/project/submission-create-button"
import { getBountyById } from "@/lib/bounties"

interface TBountyActivity {
    bountyId: string
}

export async function BountyActivity({ bountyId }: TBountyActivity) {
    const bounty = await getBountyById(bountyId)

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-brandtext-500 text-2xl font-bold">
                    Activity
                </h3>
                {bounty.bountySubmissions?.length && !bounty.resolved ? (
                    <SubmissionCreateButton
                        size="small"
                        bounty={{
                            id: bountyId,
                        }}
                    />
                ) : null}
            </div>
            {bounty.bountySubmissions?.length ? (
                <BountySubmissionList
                    bountyId={bounty.id}
                    resolved={bounty.resolved}
                    bountyStripePriceId={bounty.stripePriceId}
                    bountySubmissions={bounty.bountySubmissions}
                />
            ) : (
                <>
                    {/* @ts-expect-error Server Component */}
                    <BountySubmissionsEmpty bountyId={bountyId} />
                </>
            )}
        </>
    )
}
