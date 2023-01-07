import { BillingForm } from "@/components/dashboard/settings/billing/billing-form"
import Stats from "@/components/dashboard/settings/billing/stats"
import { DashboardShell } from "@/components/dashboard/shell"
import { getCurrentUser } from "@/lib/session"
import {
    getStripeBalance,
    getStripeDetails,
    getStripePayouts,
} from "@/lib/stripe"
import { notFound } from "next/navigation"

export default async function SettingsPage() {
    const user = await getCurrentUser()

    if (!user) {
        return notFound()
    }

    const [stripeDetails, stripeBalance, stripePayouts] = await Promise.all([
        getStripeDetails(user.id),
        getStripeBalance(user.id),
        getStripePayouts(user.id),
    ])

    return (
        <DashboardShell>
            {stripeDetails?.stripeCustomerId && (
                <Stats balance={stripeBalance} payouts={stripePayouts} />
            )}
            <BillingForm
                user={{ stripeCustomerId: stripeDetails.stripeCustomerId }}
            />
        </DashboardShell>
    )
}
