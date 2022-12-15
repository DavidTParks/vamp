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

    const repo = await getRepo(bounty.project.githubRepo.githubRepoId)
    const githubIssue = bounty.githubIssue as any

    return (
        <div className="border border-raised-border rounded-lg col-span-4">
            <div className="p-4 border-b border-raised-border">
                <p className="text-brandtext-500 font-bold text-lg">
                    Information
                </p>
            </div>
            <div className="w-full justify-between text-brandtext-500 p-4 space-y-4 flex flex-col overflow-hidden">
                <KeyValue
                    label="Bounty"
                    value={formatDollars(bounty.bountyPrice)}
                />
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
                                href={bounty.issueLink}
                                className="truncate  max-w-[48px]"
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
