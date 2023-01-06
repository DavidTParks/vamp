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

    return (
        <div className="mx-auto flex flex-col min-h-screen relative">
            <header className=" sticky top-0 left-0 right-0 z-30 border-b border-palette-300 bg-appbg px-4 lg:px-8">
                <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
                    <div className="flex h-16 items-center justify-between">
                        <ProjectNav
                            project={{
                                name: bounty.project.name,
                                id: bounty.project.id,
                            }}
                            items={dashboardConfig.mainNav}
                        />
                        <UserNav />
                    </div>
                </div>
            </header>
            <main className=" px-4 lg:px-8 z-10 mt-12">
                <div className="mx-auto max-w-screen-xl px-2.5 md:px-20 flex w-full flex-1 flex-col overflow-hidden">
                    <div className="max-w-2xl mx-auto w-full">
                        <Link href={`/project/${bounty.project.id}`}>
                            <Button
                                intent="tertiary"
                                className="inline-flex items-center justify-start gap-2 mb-8"
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
