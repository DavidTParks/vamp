import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"
import GithubRepoList from "@/components/dashboard/github-repo-list"
import { ProjectCreateButton } from "@/components/dashboard/project-create-button"
import { DashboardShell } from "@/components/dashboard/shell"
import { authOptions } from "@/lib/auth"
import { preloadRepos } from "@/lib/github"
import { getProjectsForUser } from "@/lib/projects"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import project from "pages/api/project"
import { Button } from "@/ui/button"
import Link from "next/link"
import Avvvatars from "avvvatars-react"
import Image from "next/image"
import { Icons } from "@/components/icons"
import { ProjectOperations } from "@/components/dashboard/project-operations"

export default async function DashboardPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions.pages.signIn)
    }

    preloadRepos()

    const projectUsers = await getProjectsForUser(user.id)

    console.log("Project users", projectUsers)
    return (
        <DashboardShell>
            <div className="mt-12">
                {projectUsers?.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projectUsers.map((projectUser) => (
                            <div key={projectUser.id} className="relative ">
                                <div className="block bg-palette-400 border border-palette-300 shadow-lg rounded-lg overflow-hidden h-full transition-all duration-150 ease hover:border-brandtext-500">
                                    <div className="p-4 h-full flex flex-col">
                                        <div className="flex items-center w-full justify-between h-full">
                                            <div className="flex items-center gap-4">
                                                <div className="h-8 w-8 rounded-full overflow-hidden inline-flex items-center justify-center relative">
                                                    <Image
                                                        fill={true}
                                                        alt="Avatar"
                                                        src={`https://avatar.vercel.sh/${projectUser.project.id}`}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <Link
                                                        href={`/project/${projectUser.project.id}`}
                                                        className="hover:underline"
                                                    >
                                                        <span className="text-white font-medium hover:underline">
                                                            {
                                                                projectUser
                                                                    .project
                                                                    .name
                                                            }
                                                        </span>
                                                    </Link>
                                                    <span className="text-brandtext-600 text-sm">
                                                        {
                                                            projectUser.project
                                                                .users.length
                                                        }{" "}
                                                        Team{" "}
                                                        {projectUser.project
                                                            .users.length === 1
                                                            ? "Member"
                                                            : "Members"}
                                                    </span>
                                                </div>
                                            </div>

                                            <ProjectOperations
                                                project={{
                                                    id: projectUser.project.id,
                                                    name: projectUser.project
                                                        .name,
                                                }}
                                            />
                                        </div>
                                        <div className="mt-6 w-full">
                                            <Button
                                                fullWidth={true}
                                                intent="secondary"
                                                size="small"
                                            >
                                                <p className="text-brandtext-400 text-sm inline-flex items-center gap-2">
                                                    <Icons.gitHub size={16} />
                                                    Connect Github repository
                                                </p>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyPlaceholder>
                        <EmptyPlaceholder.Icon name="post" />
                        <EmptyPlaceholder.Title>
                            No projects created
                        </EmptyPlaceholder.Title>
                        <EmptyPlaceholder.Description>
                            You don't have any projects yet. Start posting
                            bounties.
                        </EmptyPlaceholder.Description>
                        <ProjectCreateButton user={user} />
                    </EmptyPlaceholder>
                )}
            </div>
        </DashboardShell>
    )
}
