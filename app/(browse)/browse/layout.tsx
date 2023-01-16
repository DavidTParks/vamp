import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"

export default async function ProjectLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className="relative mx-auto flex min-h-screen flex-col">
                <header className=" sticky top-0 left-0 right-0 z-30  border-palette-300 bg-appbg px-4 lg:px-8">
                    <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
                        <div className="flex h-16 items-center justify-between">
                            <MainNav />
                            <UserNav />
                        </div>
                    </div>
                </header>
                <main className=" z-10 px-4 lg:px-8">
                    <div className="mx-auto flex w-full max-w-screen-xl flex-1 flex-col overflow-hidden px-2.5 md:px-20">
                        {children}
                    </div>
                </main>
            </div>
        </>
    )
}
