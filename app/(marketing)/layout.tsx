import Link from "next/link"
import { Button } from "@/ui/button"
import { marketingConfig } from "@/config/marketing"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import Background from "@/components/background"
import { getCurrentUser } from "@/lib/session"

interface MarketingLayoutProps {
    children: React.ReactNode
}

export default async function MarketingLayout({
    children,
}: MarketingLayoutProps) {
    const user = await getCurrentUser()

    console.log("User", user)

    return (
        <div className="flex min-h-screen flex-col">
            <header className="container z-40 ">
                <div className="flex h-16 items-center justify-between  py-4">
                    <MainNav items={marketingConfig.mainNav} />
                    <nav className="flex gap-4">
                        {user ? (
                            <Button
                                intent="primary"
                                href="/login"
                                borderRadius="full"
                            >
                                Dashboard
                            </Button>
                        ) : (
                            <Button
                                intent="primary"
                                href="/login"
                                borderRadius="full"
                            >
                                Login
                            </Button>
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
