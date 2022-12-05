import { redirect } from "next/navigation"

import GithubRepoList from "@/components/dashboard/github-repo-list"
import { Icons } from "@/components/icons"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { Button } from "@/ui/button"
import { Headline } from "@/ui/headline"
import Link from "next/link"
import { Editor } from "@/components/create/editor"
import { db } from "@/lib/db"

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
