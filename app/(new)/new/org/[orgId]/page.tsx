import { redirect } from "next/navigation"

import GithubOrgRepoList from "@/components/dashboard/github-org-repo-list"
import { Icons } from "@/components/icons"
import { getCurrentUser } from "@/lib/session"
import { Button } from "@/ui/button"
import { Headline } from "@/ui/headline"
import Link from "next/link"

interface OrgRepoPageProps {
    params: { orgId: string }
    searchParams: { id: string }
}

export default async function OrgRepoPage({
    params,
    searchParams,
}: OrgRepoPageProps) {
    const user = await getCurrentUser()

    if (!user) {
        redirect("/login")
    }

    return (
        <div className="mx-auto w-full max-w-lg">
            <div className="my-8">
                <Link href={`/new`}>
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
                    heading="Select a Github repository"
                    text="Import a Github Repository to get started posting bounties"
                />
            </div>
            {/* @ts-expect-error Server Component */}
            <GithubOrgRepoList orgId={params.orgId} />
        </div>
    )
}
