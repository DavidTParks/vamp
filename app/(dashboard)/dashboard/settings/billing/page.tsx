import { redirect } from "next/navigation"

import { BillingForm } from "@/components/dashboard/settings/billing/billing-form"
import { DashboardShell } from "@/components/dashboard/shell"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"

export default async function SettingsPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions.pages.signIn)
    }

    return (
        <DashboardShell>
            <BillingForm />
        </DashboardShell>
    )
}
