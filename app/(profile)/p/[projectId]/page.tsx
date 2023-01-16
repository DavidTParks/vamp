import { DashboardShell } from "@/components/dashboard/shell"
import { Icons } from "@/components/icons"
import BountyList from "@/components/project/bounty-list"
import { getBountiesForProject } from "@/lib/bounties"
import { db } from "@/lib/db"
import { getRepo } from "@/lib/github"
import { ExternalLink } from "@/ui/external-link"
import Image from "next/image"
import { notFound } from "next/navigation"

interface ProfilePageProps {
    params: { projectId: string }
    searchParams?: { page: string; search: string; sort: string }
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
            bounties: {
                where: {
                    NOT: [
                        {
                            deleted: true,
                        },
                    ],
                },
            },
        },
    })

    if (!project || !project?.githubRepo?.githubRepoId) {
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
        sort: searchParams?.sort ?? undefined,
        whereQuery: {
            published: true,
            deleted: false,
            title: {
                search: searchParams?.search,
            },
            projectId: params.projectId,
        },
    })

    return (
        <DashboardShell>
            <div className="mt-12">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    <div className="col-span-4 w-full space-y-8 lg:col-span-1">
                        <div className="w-full rounded-lg border border-raised-border p-4 py-6">
                            <div className="flex flex-col items-center">
                                <div className="relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full">
                                    <Image
                                        fill={true}
                                        alt="Project avatar"
                                        src={project.computedProjectImage}
                                    />
                                </div>
                                <div className="mt-8">
                                    <span className="inline-flex items-center gap-2 text-center text-xl font-bold text-brandtext-500">
                                        {project.name}{" "}
                                    </span>
                                </div>
                                <div className="mt-2">
                                    <span className="inline-flex items-center gap-2 text-brandtext-600">
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
                    <div className="col-span-4 w-full lg:col-span-3">
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
