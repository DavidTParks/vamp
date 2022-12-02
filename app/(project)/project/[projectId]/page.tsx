import { notFound, redirect } from "next/navigation"

import { Project, User } from "@prisma/client"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { authOptions } from "@/lib/auth"

async function getProjectsForUser(
    projectId: Project["id"],
    userId: User["id"]
) {
    return await db.project.findFirst({
        where: {
            id: projectId,
        },
    })
}

interface ProjectPageProps {
    params: { projectId: string }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions.pages.signIn)
    }

    const project = await getProjectsForUser(params.projectId, user.id)

    if (!project) {
        notFound()
    }

    console.log("Project", project)

    return (
        <div>
            <p></p>
        </div>
    )
}
