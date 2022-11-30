import { notFound } from "next/navigation"

import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
import { MainNav } from "@/components/main-nav"
import { DashboardNav } from "@/components/dashboard/nav"
import { UserAccountNav } from "@/components/dashboard/user-account-nav"
import Background from "@/components/background"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getCurrentUser()

    console.log("USer", user)

    if (!user) {
        return notFound()
    }
    return (
        <>
            <div className="mx-auto flex flex-col min-h-screen relative">
                <header className=" sticky top-0 left-0 right-0 z-30 border-b border-slate-800 bg-appbg px-4 lg:px-8 ">
                    <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
                        <div className="flex h-16 items-center justify-between">
                            <MainNav items={dashboardConfig.mainNav} />
                            <UserAccountNav
                                user={{
                                    name: user.name,
                                    image: user.image,
                                    email: user.email,
                                }}
                            />
                        </div>
                        <div className="-mb-0.5 flex h-12 items-center justify-start space-x-2">
                            <a
                                className="border-b-2 p-1 border-fuchsia-600 text-white font-bold"
                                href="/"
                            >
                                <div className="rounded-md px-3 py-2 ">
                                    <p className="text-sm">Projects</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </header>
                <div>
                    <div className="flex h-36 items-center border-b border-slate-800 bg-slate-900">
                        <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20 undefined">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-medium text-white">
                                    My Projects
                                </h1>
                                <button className="rounded-md border border-black bg-black px-5 py-2 text-sm font-medium text-white transition-all duration-75 hover:bg-white hover:text-black active:scale-95">
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
