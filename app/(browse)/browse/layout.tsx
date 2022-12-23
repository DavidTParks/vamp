import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { UserAccountNav } from "@/components/dashboard/user-account-nav"
import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/ui/button"
import { MainNav } from "@/components/main-nav"

export default async function ProjectLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getCurrentUser()

    return (
        <>
            <div className="mx-auto flex flex-col min-h-screen relative">
                <header className=" sticky top-0 left-0 right-0 z-30  border-palette-300 bg-appbg px-4 lg:px-8">
                    <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
                        <div className="flex h-16 items-center justify-between">
                            <MainNav />
                            {user ? (
                                <UserAccountNav
                                    user={{
                                        name: user.name,
                                        image: user.image,
                                        email: user.email,
                                    }}
                                />
                            ) : (
                                <Link href="/login">
                                    <Button
                                        intent="primary"
                                        borderRadius="full"
                                    >
                                        Login
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </header>
                <main className=" px-4 lg:px-8 z-10">
                    <div className="mx-auto max-w-screen-xl px-2.5 md:px-20 flex w-full flex-1 flex-col overflow-hidden">
                        {children}
                    </div>
                </main>
            </div>
        </>
    )
}
