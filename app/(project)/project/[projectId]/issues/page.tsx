import IssueList from "@/components/project/issue-list"
import IssueSearch from "@/components/project/issue-search"
import { getRepoIssues, preloadRepoIssues } from "@/lib/github"
import { getProject } from "@/lib/projects"
import { getCurrentUser } from "@/lib/session"
import { notFound, redirect } from "next/navigation"
interface ProjectPageProps {
    params: { projectId: string }
    searchParams: { id: string; page: string; search: string }
}

export default async function ProjectPage({
    params,
    searchParams,
}: ProjectPageProps) {
    const user = await getCurrentUser()

    if (!user) {
        redirect("/login")
    }

    const project = await getProject(params.projectId)

    if (!project || !project?.githubRepo?.githubRepoId) {
        return notFound()
    }

    const issues = await getRepoIssues(
        project.githubRepo.githubRepoId,
        searchParams.page ?? "1",
        searchParams.search
    )

    return (
        <div>
            <div className="my-8 flex w-full flex-col items-center justify-center gap-2 rounded-md border border-raised-border p-4">
                <p className="text-lg font-medium text-brandtext-500">
                    Import an existing Github issue
                </p>
                <p className="text-sm text-brandtext-600">
                    Reference an open issue on your repository in a new bounty
                </p>
            </div>
            <IssueSearch
                project={{
                    id: project.id,
                }}
            />
            <div className="mt-6">
                <IssueList
                    page={searchParams.page}
                    project={{
                        id: project.id,
                    }}
                    issues={issues}
                />
            </div>
        </div>
    )
}
