import { redirect } from "next/navigation"

import { UserNameForm } from "@/components/dashboard/settings/user-settings-form"
import { DashboardShell } from "@/components/dashboard/shell"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"

export default async function SettingsPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect(
            authOptions?.pages && authOptions?.pages?.signIn
                ? authOptions.pages.signIn
                : "/"
        )
    }

    return (
        <DashboardShell>
            <UserNameForm user={{ id: user.id, name: user?.name ?? "" }} />
        </DashboardShell>
    )
}
