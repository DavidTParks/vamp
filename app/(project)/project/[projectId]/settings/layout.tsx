import { notFound } from "next/navigation"

import { ProjectSettingsNav } from "@/components/project/settings/nav"
import { dynamicProjectSidebar } from "@/config/project"
import { getCurrentUser } from "@/lib/session"
import { preloadStripeDetails } from "@/lib/stripe"
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
        <div className="mt-12 grid gap-12 md:grid-cols-[200px_1fr]">
            <aside className="hidden w-[200px] flex-col md:flex">
                <ProjectSettingsNav
                    items={dynamicProjectSidebar(params.projectId).sidebarNav}
                />
            </aside>
            {children}
        </div>
    )
}
