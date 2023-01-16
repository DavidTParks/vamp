import { getBountyById } from "@/lib/bounties"
import { getRepo } from "@/lib/github"
import { formatDate, formatDollars } from "@/lib/utils"
import { ExternalLink } from "@/ui/external-link"
import { KeyValue } from "@/ui/keyvalue"
import { Icons } from "../icons"
interface TBountyInfoBox {
    bountyId: string
}

export async function BountyInfoBox({ bountyId }: TBountyInfoBox) {
    const bounty = await getBountyById(bountyId)

    if (!bounty) return null

    const githubIssue = bounty?.githubIssue as any

    return (
        <div className="col-span-4 rounded-lg border border-raised-border">
            <div className="border-b border-raised-border p-4">
                <p className="text-lg font-bold text-brandtext-500">
                    Information
                </p>
            </div>
            <div className="flex w-full flex-col justify-between space-y-4 overflow-hidden p-4 text-brandtext-500">
                <KeyValue label="Bounty" value={bounty.computedBountyPrice} />

                <KeyValue
                    label="Posted"
                    value={formatDate(bounty.project.createdAt?.toString())}
                />
                <KeyValue
                    label="Status"
                    value={
                        <>
                            {!bounty.resolved && <>Open</>}
                            {bounty.resolved && <>Resolved</>}
                        </>
                    }
                />
                {githubIssue && githubIssue?.number && (
                    <KeyValue
                        label="Github Issue"
                        value={
                            <ExternalLink
                                href={bounty?.issueLink ?? ""}
                                className="max-w-[48px]  truncate"
                            >
                                Issue #{githubIssue.number}
                            </ExternalLink>
                        }
                    />
                )}
            </div>
        </div>
    )
}
