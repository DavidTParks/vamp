import IssueList from "@/components/project/issue-list"
import IssueSearch from "@/components/project/issue-search"
import { getRepoIssues, preloadRepoIssues } from "@/lib/github"
import { getProject } from "@/lib/projects"
import { getCurrentUser } from "@/lib/session"
import { notFound, redirect } from "next/navigation"
import { db } from "@/lib/db"
import { getBountiesForProject } from "@/lib/bounties"
import BountyList from "@/components/project/bounty-list"
import { BountyMultiEditForm } from "@/components/project/bounty-multi-edit-form"
import { Headline } from "@/ui/headline"

interface ProjectPageProps {
    params: { projectId: string }
    searchParams: { bountyId: string[] }
}

export default async function EditMultiplePage({
    params,
    searchParams,
}: ProjectPageProps) {
    const bountyPromise = getBountiesForProject({
        whereQuery: {
            id: {
                in: searchParams.bountyId,
            },
        },
    })

    // console.log(searchParams.bountyId)
    return (
        <div>
            <div className="my-8">
                <Headline
                    heading="Edit Multiple Bounties"
                    text="Batch edit your bounties and bulk publish based on a price range you are comfortable with."
                />
            </div>
            <div className="w-full ">
                <BountyMultiEditForm
                    projectId={params.projectId}
                    bounties={searchParams.bountyId}
                />
            </div>

            <div className="mt-8 sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h3 className="text-xl font-semibold text-brandtext-500">
                        Bounties
                    </h3>
                </div>
            </div>
            <div className="mt-4">
                {/* @ts-expect-error Server Component */}
                <BountyList
                    showToolbar={false}
                    showControls={false}
                    bountyPromise={bountyPromise}
                    project={{
                        id: params.projectId,
                    }}
                ></BountyList>
            </div>
        </div>
    )
}
