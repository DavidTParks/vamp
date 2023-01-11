import { NotificationsForm } from "@/components/dashboard/settings/notifications/notifications-form"
import { DashboardShell } from "@/components/dashboard/shell"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"

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
