import { notFound, redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { getProject } from "@/lib/projects"
import { getCurrentUser } from "@/lib/session"
import { preloadRepoIssues } from "@/lib/github"
import { DashboardShell } from "@/components/dashboard/shell"
import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"
import Link from "next/link"
import { Button } from "@/ui/button"
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

    return (
        <DashboardShell>
            <div className="mt-12">
                {project.bounties?.length ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                        {projectUsers.map((projectUser) => (
                            <ProjectItem
                                projectUser={projectUser}
                                key={projectUser.id}
                            />
                        ))}
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
                        <Link href={`/create`}>
                            <Button>New Bounty</Button>
                        </Link>
                    </EmptyPlaceholder>
                )}
            </div>
        </DashboardShell>
    )
}
