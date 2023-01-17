import { Icons } from "@/components/icons"
import { Cta } from "@/components/marketing/cta"
import { FAQSection } from "@/components/marketing/faq"
import {
    LeaderBoard,
    LeaderBoardLoading,
} from "@/components/marketing/leaderboard"
import { Stars } from "@/components/marketing/stars"
import VideoPlayer from "@/components/marketing/video-player"
import { getCurrentUser } from "@/lib/session"
import { Button } from "@/ui/button"
import { ExternalLink } from "@/ui/external-link"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

export default async function IndexPage() {
    const user = await getCurrentUser()

    return (
        <>
            <div className="mx-auto mt-24 mb-10 max-w-md px-2.5 text-center sm:max-w-xl sm:px-0">
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-brandtext-500/10 hover:ring-white/20">
                        <span className="text-brandtext-500">
                            Announcing Vamp.sh.{" "}
                            <a href="#" className="font-semibold text-rose-600">
                                <span
                                    className="absolute inset-0"
                                    aria-hidden="true"
                                />
                                Read more <span aria-hidden="true">&rarr;</span>
                            </a>
                        </span>
                    </div>
                </div>
                <h1 className="mt-5 inline bg-gradient-to-r from-white to-brandtext-500 bg-clip-text text-5xl font-extrabold leading-[1.15]  tracking-tight text-white text-transparent sm:text-7xl sm:leading-[1.15]">
                    Contribute to Open Source
                    <br />
                    <span className="red-glow bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent">
                        Get Paid
                    </span>
                </h1>
                <h2 className="mt-5 text-lg text-brandtext-500 sm:text-xl">
                    Vamp is an open-source bounty platform designed to empower
                    project maintainers, and the contributors that make them
                    great.
                </h2>
                <div className="mx-auto mt-10 flex max-w-fit space-x-4">
                    {user ? (
                        <Link href="/browse">
                            <Button>Browse Bounties</Button>
                        </Link>
                    ) : (
                        <Link href="/register">
                            <Button>Start For Free</Button>
                        </Link>
                    )}
                    <ExternalLink href="https://github.com/DavidTParks/vamp">
                        <Button intent="secondary">
                            <p className="mr-2 text-sm">Star on GitHub</p>
                            <Icons.star size={16} />
                        </Button>
                    </ExternalLink>
                </div>
            </div>

            <section className="container grid place-items-center items-center justify-center gap-6 py-8 text-center md:py-12 lg:py-24">
                <div className="mx-auto flex flex-col items-center gap-4 md:max-w-[52rem]">
                    <h2 className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-clip-text font-display text-4xl font-extrabold leading-tight text-transparent sm:text-5xl sm:leading-tight">
                        Sync Github Issues with ease
                    </h2>
                    <p className="max-w-[85%] leading-normal text-brandtext-600 sm:text-lg sm:leading-7">
                        Link existing Github repositories and post bounties by
                        referencing issues directly.
                    </p>
                </div>
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-lg">
                    <VideoPlayer />
                </div>
            </section>

            <section className="container grid gap-6 py-8 text-center md:py-12 lg:py-24">
                <div className="mx-auto flex flex-col items-center gap-4 md:max-w-[52rem]">
                    <h2 className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-clip-text font-display text-4xl font-extrabold leading-tight text-transparent sm:text-5xl sm:leading-tight">
                        Make your mark
                    </h2>
                    <p className="max-w-[85%] leading-normal text-brandtext-600 sm:text-lg sm:leading-7">
                        Collect Blood for each accepted bounty submission. Climb
                        the leaderboard and make a name for yourself!
                    </p>
                </div>
                <Suspense fallback={<LeaderBoardLoading />}>
                    {/* @ts-expect-error Server Component */}
                    <LeaderBoard pageSize={10} page={1} />
                    <div className="mx-auto flex w-full max-w-md justify-center">
                        <Link href="/leaderboard">
                            <Button
                                intent="primary"
                                className="inline-flex items-center gap-2"
                            >
                                <Image
                                    alt="gold"
                                    src="/achievements/gold.png"
                                    height={16}
                                    width={16}
                                />
                                View Leaderboard
                            </Button>
                        </Link>
                    </div>
                </Suspense>
            </section>

            <section className="container grid place-items-center items-center justify-center gap-6 py-8 text-center md:py-12 lg:py-24">
                <div className="mx-auto flex flex-col items-center gap-4 md:max-w-[52rem]">
                    <h2 className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-clip-text font-display text-4xl font-extrabold leading-tight text-transparent sm:text-5xl sm:leading-tight">
                        Completely Open Source
                    </h2>
                    <p className="max-w-[85%] leading-normal text-brandtext-600 sm:text-lg sm:leading-7">
                        We support open source, so why not make our site open
                        source! Feel free to read, review, or contribute.
                    </p>
                </div>
                <Suspense fallback={<Stars.Skeleton />}>
                    {/* @ts-expect-error Server Component */}
                    <Stars />
                </Suspense>
            </section>

            <FAQSection />

            <Cta />
        </>
    )
}
