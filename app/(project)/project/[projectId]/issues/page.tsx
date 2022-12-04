import { notFound, redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { getProject } from "@/lib/projects"
import { getCurrentUser } from "@/lib/session"
import { getRepo, getRepoIssues } from "@/lib/github"
interface ProjectPageProps {
    params: { projectId: string }
    searchParams: { id: string }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions.pages.signIn)
    }

    const project = await getProject(params.projectId)
    const issues = await getRepoIssues(project.githubRepo.githubRepoId)

    if (!project) {
        notFound()
    }

    return <div>{JSON.stringify(issues)}</div>
}
