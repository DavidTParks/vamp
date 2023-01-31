import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Card } from "@/ui/card"

export default function DashboardSettingsLoading() {
    return (
        <DashboardShell>
            <div className="grid gap-10">
                <Card.Skeleton />
            </div>
        </DashboardShell>
    )
}
