import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import Link from "next/link"

export function SiteFooter() {
    return (
        <footer className="mx-auto mt-32 w-full max-w-container px-4 sm:px-6 lg:px-8 z-50 relative">
            <div className="border-t border-raised-border py-10">
                <div className="mx-auto max-w-sm h-5 w-auto text-center flex items-center justify-center text-brandtext-500 gap-2">
                    <Icons.logo /> Vamp
                </div>
                <p className="mt-5 text-center text-sm leading-6 text-brandtext-500">
                    © 2022 Vamp LLC. All rights reserved.
                </p>
                <div className="mt-16 flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-brandtext-500">
                    <Link href="/privacy-policy">Privacy policy</Link>
                    <div className="h-4 w-px bg-brandtext-500/20"></div>
                    <Link href="/tos">Terms of Service</Link>
                </div>
            </div>
        </footer>
    )
}
