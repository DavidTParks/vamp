import { Skeleton } from "@/ui/skeleton"
import Link from "next/link"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/dashboard/shell"
import { Separator } from "@/ui/separator"
import { UserAchievements } from "@/components/profile/u/profile-achievements"
import { ProfileTabNav } from "@/components/profile/u/profile-tab-nav"
import { UserProjectList } from "@/components/profile/u/profile-project-list"
import { UserBountySubmissionList } from "@/components/profile/u/profile-bounty-submissions"
export default function Loading() {
    return (
        <DashboardShell>
            <div className="mt-8 sm:mt-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="col-span-4 w-full lg:col-span-4">
                        <div className="flex items-center gap-4 sm:flex-col sm:items-start">
                            <div className="relative flex h-32 w-32 flex-none  items-center justify-center rounded-full border border-zinc-700/50 bg-zinc-800 shadow-md  shadow-zinc-800/5 ring-0 ring-zinc-900/5 sm:h-64 sm:w-64">
                                <Skeleton className="h-[240px] w-[240px] overflow-hidden rounded-full" />
                            </div>
                            <div className="flex w-full flex-col">
                                <Skeleton className="mt-1 h-[32px] w-[60%]" />
                                <Skeleton className="mt-2 h-[24px] w-[30%]" />
                                <div className="mt-4 flex flex-col items-start gap-2">
                                    <Skeleton className="mt-2 h-[20px] w-[40%]" />
                                    <Skeleton className="mt-2 h-[20px] w-[70%]" />
                                    <Skeleton className="mt-2 h-[20px] w-[30%]" />

                                    <Separator className="my-2" />
                                    <div className="w-full">
                                        <p className="inline-flex items-center gap-2 font-bold tracking-tight">
                                            <Icons.trophy size={16} />
                                            Evil Relics
                                        </p>
                                        <UserAchievements.Skeleton />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 w-full lg:col-span-8">
                        <header className=" top-0 left-0 right-0 border-b border-palette-300 bg-appbg">
                            <div className="mx-auto max-w-screen-xl">
                                <div className="flex h-12 items-center justify-between">
                                    <ProfileTabNav />
                                </div>
                            </div>
                        </header>
                        <h3 className="mt-8 flex w-full gap-8 text-lg font-bold tracking-tight text-brandtext-500">
                            Projects
                        </h3>
                        <UserProjectList.Skeleton />
                        <h3 className="mt-8 flex w-full gap-8 text-lg font-bold tracking-tight text-brandtext-500">
                            Activity
                        </h3>

                        <UserBountySubmissionList.Skeleton />
                    </div>
                </div>
            </div>
        </DashboardShell>
    )
}
