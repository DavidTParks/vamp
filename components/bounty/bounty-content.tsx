import { BountyShare } from "@/components/bounty/bounty-share"
import { Icons } from "@/components/icons"
import { getBountyById } from "@/lib/bounties"
import { getRepo } from "@/lib/github"
import { Chip } from "@/ui/chip"
import { ExternalLink } from "@/ui/external-link"
import Document from "@tiptap/extension-document"
import Paragraph from "@tiptap/extension-paragraph"
import Text from "@tiptap/extension-text"
import { generateHTML } from "@tiptap/html"
import { JSONContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

interface TBountyContent {
    bountyId: string
}

export async function BountyContent({ bountyId }: TBountyContent) {
    const bounty = await getBountyById(bountyId)
    const repo = await getRepo(bounty.project.githubRepo.githubRepoId)

    return (
        <>
            <div className="text-brandtext-500 font-bold break-words text-2xl leading-8 sm:text-4xl">
                <h1>{bounty.title}</h1>
            </div>
            <div className="my-8 flex justify-between">
                <div className="inline-flex items-center gap-4">
                    {!bounty.resolved && <Chip intent="green">Open</Chip>}
                    {bounty.resolved && <Chip intent="purple">Resolved</Chip>}
                    <ExternalLink href={repo.html_url}>
                        <Chip
                            className="inline-flex gap-2 items-center"
                            intent="default"
                        >
                            <Icons.gitHub size={16} />
                            {bounty.project.name}
                        </Chip>
                    </ExternalLink>
                </div>
                <div className="relative">
                    <BountyShare
                        bounty={{
                            id: bounty.id,
                        }}
                    />
                </div>
            </div>

            <div
                className="prose prose-invert"
                dangerouslySetInnerHTML={{
                    __html: generateHTML(bounty.content as JSONContent, [
                        StarterKit,
                        Document,
                        Paragraph,
                        Text,
                        // other extensions …
                    ]),
                }}
            ></div>
        </>
    )
}
