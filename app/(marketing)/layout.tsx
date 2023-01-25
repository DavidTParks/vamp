import Background from "@/components/background"
import { MainNav } from "@/components/main-nav"
import { preloadProjects } from "@/lib/projects"
import { getCurrentUser } from "@/lib/session"
import { Button } from "@/ui/button"
import Link from "next/link"
import { MarketingNav } from "@/components/marketing/marketing-nav"
interface MarketingLayoutProps {
    children: React.ReactNode
}

export default async function MarketingLayout({
    children,
}: MarketingLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="z-40 mx-auto  mb-10 w-full max-w-7xl px-6 text-center lg:px-8">
                <div className="flex h-16 items-center justify-between  py-4">
                    <MainNav />

                    <nav className="flex gap-4">
                        <Link href="/browse">
                            <Button intent="text" borderRadius="full">
                                Bounties
                            </Button>
                        </Link>
                        <MarketingNav />
                    </nav>
                </div>
            </header>
            <main className="z-10 flex-1">{children}</main>
            <Background />
            {/* <SiteFooter /> */}
        </div>
    )
}
