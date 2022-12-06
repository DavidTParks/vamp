import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardSecondaryNav } from "@/components/dashboard/secondary-nav"
import { UserAccountNav } from "@/components/dashboard/user-account-nav"
import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"

export const revalidate = 0

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getCurrentUser()

    if (!user) {
        return notFound()
    }

    return (
        <>
            <div className="mx-auto flex flex-col min-h-screen relative">
                <header className=" sticky top-0 left-0 right-0 z-30 border-b border-palette-300 bg-appbg px-4 lg:px-8">
                    <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
                        <div className="flex h-16 items-center justify-between">
                            <DashboardNav
                                user={{
                                    name: user.name,
                                    image: user.image,
                                    email: user.email,
                                }}
                                items={dashboardConfig.mainNav}
                            />
                            <UserAccountNav
                                user={{
                                    name: user.name,
                                    image: user.image,
                                    email: user.email,
                                }}
                            />
                        </div>
                        <DashboardSecondaryNav />
                    </div>
                </header>
                <div>
                    <div className="flex h-36 items-center border-b border-palette-300 bg-palette-400 z-10 relative px-4 lg:px-8">
                        <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20 undefined">
                            <div className="flex items-center justify-between">
                                <DashboardHeader />
                            </div>
                        </div>
                    </div>
                </div>
                <main className=" px-4 lg:px-8 z-10">
                    <div className="mx-auto max-w-screen-xl px-2.5 md:px-20 flex w-full flex-1 flex-col overflow-hidden">
                        {children}
                    </div>
                </main>
            </div>
        </>
    )
}
