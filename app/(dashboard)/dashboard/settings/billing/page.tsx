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
import { PayoutList } from "@/components/dashboard/settings/billing/payout-list"

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
            <BillingForm
                user={{ stripeCustomerId: stripeDetails.stripeCustomerId }}
            />

            {stripeDetails?.stripeCustomerId && (
                <div className="w-full">
                    <div className="mt-8">
                        <Stats
                            balance={stripeBalance}
                            payouts={stripePayouts}
                        />
                    </div>
                    <div className="mt-8">
                        {/* @ts-expect-error Server Component */}
                        <PayoutList />
                    </div>
                </div>
            )}
        </DashboardShell>
    )
}
