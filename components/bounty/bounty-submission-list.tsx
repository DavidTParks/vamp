import { isBountyOwner } from "@/lib/bounties"
import { formatDate } from "@/lib/utils"
import { Button } from "@/ui/button"
import { Chip } from "@/ui/chip"
import { ExternalLink } from "@/ui/external-link"
import { BountySubmission, User } from "@prisma/client"
import Image from "next/image"
import { BountyPayoutButton } from "./bounty-payout-button"

interface MainNavProps {
    bountyId: string
    resolved: boolean
    bountyStripePriceId: string
    bountySubmissions: (BountySubmission & {
        user: User
    })[]
}

export async function BountySubmissionList({
    resolved,
    bountySubmissions,
    bountyStripePriceId,
    bountyId,
}: MainNavProps) {
    const isOwner = await isBountyOwner(bountyId)

    return (
        <div className="border border-raised-border rounded-lg col-span-4">
            <div className="p-4 border-b border-raised-border">
                <p className="text-brandtext-500 font-bold text-lg">
                    Submissions ({bountySubmissions?.length})
                </p>
            </div>
            <div className="divide-y divide-raised-border flex flex-col">
                {bountySubmissions.map((submission) => (
                    <div
                        key={submission.id}
                        className="text-brandtext-500 gap-4 p-4 flex flex-col"
                    >
                        <div className="flex justify-between items-center">
                            <div className="inline-flex items-center gap-4">
                                <div className="h-8 w-8 rounded-full overflow-hidden inline-flex items-center justify-center relative">
                                    {submission?.user?.image && (
                                        <Image
                                            fill={true}
                                            alt={`${submission.user.name} profile picture`}
                                            src={submission.user.image}
                                        />
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-brandtext-500 font-bold text-sm">
                                        {submission.user.name}
                                    </span>
                                    <span className="text-sm text-brandtext-600">
                                        {formatDate(
                                            submission.createdAt.toString()
                                        )}
                                    </span>
                                </div>
                            </div>
                            {!submission.accepted && <Chip>Pending</Chip>}
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
                        <div className="flex gap-4 items-center">
                            {!resolved &&
                                isOwner &&
                                submission?.user?.stripeCustomerId && (
                                    <BountyPayoutButton
                                        bountyId={submission.bountyId}
                                        submissionId={submission.id}
                                        bountyStripePriceId={
                                            bountyStripePriceId
                                        }
                                        stripeUserId={
                                            submission.user.stripeCustomerId
                                        }
                                    />
                                )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
