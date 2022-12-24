import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"
import { DashboardShell } from "@/components/dashboard/shell"
import { BountyCreateButton } from "@/components/project/bounty-create-button"
import BountyList from "@/components/project/bounty-list"
import { authOptions } from "@/lib/auth"
import { getBountiesForProject } from "@/lib/bounties"
import { getProject } from "@/lib/projects"
import { getCurrentUser } from "@/lib/session"
import { Headline } from "@/ui/headline"
import { notFound, redirect } from "next/navigation"
import Image from "next/image"
import { BrowseBountyList } from "@/components/browse/bounty-list"
import Link from "next/link"
import { Icons } from "@/components/icons"
import { Button } from "@/ui/button"
import { BountySearch } from "@/components/browse/bounty-search"
import { db } from "@/lib/db"
import { getRepo } from "@/lib/github"
import { ExternalLink } from "@/ui/external-link"
import { Chip } from "@/ui/chip"

interface ProfilePageProps {
    params: { projectId: string }
    searchParams: { page: string; search: string; sort: string }
}

export default async function ProjectPage({
    params,
    searchParams,
}: ProfilePageProps) {
    const project = await db.project.findUnique({
        where: {
            id: params.projectId,
        },
        include: {
            users: {
                include: {
                    user: true,
                },
            },
            githubRepo: true,
            bounties: true,
        },
    })

    if (!project) {
        notFound()
    }

    const repo = await getRepo(project.githubRepo.githubRepoId)
    const pageSize = 10

    const skip = searchParams?.page
        ? (parseInt(searchParams.page) - 1) * pageSize
        : 0

    const bountyPromise = getBountiesForProject({
        pageSize,
        skip,
        sort: searchParams?.sort,
        whereQuery: {
            published: true,
            title: {
                search: searchParams.search,
            },
            projectId: params.projectId,
        },
    })

    return (
        <DashboardShell>
            <div className="mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="w-full space-y-8 col-span-4 lg:col-span-1">
                        <div className="border border-raised-border rounded-lg p-4 py-6 w-full">
                            <div className="flex flex-col items-center">
                                <div className="h-16 w-16 rounded-full overflow-hidden inline-flex items-center justify-center relative">
                                    <Image
                                        fill={true}
                                        alt="Project avatar"
                                        src={`https://avatar.vercel.sh/${project.name}${project.id}`}
                                    />
                                </div>
                                <div className="mt-8">
                                    <span className="text-brandtext-500 font-bold text-xl inline-flex gap-2 items-center text-center">
                                        {project.name}{" "}
                                    </span>
                                </div>
                                <div className="mt-2">
                                    <span className="text-brandtext-600 inline-flex gap-2 items-center">
                                        {project.bounties.length} Bounties
                                    </span>
                                </div>
                                <div className="mt-4 flex justify-center gap-4">
                                    <ExternalLink
                                        className="text-brandtext-600 hover:text-white"
                                        href={repo.html_url}
                                    >
                                        <Icons.gitHub
                                            className="flex-shrink-0"
                                            size={24}
                                        />
                                    </ExternalLink>
                                </div>
                                {/* <div>
                                    <p>Owners</p>
                                    <img
                                        alt={`${repo.name} contributors`}
                                        src={`https://contrib.rocks/image?repo=${repo.full_name}`}
                                    />
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="w-full col-span-4 lg:col-span-3">
                        {/* @ts-expect-error Server Component */}
                        <BountyList
                            bountyPromise={bountyPromise}
                            showControls={false}
                            showDrafts={false}
                            project={{
                                id: project.id,
                            }}
                        />
                    </div>
                </div>
            </div>
        </DashboardShell>
    )
}
