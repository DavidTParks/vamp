import { redirect } from "next/navigation"

import GithubRepoList from "@/components/dashboard/github-repo-list"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { Headline } from "@/ui/headline"
import Link from "next/link"
import { Button } from "@/ui/button"
import { Icons } from "@/components/icons"
import { Skeleton } from "@/ui/skeleton"

export default async function SettingsPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions.pages.signIn)
    }

    return (
        <div className="max-w-lg mx-auto w-full">
            <div className="my-8">
                <Link href={`/dashboard`}>
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
                    text="To create a new Project, import an existing Git Repository."
                />
            </div>
            {/* @ts-expect-error Server Component */}
            <GithubRepoList />
        </div>
    )
}
