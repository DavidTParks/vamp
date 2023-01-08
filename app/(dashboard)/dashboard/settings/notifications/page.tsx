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
import { NotificationsForm } from "@/components/dashboard/settings/notifications/notifications-form"
import { db } from "@/lib/db"

export default async function NotificationsPage() {
    const user = await getCurrentUser()

    if (!user) {
        return notFound()
    }

    const dbUser = await db.user.findUnique({
        where: {
            id: user.id,
        },
        select: {
            id: true,
            notificationNewSubmission: true,
            notificationSubmissionAccepted: true,
            notificationMarketing: true,
        },
    })

    if (!dbUser) return null

    return (
        <DashboardShell>
            <NotificationsForm
                user={{
                    id: dbUser.id,
                }}
                newSubmission={dbUser?.notificationNewSubmission}
                submissionAccepted={dbUser?.notificationSubmissionAccepted}
            />
        </DashboardShell>
    )
}
