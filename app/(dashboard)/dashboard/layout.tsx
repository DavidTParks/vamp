import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardSecondaryNav } from "@/components/dashboard/secondary-nav"
import { UserNav } from "@/components/user-nav"
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
            <div className="relative mx-auto flex min-h-screen flex-col">
                <header className=" sticky top-0 left-0 right-0 z-30 border-b border-palette-300 bg-appbg px-4 lg:px-8">
                    <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
                        <div className="flex h-16 items-center justify-between">
                            {/* @ts-expect-error Server Component */}
                            <DashboardNav />
                            <UserNav />
                        </div>
                        <DashboardSecondaryNav />
                    </div>
                </header>
                <div>
                    <div className="relative z-10 flex h-36 items-center border-b border-palette-300 bg-palette-400 px-4 lg:px-8">
                        <div className="undefined mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
                            <div className="flex items-center justify-between">
                                <DashboardHeader />
                            </div>
                        </div>
                    </div>
                </div>
                <main className=" z-10 px-4 lg:px-8">
                    <div className="mx-auto flex w-full max-w-screen-xl flex-1 flex-col overflow-hidden px-2.5 md:px-20">
                        {children}
                    </div>
                </main>
            </div>
        </>
    )
}
