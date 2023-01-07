import { redirect } from "next/navigation"

import { UserNameForm } from "@/components/dashboard/settings/user-settings-form"
import { DashboardShell } from "@/components/dashboard/shell"
import { getCurrentUser } from "@/lib/session"

export default async function SettingsPage() {
    const user = await getCurrentUser()

    if (!user) {
        if (!user) {
            redirect("/login")
        }
    }

    return (
        <DashboardShell>
            <UserNameForm user={{ id: user.id, name: user?.name ?? "" }} />
        </DashboardShell>
    )
}
