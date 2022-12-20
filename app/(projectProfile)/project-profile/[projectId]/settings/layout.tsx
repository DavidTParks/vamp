import { notFound } from "next/navigation"

import { SettingsNav } from "@/components/dashboard/settings/nav"
import { settingsConfig } from "@/config/settings"
import { getCurrentUser } from "@/lib/session"
import { preloadStripeDetails } from "@/lib/stripe"
import { projectConfig } from "@/config/project"
import { ProjectSettingsNav } from "@/components/project/settings/nav"
import { dynamicProjectSidebar } from "@/config/project"
interface SettingsLayoutProps {
    children?: React.ReactNode
    params: { projectId: string }
}

export default async function DashboardLayout({
    children,
    params,
}: SettingsLayoutProps) {
    const user = await getCurrentUser()

    if (!user) {
        return notFound()
    }

    preloadStripeDetails(user.id)

    return (
        <div className="grid gap-12 md:grid-cols-[200px_1fr] mt-12">
            <aside className="hidden w-[200px] flex-col md:flex">
                <ProjectSettingsNav
                    items={dynamicProjectSidebar(params.projectId).sidebarNav}
                />
            </aside>
            {children}
        </div>
    )
}
