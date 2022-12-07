import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { ProjectNav } from "@/components/project/project-nav"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { dashboardConfig } from "@/config/dashboard"
import { UserAccountNav } from "@/components/dashboard/user-account-nav"
import Tiptap from "@/components/create/tiptap"
import { Headline } from "@/ui/headline"
interface ProjectPageProps {
    params: { projectId: string; bountyId: string }
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

    const bounty = await db.bounty.findUnique({
        where: {
            id: params.bountyId,
        },
        include: {
            project: true,
        },
    })

    return (
        <div className="mx-auto flex flex-col min-h-screen relative">
            <header className=" sticky top-0 left-0 right-0 z-30 border-b border-palette-300 bg-appbg px-4 lg:px-8">
                <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
                    <div className="flex h-16 items-center justify-between">
                        <ProjectNav
                            project={{
                                name: bounty.project.name,
                                id: bounty.project.id,
                            }}
                            items={dashboardConfig.mainNav}
                        />
                        <UserAccountNav
                            user={{
                                name: user.name,
                                image: user.image,
                                email: user.email,
                            }}
                        />
                    </div>
                </div>
            </header>
            <main className=" px-4 lg:px-8 z-10 mt-12">
                <div className="mx-auto max-w-screen-xl px-2.5 md:px-20 flex w-full flex-1 flex-col overflow-hidden">
                    <div className="max-w-2xl mx-auto w-full">
                        <Headline
                            heading="Edit bounty"
                            text="Add context to the problem you are looking to solve for your project."
                        />
                        <div className="mt-8">
                            <Tiptap
                                bounty={{
                                    title: bounty.title,
                                    id: bounty.id,
                                    content: bounty.content,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
