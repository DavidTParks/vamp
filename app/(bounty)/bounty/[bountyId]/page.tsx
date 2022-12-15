import { BountyActivity } from "@/components/bounty/bounty-activity"
import { BountyContent } from "@/components/bounty/bounty-content"
import { BountyInfoBox } from "@/components/bounty/bounty-info-box"
import { BountyNav } from "@/components/bounty/bounty-nav"
import { UserAccountNav } from "@/components/dashboard/user-account-nav"
import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
import { Button } from "@/ui/button"
import Link from "next/link"
import { Icons } from "@/components/icons"

interface ProjectPageProps {
    params: { projectId: string; bountyId: string }
    searchParams: { id: string }
}

export default async function CreatePage({
    params,
    searchParams,
}: ProjectPageProps) {
    const user = await getCurrentUser()

    return (
        <div className="mx-auto flex flex-col min-h-screen relative">
            <header className=" sticky top-0 left-0 right-0 z-30 border-b border-palette-300 bg-appbg px-4 lg:px-8">
                <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
                    <div className="flex h-16 items-center justify-between">
                        <BountyNav items={dashboardConfig.mainNav} />
                        <div className="block md:hidden">
                            <Icons.logo size={24} color="white" />
                        </div>
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
                                <Button intent="primary" borderRadius="full">
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </header>
            <main className=" px-4 lg:px-8 z-10 mt-12">
                <div className="mx-auto max-w-screen-xl px-2.5 flex w-full flex-1 flex-col overflow-hidden">
                    <div className="max-w-[1012px] mx-auto w-full">
                        <div className="lg:flex">
                            <div className="relative w-full lg:w-8/12 lg:pr-5">
                                {/* @ts-expect-error Server Component */}
                                <BountyContent bountyId={params.bountyId} />
                                <div className="mt-24 flex flex-col">
                                    {/* @ts-expect-error Server Component */}
                                    <BountyActivity
                                        bountyId={params.bountyId}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 lg:min-w-[321px] mt-12 sm:mt-0">
                                {/* @ts-expect-error Server Component */}
                                <BountyInfoBox bountyId={params.bountyId} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
