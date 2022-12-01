import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { PostCreateButton } from "@/components/dashboard/project-create-button"

export default function DashboardLoading() {
    return (
        <DashboardShell>
            <DashboardHeader heading="Posts" text="Create and manage posts.">
                <PostCreateButton />
            </DashboardHeader>
            <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
                <p>Loading...</p>
            </div>
        </DashboardShell>
    )
}
