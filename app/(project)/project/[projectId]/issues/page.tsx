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

    const nextPreloadPage = searchParams.page
        ? parseInt(searchParams.page) + 1
        : 2

    preloadRepoIssues(
        project.githubRepo.githubRepoId,
        nextPreloadPage,
        searchParams.search
    )

    return (
        <div>
            <div className="w-full border border-raised-border rounded-md flex justify-center items-center p-4 flex-col gap-2 my-8">
                <p className="text-brandtext-500 font-medium text-lg">
                    Import an existing Github issue
                </p>
                <p className="text-brandtext-600 text-sm">
                    Reference an open issue on your repository in a new bounty
                </p>
            </div>
            <IssueSearch
                project={{
                    id: project.id,
                }}
            />
            <IssueList
                page={searchParams.page}
                project={{
                    id: project.id,
                }}
                issues={issues}
            />
        </div>
    )
}
