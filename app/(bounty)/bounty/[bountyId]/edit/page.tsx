import { redirect } from "next/navigation"

import Tiptap from "@/components/create/tiptap"
import { Icons } from "@/components/icons"
import { ProjectNav } from "@/components/project/project-nav"
import { UserNav } from "@/components/user-nav"
import { dashboardConfig } from "@/config/dashboard"
import { isBountyOwner } from "@/lib/bounties"
import { db } from "@/lib/db"
import { Button } from "@/ui/button"
import { Headline } from "@/ui/headline"
import Link from "next/link"
import { RadioGroup } from "@/ui/radio-group"

interface BountyEditPageProps {
    params: { projectId: string; bountyId: string }
}

export default async function CreatePage({ params }: BountyEditPageProps) {
    const isOwner = await isBountyOwner(params.bountyId)

    if (!isOwner) {
        redirect("/dashbaord")
    }

    const bounty = await db.bounty.findUnique({
        where: {
            id: params.bountyId,
        },
        include: {
            project: true,
        },
    })

    if (!bounty?.project) {
        redirect("/dashbaord")
    }

    return (
        <div className="mx-auto w-full max-w-2xl">
            <Link href={`/project/${bounty.project.id}`}>
                <Button
                    intent="tertiary"
                    className="mb-8 inline-flex items-center justify-start gap-2"
                    size="small"
                >
                    <Icons.chevronLeft size={16} />
                    Back
                </Button>
            </Link>
            <Headline
                heading="Edit bounty"
                text="Add context to the problem you are looking to solve for your project."
            />
            <div className="mt-8">
                <Tiptap
                    bounty={{
                        html: bounty.html,
                        bountyPriceMax: bounty.bountyPriceMax,
                        bountyPriceMin: bounty.bountyPriceMin,
                        bountyRange: bounty.bountyRange,
                        title: bounty.title,
                        id: bounty.id,
                        bountyPrice: bounty.bountyPrice,
                        content: bounty.content,
                        issue: bounty.githubIssue,
                        issueLink: bounty.issueLink,
                        published: bounty.published,
                    }}
                />
            </div>
        </div>
    )
}
