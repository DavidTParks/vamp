import { notFound, redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { getProject } from "@/lib/projects"
import { getCurrentUser } from "@/lib/session"
import { preloadRepoIssues } from "@/lib/github"
import { DashboardShell } from "@/components/dashboard/shell"
import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"
import Link from "next/link"
import { Button } from "@/ui/button"
import { getBountiesForProject } from "@/lib/bounties"
interface ProjectPageProps {
    params: { projectId: string }
    searchParams: { id: string }
}

export default async function ProjectPage({
    params,
    searchParams,
}: ProjectPageProps) {
    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions.pages.signIn)
    }

    const project = await getProject(params.projectId)

    if (!project) {
        notFound()
    }

    const bounties = await getBountiesForProject(project.id)

    return (
        <DashboardShell>
            <div className="mt-12">
                {bounties.length ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                        Bounties
                    </div>
                ) : (
                    <EmptyPlaceholder>
                        <EmptyPlaceholder.Icon name="logo" />
                        <EmptyPlaceholder.Title>
                            No bounties created
                        </EmptyPlaceholder.Title>
                        <EmptyPlaceholder.Description>
                            You don't have any feature requests or issue
                            bounties yet. Create one and reward contributors!
                        </EmptyPlaceholder.Description>
                        <Link href={`/project/${project.id}/create`}>
                            <Button>New Bounty</Button>
                        </Link>
                    </EmptyPlaceholder>
                )}
            </div>
        </DashboardShell>
    )
}
