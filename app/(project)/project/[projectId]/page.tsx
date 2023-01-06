import { BountySearch } from "@/components/browse/bounty-search"
import { DashboardShell } from "@/components/dashboard/shell"
import BountyList from "@/components/project/bounty-list"
import { TProject } from "@/components/project/secondary-nav"
import { authOptions } from "@/lib/auth"
import { getBountiesForProject, getBountyCount } from "@/lib/bounties"
import { getProject } from "@/lib/projects"
import { getCurrentUser } from "@/lib/session"
import { Headline } from "@/ui/headline"
import { Pagination } from "@/ui/pagination"
import { notFound, redirect } from "next/navigation"

interface ProjectPageProps {
    params: { projectId: string }
    searchParams?: { page: string; search: string; sort: string }
}

export default async function ProjectPage({
    params,
    searchParams,
}: ProjectPageProps) {
    const pageSize = 10

    const user = await getCurrentUser()

    if (!user) {
        redirect(
            authOptions?.pages && authOptions?.pages?.signIn
                ? authOptions.pages.signIn
                : "/"
        )
    }

    const project = await getProject(params.projectId)

    if (!project) {
        notFound()
    }

    const skip = searchParams?.page
        ? (parseInt(searchParams.page) - 1) * pageSize
        : 0

    const bountyPromise = getBountiesForProject({
        pageSize,
        skip,
        sort: searchParams?.sort,
        whereQuery: {
            title: {
                search: searchParams?.search,
            },
            projectId: params.projectId,
        },
    })

    // Used to track pagination, find total count of this particular query
    const bountyCount = getBountyCount({
        whereQuery: {
            title: {
                search: searchParams?.search,
            },
            projectId: params.projectId,
        },
    })

    return (
        <DashboardShell>
            <div className="mt-12">
                <div className="mb-8">
                    <Headline
                        heading="Bounties"
                        text="To create a new Bounty, import one from an existing Github issue or create one."
                    />
                </div>
                <>
                    <BountySearch baseUrl={`/project/${project.id}`} />
                    <div className="mt-4">
                        {/* @ts-expect-error Server Component */}
                        <BountyList
                            bountyPromise={bountyPromise}
                            project={{
                                id: project.id,
                            }}
                        ></BountyList>
                        {/* @ts-expect-error Server Component */}
                        <BountyPaginationWrapper
                            promise={bountyCount}
                            pageSize={pageSize}
                            project={{
                                id: project.id,
                            }}
                        />
                    </div>
                </>
            </div>
        </DashboardShell>
    )
}

type TBountyPaginationWrapper = {
    promise: Promise<number>
    pageSize: number
    project: TProject
}

async function BountyPaginationWrapper({
    promise,
    pageSize,
    project,
}: TBountyPaginationWrapper) {
    const bountyCount = await promise
    return (
        <>
            {bountyCount > pageSize && (
                <div className="mt-8">
                    <Pagination
                        baseUrl={`/project/${project.id}`}
                        pageSize={pageSize}
                        itemCount={bountyCount}
                    />
                </div>
            )}
        </>
    )
}
