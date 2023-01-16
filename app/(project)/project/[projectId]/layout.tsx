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
            <div className="relative mx-auto flex min-h-screen flex-col">
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
                    <div className="relative z-10 flex h-36 items-center border-b border-palette-300 bg-palette-400 px-4 lg:px-8">
                        <div className="undefined mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
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
                <main className=" z-10 px-4 lg:px-8">
                    <div className="mx-auto flex w-full max-w-screen-xl flex-1 flex-col overflow-hidden px-2.5 md:px-20">
                        {children}
                    </div>
                </main>
            </div>
        </>
    )
}
