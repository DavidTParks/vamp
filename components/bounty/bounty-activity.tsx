import { BountySubmissionList } from "@/components/bounty/bounty-submission-list"
import { BountySubmissionsEmpty } from "@/components/bounty/bounty-submissions-empty"
import { SubmissionCreateButton } from "@/components/project/submission-create-button"
import { getBountyById } from "@/lib/bounties"
import { getCurrentUser } from "@/lib/session"
import Link from "next/link"
import { Button } from "@/ui/button"
import { StripeNotConnectedModal } from "@/ui/stripe-not-connected-modal"

interface TBountyActivity {
    bountyId: string
}

export async function BountyActivity({ bountyId }: TBountyActivity) {
    const [bounty, user] = await Promise.all([
        getBountyById(bountyId),
        getCurrentUser(),
    ])

    if (!bounty) return null

    return (
        <>
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-brandtext-500">
                    Activity
                </h3>
                {bounty?.bountySubmissions?.length &&
                !bounty.resolved &&
                user ? (
                    <>
                        {user.stripeCustomerId ? (
                            <SubmissionCreateButton
                                bounty={{
                                    id: bountyId,
                                }}
                            />
                        ) : (
                            <StripeNotConnectedModal>
                                <Button>Post solution</Button>
                            </StripeNotConnectedModal>
                        )}
                    </>
                ) : (
                    <>
                        {!user && (
                            <Link href="/login">
                                <Button size="small" intent="primary">
                                    Login to participate
                                </Button>
                            </Link>
                        )}
                    </>
                )}
            </div>
            {bounty?.bountySubmissions?.length && bounty?.stripePriceId ? (
                <>
                    {/* @ts-expect-error Server Component */}
                    <BountySubmissionList
                        bountyId={bounty.id}
                        resolved={bounty.resolved}
                        bountyStripePriceId={bounty.stripePriceId}
                        bountySubmissions={bounty.bountySubmissions}
                    />
                </>
            ) : (
                <>
                    {/* @ts-expect-error Server Component */}
                    <BountySubmissionsEmpty bountyId={bountyId} />
                </>
            )}
        </>
    )
}
