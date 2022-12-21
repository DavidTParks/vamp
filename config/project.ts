import { SettingsConfig } from "types"

export const projectConfig: SettingsConfig = {
    sidebarNav: [
        {
            title: "General",
            href: "/dashboard/settings",
            icon: "settings",
        },
    ],
}

export const dynamicProjectSidebar = (projectId: string): SettingsConfig => {
    const dynamicNav: SettingsConfig = {
        sidebarNav: [
            {
                title: "General",
                href: `/project/${projectId}/settings`,
                icon: "settings",
            },
            // {
            //     title: "Billing",
            //     href: `/project/${projectId}/settings/billing`,
            //     icon: "billing",
            // },
        ],
    }

    return dynamicNav
}
