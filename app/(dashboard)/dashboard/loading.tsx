import { ProjectItem } from "@/components/dashboard/project-item"
import { DashboardShell } from "@/components/dashboard/shell"

export default function DashboardLoading() {
    return (
        <DashboardShell>
            <div className="mt-12">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <ProjectItem.Skeleton />
                    <ProjectItem.Skeleton />
                    <ProjectItem.Skeleton />
                    <ProjectItem.Skeleton />
                    <ProjectItem.Skeleton />
                    <ProjectItem.Skeleton />
                </div>
            </div>
        </DashboardShell>
    )
}
