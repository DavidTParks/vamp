import { SiteConfig } from "types"
import { MarketingConfig } from "types"

export const siteConfig: SiteConfig = {
    name: "Vamp",
    links: {
        twitter: "https://twitter.com/dparksdev",
        github: "https://github.com/DavidTParks/vamp",
    },
}

export const mobileNavConfig: MarketingConfig = {
    mainNav: [
        {
            title: "Browse",
            href: "/browse",
        },
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
}
