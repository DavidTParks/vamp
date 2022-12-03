import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"
import { ProjectItem } from "@/components/dashboard/project-item"
import { DashboardShell } from "@/components/dashboard/shell"
import { authOptions } from "@/lib/auth"
import { preloadRepos } from "@/lib/github"
import { getProjectsForUser } from "@/lib/projects"
import { getCurrentUser } from "@/lib/session"
import { Button } from "@/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions.pages.signIn)
    }

    preloadRepos()

    const projectUsers = await getProjectsForUser(user.id)

    return (
        <DashboardShell>
            <div className="mt-12">
                {projectUsers?.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                            No projects created
                        </EmptyPlaceholder.Title>
                        <EmptyPlaceholder.Description>
                            You don't have any projects yet. Start posting
                            bounties.
                        </EmptyPlaceholder.Description>
                        <Link href={`/new`}>
                            <Button>New Project</Button>
                        </Link>
                    </EmptyPlaceholder>
                )}
            </div>
        </DashboardShell>
    )
}
