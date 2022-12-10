import { redirect } from "next/navigation"

import { BountySubmissionList } from "@/components/bounty/bounty-submission-list"
import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"
import { UserAccountNav } from "@/components/dashboard/user-account-nav"
import { Icons } from "@/components/icons"
import { ProjectNav } from "@/components/project/project-nav"
import { SubmissionCreateButton } from "@/components/project/submission-create-button"
import { dashboardConfig } from "@/config/dashboard"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getRepo } from "@/lib/github"
import { getCurrentUser } from "@/lib/session"
import { formatDate, formatDollars } from "@/lib/utils"
import { Button } from "@/ui/button"
import { Chip } from "@/ui/chip"
import { ExternalLink } from "@/ui/external-link"
import { KeyValue } from "@/ui/keyvalue"
import Document from "@tiptap/extension-document"
import Paragraph from "@tiptap/extension-paragraph"
import Text from "@tiptap/extension-text"
import { generateHTML } from "@tiptap/html"
import { JSONContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "next/link"
import { BountyShare } from "@/components/bounty/bounty-share"

interface ProjectPageProps {
    params: { projectId: string; bountyId: string }
    searchParams: { id: string }
}

export default async function CreatePage({
    params,
    searchParams,
}: ProjectPageProps) {
    const user = await getCurrentUser()

    const bounty = await db.bounty.findUnique({
        where: {
            id: params.bountyId,
        },
        include: {
            project: {
                include: {
                    githubRepo: true,
                },
            },
            bountySubmissions: {
                include: {
                    user: true,
                },
            },
        },
    })
    const repo = await getRepo(bounty.project.githubRepo.githubRepoId)
    const githubIssue = bounty.githubIssue as any

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
                        {user ? (
                            <UserAccountNav
                                user={{
                                    name: user.name,
                                    image: user.image,
                                    email: user.email,
                                }}
                            />
                        ) : (
                            <Link href="/login">
                                <Button intent="primary" borderRadius="full">
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </header>
            <main className=" px-4 lg:px-8 z-10 mt-12">
                <div className="mx-auto max-w-screen-xl px-2.5 flex w-full flex-1 flex-col overflow-hidden">
                    <div className="max-w-[1012px] mx-auto w-full">
                        <div className="lg:flex">
                            <div className="relative w-full lg:w-8/12 lg:pr-5">
                                {/* <Link href={`/project/${bounty.project.id}`}>
                                    <Button
                                        intent="tertiary"
                                        className="inline-flex items-center justify-start gap-2 mb-8"
                                        size="small"
                                    >
                                        <Icons.chevronLeft size={16} />
                                        Back
                                    </Button>
                                </Link> */}
                                <div className="text-brandtext-500 font-bold break-words text-2xl leading-8 sm:text-4xl">
                                    <h1>{bounty.title}</h1>
                                </div>
                                <div className="my-8 flex justify-between">
                                    <div className="inline-flex items-center gap-4">
                                        {!bounty.resolved && (
                                            <Chip intent="green">Open</Chip>
                                        )}
                                        {bounty.resolved && (
                                            <Chip intent="purple">
                                                Resolved
                                            </Chip>
                                        )}
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
                                        __html: generateHTML(
                                            bounty.content as JSONContent,
                                            [
                                                StarterKit,
                                                Document,
                                                Paragraph,
                                                Text,
                                                // other extensions …
                                            ]
                                        ),
                                    }}
                                ></div>
                                <div className="mt-24 flex flex-col">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-brandtext-500 text-2xl font-bold">
                                            Activity
                                        </h3>
                                        {bounty.bountySubmissions?.length &&
                                        !bounty.resolved ? (
                                            <SubmissionCreateButton
                                                size="small"
                                                bounty={{
                                                    id: bounty.id,
                                                    title: bounty.title,
                                                }}
                                            />
                                        ) : null}
                                    </div>
                                    {bounty.bountySubmissions?.length ? (
                                        <BountySubmissionList
                                            resolved={bounty.resolved}
                                            bountyStripePriceId={
                                                bounty.stripePriceId
                                            }
                                            bountySubmissions={
                                                bounty.bountySubmissions
                                            }
                                        />
                                    ) : (
                                        <EmptyPlaceholder className="min-h-[200px]">
                                            <EmptyPlaceholder.Icon name="frown" />
                                            <EmptyPlaceholder.Title>
                                                No submissions yet!
                                            </EmptyPlaceholder.Title>
                                            <EmptyPlaceholder.Description>
                                                Be the first to submit a
                                                solution to this bug bounty. If
                                                accepted by the project owners,
                                                you get paid!
                                            </EmptyPlaceholder.Description>
                                            {!user ? (
                                                <Link href="/login">
                                                    <Button intent="primary">
                                                        Login to contribute
                                                    </Button>
                                                </Link>
                                            ) : (
                                                <SubmissionCreateButton
                                                    bounty={{
                                                        id: bounty.id,
                                                        title: bounty.title,
                                                    }}
                                                />
                                            )}
                                        </EmptyPlaceholder>
                                    )}
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 lg:min-w-[321px] mt-12 sm:mt-0">
                                <div className="border border-raised-border rounded-lg col-span-4">
                                    <div className="p-4 border-b border-raised-border">
                                        <p className="text-brandtext-500 font-bold text-lg">
                                            Information
                                        </p>
                                    </div>
                                    <div className="w-full justify-between text-brandtext-500 p-4 space-y-4 flex flex-col overflow-hidden">
                                        <KeyValue
                                            label="Project"
                                            value={
                                                <div className="max-w-[156px] truncate overflow-hidden">
                                                    <ExternalLink
                                                        className="inline-flex gap-2 items-center"
                                                        href={repo.html_url}
                                                    >
                                                        Github
                                                        <Icons.link size={16} />
                                                    </ExternalLink>
                                                </div>
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
                                                        Issue #
                                                        {githubIssue.number}
                                                    </ExternalLink>
                                                }
                                            />
                                        )}
                                        <KeyValue
                                            label="Opened"
                                            value={formatDate(
                                                bounty.project.createdAt?.toString()
                                            )}
                                        />
                                        <KeyValue
                                            label="Bounty"
                                            value={formatDollars(
                                                bounty.bountyPrice
                                            )}
                                        />
                                        <KeyValue
                                            label="Status"
                                            value={
                                                <>
                                                    {!bounty.resolved && (
                                                        <>Open</>
                                                    )}
                                                    {bounty.resolved && (
                                                        <>Resolved</>
                                                    )}
                                                </>
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
