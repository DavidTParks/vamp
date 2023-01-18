import { UserAvatar } from "@/components/dashboard/user-avatar"
import {
    fetchSubmissionsPaginated,
    getBountyById,
    isBountyOwner,
} from "@/lib/bounties"
import { formatDate } from "@/lib/utils"
import { Chip } from "@/ui/chip"
import { ExternalLink } from "@/ui/external-link"
import Link from "next/link"
import { BountyPayoutButton } from "./bounty-payout-button"
import { BountySubmissionsLoadMore } from "./bounty-submissions-load-more"
interface MainNavProps {
    bountyId: string
    resolved: boolean
    bountyStripePriceId: string
    cursor?: string
}

export async function BountySubmissionList({
    resolved,
    bountyStripePriceId,
    bountyId,
    cursor,
}: MainNavProps) {
    const bounty = await getBountyById(bountyId)
    const isOwner = await isBountyOwner(bountyId)

    return (
        <>
            <div className="col-span-4 rounded-lg border border-raised-border">
                <div className="border-b border-raised-border p-4">
                    <p className="text-lg font-bold text-brandtext-500">
                        Submissions ({bounty?.bountySubmissions?.length})
                    </p>
                </div>
                <div className="flex flex-col divide-y divide-raised-border">
                    {bounty?.bountySubmissions.map((submission) => (
                        <div
                            key={submission.id}
                            className="flex flex-col gap-4 p-4 text-brandtext-500"
                        >
                            <div className="flex items-center justify-between">
                                <div className="inline-flex items-center gap-4">
                                    <div className="relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
                                        <UserAvatar
                                            user={{
                                                id: submission.user.id,
                                                name: submission.user.name,
                                            }}
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <Link href={`/u/${submission.user.id}`}>
                                            <span className="text-sm font-bold text-brandtext-500">
                                                {submission.user.name}
                                            </span>
                                        </Link>

                                        <span className="text-sm text-brandtext-600">
                                            {formatDate(
                                                submission.createdAt.toString()
                                            )}
                                        </span>
                                    </div>
                                </div>
                                {!submission.accepted && !bounty?.resolved && (
                                    <Chip>Pending</Chip>
                                )}
                                {submission.accepted && (
                                    <Chip intent="green">Accepted</Chip>
                                )}
                            </div>
                            <ExternalLink
                                className="text-rose-500"
                                href={submission?.solutionLink ?? "#"}
                            >
                                {submission.solutionLink}
                            </ExternalLink>
                            <div className="text-sm text-brandtext-500">
                                {submission.comments}{" "}
                            </div>
                            <div className="flex items-center gap-4">
                                {!resolved &&
                                    isOwner &&
                                    submission?.user?.stripeCustomerId && (
                                        <BountyPayoutButton
                                            computedBountyPrice={
                                                bounty?.computedBountyPrice
                                            }
                                            bountyRange={bounty?.bountyRange}
                                            bountyPriceMax={
                                                bounty?.bountyPriceMax
                                            }
                                            bountyPriceMin={
                                                bounty?.bountyPriceMin
                                            }
                                            bountyId={submission.bountyId}
                                            submissionId={submission.id}
                                            bountyStripePriceId={
                                                bountyStripePriceId
                                            }
                                            stripeUserId={
                                                submission.user.stripeCustomerId
                                            }
                                            bountySubmissionUserId={
                                                submission.user.id
                                            }
                                        />
                                    )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
