import { redirect } from "next/navigation"

import { ProjectCreateForm } from "@/components/dashboard/project-create-form"
import { Icons } from "@/components/icons"
import { authOptions } from "@/lib/auth"
import { getRepo } from "@/lib/github"
import { getCurrentUser } from "@/lib/session"
import { Button } from "@/ui/button"
import { Headline } from "@/ui/headline"
import Link from "next/link"

interface ImportPageProps {
    params: { repoId: number }
}

export default async function ImportRepoPage({ params }: ImportPageProps) {
    const user = await getCurrentUser()

    if (!user) {
        redirect(
            authOptions?.pages && authOptions?.pages?.signIn
                ? authOptions.pages.signIn
                : "/"
        )
    }

    const repo = await getRepo(params.repoId)

    return (
        <div className="max-w-lg mx-auto">
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
                    heading="Almost there!"
                    text="Please follow the steps to configure your Project and create it."
                />
                <Button
                    intent="secondary"
                    size="small"
                    className="mt-4 inline-flex gap-2"
                >
                    <Icons.gitHub size={16} />
                    <span className="max-w-xs truncate">{repo.full_name}</span>
                </Button>
            </div>
            <ProjectCreateForm repo={repo} user={user} />
        </div>
    )
}
