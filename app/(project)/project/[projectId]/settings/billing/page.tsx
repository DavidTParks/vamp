import { redirect } from "next/navigation"

import { BillingForm } from "@/components/dashboard/settings/billing/billing-form"
import { DashboardShell } from "@/components/dashboard/shell"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { getStripeDetails } from "@/lib/stripe"
import { getStripeBalance } from "@/lib/stripe"
import { getStripePayouts } from "@/lib/stripe"
import Stats from "@/components/dashboard/settings/billing/stats"
import { ProjectBillingForm } from "@/components/project/settings/billing/billing/project-billing-form"

export default async function SettingsPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect(
            authOptions?.pages && authOptions?.pages?.signIn
                ? authOptions.pages.signIn
                : "/"
        )
    }

    const [stripeDetails, stripeBalance, stripePayouts] = await Promise.all([
        getStripeDetails(user.id),
        getStripeBalance(user.id),
        getStripePayouts(user.id),
    ])

    return (
        <DashboardShell>
            {stripeDetails.stripeCustomerId && (
                <Stats balance={stripeBalance} payouts={stripePayouts} />
            )}
            <ProjectBillingForm
                user={{ stripeCustomerId: stripeDetails.stripeCustomerId }}
            />
        </DashboardShell>
    )
}
