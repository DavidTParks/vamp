import { notFound, redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { getProject } from "@/lib/projects"
import { getCurrentUser } from "@/lib/session"
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

    if (!project) {
        notFound()
    }

    return <div>ISSUES</div>
}
