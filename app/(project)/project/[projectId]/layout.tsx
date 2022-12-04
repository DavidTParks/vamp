import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { ProjectCreateForm } from "@/components/dashboard/project-create-form"
import { UserAccountNav } from "@/components/dashboard/user-account-nav"
import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"
import { ProjectHeader } from "@/components/project/header"
import { ProjectSecondaryNav } from "@/components/project/secondary-nav"
import { getProject } from "@/lib/projects"
import { getRepoIssues, preloadRepoIssues } from "@/lib/github"

export default async function ProjectLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: { projectId: string }
}) {
    const user = await getCurrentUser()

    if (!user) {
        return notFound()
    }

    const project = await getProject(params.projectId)
    const githubIssues = await getRepoIssues(project.githubRepo.githubRepoId)

    return (
        <>
            <div className="mx-auto flex flex-col min-h-screen relative">
                <header className=" sticky top-0 left-0 right-0 z-30 border-b border-palette-300 bg-appbg px-4 lg:px-8">
                    <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
                        <div className="flex h-16 items-center justify-between">
                            <DashboardNav
                                user={{
                                    name: user.name,
                                    image: user.image,
                                    email: user.email,
                                }}
                                items={dashboardConfig.mainNav}
                            />
                            <UserAccountNav
                                user={{
                                    name: user.name,
                                    image: user.image,
                                    email: user.email,
                                }}
                            />
                        </div>
                        <ProjectSecondaryNav
                            githubIssues={githubIssues}
                            project={{
                                id: project.id,
                            }}
                        />
                    </div>
                </header>
                <div>
                    <div className="flex h-36 items-center border-b border-palette-300 bg-palette-400 z-10 relative px-4 lg:px-8">
                        <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20 undefined">
                            <div className="flex items-center justify-between">
                                <ProjectHeader user={user} />
                            </div>
                        </div>
                    </div>
                </div>
                <main className=" px-4 lg:px-8 z-10">
                    <div className="mx-auto max-w-screen-xl px-2.5 md:px-20 flex w-full flex-1 flex-col overflow-hidden">
                        {children}
                    </div>
                </main>
            </div>
        </>
    )
}
