import { UserAccountNav } from "@/components/dashboard/user-account-nav"
import { ProjectHeader } from "@/components/project/header"
import { ProjectNav } from "@/components/project/project-nav"
import { ProjectSecondaryNav } from "@/components/project/secondary-nav"
import { UserNav } from "@/components/user-nav"
import { dashboardConfig } from "@/config/dashboard"
import { getRepoIssues } from "@/lib/github"
import { getProject, isProjectOwner } from "@/lib/projects"
import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"

export default async function ProjectLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: { projectId: string }
}) {
    const isOwner = await isProjectOwner(params.projectId)

    if (!isOwner) {
        return notFound()
    }

    const [project] = await Promise.all([getProject(params.projectId)])

    if (!project || !project?.githubRepo?.githubRepoId) {
        return notFound()
    }

    const githubIssues = await getRepoIssues(
        project.githubRepo.githubRepoId,
        1,
        null
    )

    return (
        <>
            <div className="mx-auto flex flex-col min-h-screen relative">
                <header className=" sticky top-0 left-0 right-0 z-30 border-b border-palette-300 bg-appbg px-4 lg:px-8">
                    <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
                        <div className="flex h-16 items-center justify-between">
                            <ProjectNav
                                project={{
                                    name: project.name,
                                    id: project.id,
                                    image: project.image,
                                }}
                                items={dashboardConfig.mainNav}
                            />
                            <UserNav />
                        </div>
                        <ProjectSecondaryNav
                            issueCount={githubIssues.total_count}
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
                                <ProjectHeader
                                    project={{
                                        id: project.id,
                                    }}
                                />
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
