import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
    mainNav: [
        {
            title: "Dashboard",
            href: "/dashboard",
        },
        {
            title: "Settings",
            href: "/dashboard/settings",
        },
        {
            title: "Billing",
            href: "/dashboard/settings/billing",
        },
    ],
    sidebarNav: [
        {
            title: "Posts",
            href: "/dashboard",
            icon: "post",
        },
        {
            title: "Pages",
            href: "/",
            icon: "page",
            disabled: true,
        },
        {
            title: "Media",
            href: "/",
            icon: "media",
            disabled: true,
        },
        {
            title: "Billing",
            href: "/dashboard/billing",
            icon: "billing",
        },
        {
            title: "Settings",
            href: "/dashboard/settings",
            icon: "settings",
        },
    ],
}
