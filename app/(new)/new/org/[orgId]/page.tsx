import { redirect } from "next/navigation"

import GithubRepoList from "@/components/dashboard/github-repo-list"
import { Icons } from "@/components/icons"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { Button } from "@/ui/button"
import { Headline } from "@/ui/headline"
import Link from "next/link"
import GithubOrgRepoList from "@/components/dashboard/github-org-repo-list"

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
        redirect(authOptions.pages.signIn)
    }

    return (
        <div className="max-w-lg mx-auto w-full">
            <div className="my-8">
                <Link href={`/new`}>
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
                    heading="Select a Github repository"
                    text="Import a Github Repository to get started posting bounties"
                />
            </div>
            {/* @ts-expect-error Server Component */}
            <GithubOrgRepoList orgId={params.orgId} />
        </div>
    )
}
