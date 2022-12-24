import { DashboardShell } from "@/components/dashboard/shell"
import BountyList from "@/components/project/bounty-list"
import { authOptions } from "@/lib/auth"
import { getProject } from "@/lib/projects"
import { getCurrentUser } from "@/lib/session"
import { Headline } from "@/ui/headline"
import { notFound, redirect } from "next/navigation"
interface ProjectPageProps {
    params: { projectId: string }
    searchParams: { id: string }
}

export default async function ProjectPage({
    params,
    searchParams,
}: ProjectPageProps) {
    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions.pages.signIn)
    }

    const project = await getProject(params.projectId)

    if (!project) {
        notFound()
    }

    return (
        <DashboardShell>
            <div className="mt-12">
                <div className="mb-8">
                    <Headline
                        heading="Bounties"
                        text="To create a new Bounty, import one from an existing Github issue or create one."
                    />
                </div>
                <>
                    {/* @ts-expect-error Server Component */}
                    <BountyList
                        project={{
                            id: project.id,
                        }}
                    />
                </>
            </div>
        </DashboardShell>
    )
}
