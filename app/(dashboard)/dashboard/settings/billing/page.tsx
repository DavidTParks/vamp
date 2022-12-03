import { redirect } from "next/navigation"

import { BillingForm } from "@/components/dashboard/settings/billing/billing-form"
import { DashboardShell } from "@/components/dashboard/shell"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { getStripeDetails } from "@/lib/stripe"

export default async function SettingsPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect(authOptions.pages.signIn)
    }

    const stripeDetails = await getStripeDetails(user.id)

    return (
        <DashboardShell>
            <BillingForm
                user={{ stripeCustomerId: stripeDetails.stripeCustomerId }}
            />
        </DashboardShell>
    )
}
