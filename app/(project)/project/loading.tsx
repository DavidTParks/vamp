import { Skeleton } from "@/ui/skeleton"
import { Icons } from "@/components/icons"
import { SecondaryLinkItem } from "@/components/dashboard/secondary-nav"
import { DashboardShell } from "@/components/dashboard/shell"
import { Headline } from "@/ui/headline"
import { Button } from "@/ui/button"

export default function DashboardLoading() {
    return (
        <div className="mx-auto flex flex-col min-h-screen relative">
            <header className=" sticky top-0 left-0 right-0 z-30 border-b border-palette-300 bg-appbg px-4 lg:px-8">
                <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex gap-6 md:gap-10 text-red-50">
                            <div className=" gap-4 items-center flex">
                                <Icons.logo size={32} color="white" />
                                <svg
                                    data-testid="geist-icon"
                                    fill="none"
                                    height="32"
                                    shapeRendering="geometricPrecision"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    viewBox="0 0 24 24"
                                    width="32"
                                >
                                    <path d="M16.88 3.549L7.12 20.451"></path>
                                </svg>
                                <div className="flex items-center gap-4 w-32 md:w-56">
                                    <span className="hidden md:block text-sm text-brandtext-500 truncate">
                                        {" "}
                                        <Skeleton className="h-8 w-72" />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Skeleton className="h-8 w-8 overflow-hidden rounded-full" />
                    </div>
                    <div className="-mb-0.5 flex h-12 items-center justify-start space-x-2">
                        <SecondaryLinkItem href={`#`} isActive={true}>
                            Overview
                        </SecondaryLinkItem>
                        <SecondaryLinkItem href="#" isActive={false}>
                            Issues
                        </SecondaryLinkItem>
                        <SecondaryLinkItem href={"#"} isActive={false}>
                            Settings
                        </SecondaryLinkItem>
                    </div>
                </div>
            </header>
            <div>
                <div className="flex h-36 items-center border-b border-palette-300 bg-palette-400 z-10 relative px-4 lg:px-8">
                    <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20 undefined">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-medium text-brandtext-500">
                                Overview
                            </h1>
                            <Button>
                                <Icons.add className="mr-2 h-4 w-4" />
                                New bounty
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <main className=" px-4 lg:px-8 z-10">
                <div className="mx-auto max-w-screen-xl px-2.5 md:px-20 flex w-full flex-1 flex-col overflow-hidden">
                    <DashboardShell>
                        <div className="mt-12">
                            <div className="mb-8">
                                <Headline
                                    heading="Bounties"
                                    text="To create a new Bounty, import one from an existing Github issue or create one."
                                />
                            </div>
                            <>
                                <Skeleton className="w-full h-9" />
                                <div className="mt-4">
                                    <div className="divide-y space-y-4 divide-raised-border rounded-md overflow-hidden ">
                                        <Skeleton className="w-full h-16" />
                                        <Skeleton className="w-full h-16" />
                                        <Skeleton className="w-full h-16" />
                                        <Skeleton className="w-full h-16" />
                                        <Skeleton className="w-full h-16" />
                                    </div>
                                </div>
                            </>
                        </div>
                    </DashboardShell>
                </div>
            </main>
        </div>
    )
}
