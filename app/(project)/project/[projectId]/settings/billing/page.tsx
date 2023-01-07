import { redirect } from "next/navigation"

import Stats from "@/components/dashboard/settings/billing/stats"
import { DashboardShell } from "@/components/dashboard/shell"
import { ProjectBillingForm } from "@/components/project/settings/billing/billing/project-billing-form"
import { getCurrentUser } from "@/lib/session"
import {
    getStripeBalance,
    getStripeDetails,
    getStripePayouts,
} from "@/lib/stripe"

export default async function SettingsPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect("/login")
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
