import { BountyShare } from "@/components/bounty/bounty-share"
import { Icons } from "@/components/icons"
import { getBountyById } from "@/lib/bounties"
import { getRepo } from "@/lib/github"
import { Chip } from "@/ui/chip"
import { ExternalLink } from "@/ui/external-link"
import { generateHTML } from "@tiptap/html"
import { JSONContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
interface TBountyContent {
    bountyId: string
}

export async function BountyContent({ bountyId }: TBountyContent) {
    const bounty = await getBountyById(bountyId)

    if (!bounty || !bounty?.project?.githubRepo?.githubRepoId) {
        return null
    }

    const repo = await getRepo(bounty.project.githubRepo.githubRepoId)

    return (
        <>
            <div className="break-words text-2xl font-bold leading-8 text-brandtext-500 sm:text-4xl">
                <h1>{bounty.title}</h1>
            </div>
            <div className="my-8 flex justify-between">
                <div className="inline-flex items-center gap-4">
                    {!bounty.resolved && <Chip intent="green">Open</Chip>}
                    {bounty.resolved && <Chip intent="default">Resolved</Chip>}
                    <ExternalLink className="" href={repo.html_url}>
                        <Chip
                            className="inline-flex max-w-[204px] items-center gap-2 overflow-hidden"
                            intent="default"
                        >
                            <Icons.gitHub className="flex-shrink-0" size={16} />
                            <span className="truncate">Github Repository</span>
                        </Chip>
                    </ExternalLink>
                </div>
                <div className="relative">
                    <BountyShare
                        bounty={{
                            id: bounty.id,
                            title: bounty.title,
                        }}
                    />
                </div>
            </div>

            <div
                className="prose prose-invert"
                dangerouslySetInnerHTML={{
                    __html: generateHTML(bounty.content as JSONContent, [
                        StarterKit,
                    ]),
                }}
            ></div>
        </>
    )
}
