import { BountyActivity } from "@/components/bounty/bounty-activity"
import { BountyContent } from "@/components/bounty/bounty-content"
import { BountyInfoBox } from "@/components/bounty/bounty-info-box"
import { BountyProjectInfo } from "@/components/bounty/bounty-project-info"
import { UserAccountNav } from "@/components/dashboard/user-account-nav"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { getCurrentUser } from "@/lib/session"
import { Button } from "@/ui/button"
import Link from "next/link"
interface ProjectPageProps {
    params: { projectId: string; bountyId: string }
    searchParams: { id: string }
}

export default async function BountyPage({
    params,
    searchParams,
}: ProjectPageProps) {
    return (
        <div className="mx-auto flex flex-col min-h-screen relative">
            <header className=" sticky top-0 left-0 right-0 z-30 border-b border-palette-300 bg-appbg px-4 lg:px-8">
                <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
                    <div className="flex h-16 items-center justify-between">
                        <MainNav />
                        <UserNav />
                    </div>
                </div>
            </header>
            <main className=" px-4 lg:px-8 z-10 mt-12">
                <div className="mx-auto max-w-screen-xl px-2.5 flex w-full flex-1 flex-col overflow-hidden">
                    <div className="max-w-[1012px] mx-auto w-full">
                        <div className="lg:flex">
                            <div className="relative w-full lg:w-8/12 lg:pr-5">
                                <div>
                                    <Link href={`/browse`}>
                                        <Button
                                            intent="tertiary"
                                            className="inline-flex items-center justify-start gap-2 mb-8"
                                            size="small"
                                        >
                                            <Icons.chevronLeft size={16} />
                                            Backs to All Bounties
                                        </Button>
                                    </Link>
                                </div>

                                {/* @ts-expect-error Server Component */}
                                <BountyContent bountyId={params.bountyId} />
                                <div className="mt-24 flex flex-col">
                                    {/* @ts-expect-error Server Component */}
                                    <BountyActivity
                                        bountyId={params.bountyId}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 lg:min-w-[321px] mt-12 sm:mt-0 space-y-8">
                                {/* @ts-expect-error Server Component */}
                                <BountyProjectInfo bountyId={params.bountyId} />
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
