import { redirect } from "next/navigation"

import { ProjectCreateForm } from "@/components/dashboard/project-create-form"
import { Icons } from "@/components/icons"
import { getRepo } from "@/lib/github"
import { getCurrentUser } from "@/lib/session"
import { Button } from "@/ui/button"
import { Headline } from "@/ui/headline"
import Link from "next/link"
import { Chip } from "@/ui/chip"

interface ImportPageProps {
    params: { repoId: number }
}

export default async function ImportRepoPage({ params }: ImportPageProps) {
    const user = await getCurrentUser()

    if (!user) {
        redirect("/login")
    }

    const repo = await getRepo(params.repoId)

    return (
        <div className="mx-auto max-w-lg">
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
                    heading="Almost there!"
                    text="Please follow the steps to configure your Project and create it."
                />
                <Chip className="mt-4 inline-flex gap-2">
                    <Icons.gitHub size={16} />
                    <span className="max-w-xs truncate">{repo.full_name}</span>
                </Chip>
            </div>
            <ProjectCreateForm repo={repo} user={user} />
        </div>
    )
}
