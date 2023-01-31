import { DashboardShell } from "@/components/dashboard/shell"
import { AddWalletForm } from "@/components/dashboard/settings/wallet/add-wallet-form"
import { notFound } from "next/navigation"
import { getCurrentUser } from "@/lib/session"
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
            <div>
                <AddWalletForm
                    user={{
                        id: dbUser.id,
                    }}
                />
            </div>
        </DashboardShell>
    )
}
