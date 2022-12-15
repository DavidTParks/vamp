import { Skeleton } from "@/ui/skeleton"

export default function DashboardLoading() {
    return (
        <div className="mx-auto flex flex-col min-h-screen relative">
            <header className=" sticky top-0 left-0 right-0 z-30 border-b border-palette-300 bg-appbg px-4 lg:px-8">
                <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
                    <div className="flex h-16 items-center justify-between">
                        <Skeleton />
                        <Skeleton className="w-8 h-8" />
                    </div>
                </div>
            </header>
            <main className=" px-4 lg:px-8 z-10 mt-12">
                <div className="mx-auto max-w-screen-xl px-2.5 flex w-full flex-1 flex-col overflow-hidden">
                    <div className="max-w-[1012px] mx-auto w-full">
                        <div className="lg:flex w-full">
                            <div className="relative w-full lg:w-8/12 lg:pr-5">
                                <Skeleton className="w-1/5 mb-8" />
                                <div className="text-brandtext-500 font-bold break-words text-xl leading-8 sm:text-2xl font-display">
                                    <Skeleton className="w-full h-8" />
                                </div>
                                <div className="my-8">
                                    <Skeleton className="h-10 w-4/5" />
                                </div>
                                <Skeleton className="h-48 w-full" />
                            </div>
                            <div className="w-full lg:w-4/12 lg:min-w-[321px]">
                                <div className="border border-raised-border rounded-lg col-span-4">
                                    <div className="p-4 border-b border-raised-border">
                                        <p className="text-brandtext-500 font-bold text-lg">
                                            <Skeleton className="h-6" />
                                        </p>
                                    </div>
                                    <div className="w-full justify-between text-brandtext-500 p-4 space-y-4 flex flex-col overflow-hidden">
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
