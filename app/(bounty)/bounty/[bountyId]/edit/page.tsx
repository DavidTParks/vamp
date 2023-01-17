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
        <div className="relative mx-auto flex min-h-screen flex-col">
            <header className=" sticky top-0 left-0 right-0 z-30 border-b border-palette-300 bg-appbg px-4 lg:px-8">
                <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
                    <div className="flex h-16 items-center justify-between">
                        <ProjectNav
                            project={{
                                image: bounty.project.image,
                                name: bounty.project.name,
                                id: bounty.project.id,
                            }}
                            items={dashboardConfig.mainNav}
                        />
                        <UserNav />
                    </div>
                </div>
            </header>
            <main className=" z-10 mt-12 px-4 lg:px-8">
                <div className="mx-auto flex w-full max-w-screen-xl flex-1 flex-col overflow-hidden px-2.5 md:px-20">
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
                </div>
            </main>
        </div>
    )
}
