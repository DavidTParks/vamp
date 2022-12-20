import { redirect } from "next/navigation"

import { UserNameForm } from "@/components/dashboard/settings/user-settings-form"
import { DashboardShell } from "@/components/dashboard/shell"
import { authOptions } from "@/lib/auth"
import { ProjectNameForm } from "@/components/project/settings/project-name-form"
import { getCurrentUser } from "@/lib/session"
import { getProject } from "@/lib/projects"
interface ProjectSettingsPageProps {
    params: { projectId: string }
}

export default async function ProjectSettingsPage({
    params,
}: ProjectSettingsPageProps) {
    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions.pages.signIn)
    }

    const project = await getProject(params.projectId)

    return (
        <DashboardShell>
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
