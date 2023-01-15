import { notFound, redirect } from "next/navigation"

import { DashboardShell } from "@/components/dashboard/shell"
import { ProjectNameForm } from "@/components/project/settings/project-name-form"
import { getProject } from "@/lib/projects"
import { getCurrentUser } from "@/lib/session"
import { ProjectImageForm } from "@/components/project/settings/project-image-form"
interface ProjectSettingsPageProps {
    params: { projectId: string }
}

export default async function ProjectSettingsPage({
    params,
}: ProjectSettingsPageProps) {
    const user = await getCurrentUser()

    if (!user) {
        redirect("/login")
    }

    const project = await getProject(params.projectId)

    if (!project) {
        return notFound()
    }

    return (
        <DashboardShell>
            <ProjectImageForm
                project={{
                    id: project.id,
                    image: project.image,
                    name: project.name,
                }}
            />
            <ProjectNameForm
                project={{
                    id: project.id,
                    name: project.name,
                    description: project.description,
                }}
            />
        </DashboardShell>
    )
}
