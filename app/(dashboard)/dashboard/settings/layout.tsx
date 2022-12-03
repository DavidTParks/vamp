import { notFound } from "next/navigation"

import { SettingsNav } from "@/components/dashboard/settings/nav"
import { settingsConfig } from "@/config/settings"
import { getCurrentUser } from "@/lib/session"

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

    return (
        <div className="grid gap-12 md:grid-cols-[200px_1fr] mt-12">
            <aside className="hidden w-[200px] flex-col md:flex">
                <SettingsNav items={settingsConfig.sidebarNav} />
            </aside>
            {children}
        </div>
    )
}
