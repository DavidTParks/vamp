import { Skeleton } from "@/ui/skeleton"
import Link from "next/link"
import { Icons } from "@/components/icons"

export default function DashboardLoading() {
    return (
        <div className="relative mx-auto flex min-h-screen flex-col">
            <header className=" sticky top-0 left-0 right-0 z-30 border-b border-palette-300 bg-appbg px-4 lg:px-8">
                <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex gap-6 text-red-50 md:gap-10">
                            <Link
                                href="/"
                                className="flex items-center space-x-2 text-2xl"
                            >
                                <Icons.logo size={32} color="white" />
                                <span className="hidden font-bold sm:inline-block">
                                    Vamp
                                </span>
                            </Link>
                        </div>
                        <Skeleton className="h-8 w-8" />
                    </div>
                </div>
            </header>
            <main className=" z-10 mt-12 px-4 lg:px-8">
                <div className="mx-auto flex  w-full max-w-screen-xl flex-1 flex-col overflow-hidden px-2.5 md:px-20">
                    <div className="mx-auto w-full">
                        <div className="w-full lg:flex">
                            <div className="relative w-full lg:w-8/12 lg:pr-5">
                                <Skeleton className="mb-8 w-1/5" />
                                <div className="break-words font-display text-xl font-bold leading-8 text-brandtext-500 sm:text-2xl">
                                    <Skeleton className="h-8 w-full" />
                                </div>
                                <div className="my-8">
                                    <Skeleton className="h-10 w-4/5" />
                                </div>
                                <Skeleton className="h-48 w-full" />
                            </div>
                            <div className="w-full lg:w-4/12 lg:min-w-[321px]">
                                <div className="col-span-4 rounded-lg border border-raised-border">
                                    <div className="border-b border-raised-border p-4">
                                        <div className="text-lg font-bold text-brandtext-500">
                                            <Skeleton className="h-6" />
                                        </div>
                                    </div>
                                    <div className="flex w-full flex-col justify-between space-y-4 overflow-hidden p-4 text-brandtext-500">
                                        <Skeleton className="w-full" />
                                        <Skeleton className="w-full" />
                                        <Skeleton className="w-full" />
                                        <Skeleton className="w-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
