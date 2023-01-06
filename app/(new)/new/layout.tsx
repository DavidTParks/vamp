import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"

export default async function ProjectLayout({
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
                <header className="border-b sticky top-0 left-0 right-0 z-30  border-palette-300 bg-appbg px-4 lg:px-8">
                    <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
                        <div className="flex h-16 items-center justify-between">
                            {/* @ts-expect-error Server Component */}
                            <DashboardNav />
                            <UserNav />
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
