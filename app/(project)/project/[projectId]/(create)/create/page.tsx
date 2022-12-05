import { redirect } from "next/navigation"

import { Editor } from "@/components/create/editor"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import project from "pages/api/project"

interface ProjectPageProps {
    params: { projectId: string }
    searchParams: { id: string }
}

export default async function CreatePage({
    params,
    searchParams,
}: ProjectPageProps) {
    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions.pages.signIn)
    }

    const bounty = await db.bounty.create({
        data: {
            project: {
                connect: {
                    id: params.projectId,
                },
            },
            title: "New bounty",
        },
    })

    return (
        <div className="max-w-lg mx-auto w-full">
            <Editor
                project={{
                    id: project.id,
                }}
                bounty={{
                    id: bounty.id,
                    title: bounty.title,
                    content: bounty.content,
                    published: bounty.published,
                }}
            />
        </div>
    )
}
