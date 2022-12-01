import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"
import { PostCreateButton } from "@/components/dashboard/project-create-button"
import { DashboardShell } from "@/components/dashboard/shell"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { User } from "@prisma/client"
import { redirect } from "next/navigation"
import { cache } from "react"

const getProjectsForUser = cache(async (userId: User["id"]) => {
    return await db.projectUsers.findMany({
        where: {
            userId,
        },
        orderBy: {
            updatedAt: "desc",
        },
    })
})

export default async function DashboardPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions.pages.signIn)
    }

    const projects = await getProjectsForUser(user.id)

    return (
        <DashboardShell>
            <div className="mt-12">
                {projects?.length ? (
                    <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
                        {projects.map((post) => (
                            <p>Project</p>
                        ))}
                    </div>
                ) : (
                    <EmptyPlaceholder>
                        <EmptyPlaceholder.Icon name="post" />
                        <EmptyPlaceholder.Title>
                            No projects created
                        </EmptyPlaceholder.Title>
                        <EmptyPlaceholder.Description>
                            You don't have any projects yet. Start posting
                            bounties.
                        </EmptyPlaceholder.Description>
                        <PostCreateButton className="border-slate-200 bg-white text-brand-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2" />
                    </EmptyPlaceholder>
                )}
            </div>
        </DashboardShell>
    )
}
