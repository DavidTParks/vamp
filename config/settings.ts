import { SettingsConfig } from "types"

export const settingsConfig: SettingsConfig = {
    sidebarNav: [
        {
            title: "General",
            href: "/dashboard/settings",
            icon: "settings",
        },
        {
            title: "Billing",
            href: "/dashboard/settings/billing",
            icon: "billing",
        },
        {
            title: "Notifications",
            href: "/dashboard/settings/notifications",
            icon: "bell",
        },
        {
            title: "Wallets",
            href: "/dashboard/settings/wallet",
            icon: "eth",
        },
    ],
}
