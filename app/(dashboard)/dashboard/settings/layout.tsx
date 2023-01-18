import { notFound } from "next/navigation"

import { SettingsNav } from "@/components/dashboard/settings/nav"
import { settingsConfig } from "@/config/settings"
import { getCurrentUser } from "@/lib/session"
import { preloadStripeDetails } from "@/lib/stripe"
interface SettingsLayoutProps {
    children?: React.ReactNode
}

export default async function DashboardLayout({
    children,
}: SettingsLayoutProps) {
    const user = await getCurrentUser()

    if (!user) {
        return notFound()
    }

    preloadStripeDetails(user.id)

    return (
        <div className="mt-12 grid gap-12 md:grid-cols-[200px_1fr]">
            <aside className="hidden flex-col md:flex md:w-[200px]">
                <SettingsNav items={settingsConfig.sidebarNav} />
            </aside>
            {children}
        </div>
    )
}
