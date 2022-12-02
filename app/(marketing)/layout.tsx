import Link from "next/link"
import { Button } from "@/ui/button"
import { marketingConfig } from "@/config/marketing"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import Background from "@/components/background"
import { getCurrentUser } from "@/lib/session"
import { preloadProjects } from "@/lib/projects"

interface MarketingLayoutProps {
    children: React.ReactNode
}

export default async function MarketingLayout({
    children,
}: MarketingLayoutProps) {
    const user = await getCurrentUser()

    if (user) {
        preloadProjects(user.id)
    }

    return (
        <div className="flex min-h-screen flex-col">
            <header className="container z-40 ">
                <div className="flex h-16 items-center justify-between  py-4">
                    <MainNav items={marketingConfig.mainNav} />
                    <nav className="flex gap-4">
                        {user ? (
                            <Link href="/dashboard">
                                <Button intent="primary" borderRadius="full">
                                    Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/login">
                                <Button intent="primary" borderRadius="full">
                                    Login
                                </Button>
                            </Link>
                        )}
                    </nav>
                </div>
            </header>
            <main className="flex-1 z-10">{children}</main>
            <Background />
            {/* <SiteFooter /> */}
        </div>
    )
}
