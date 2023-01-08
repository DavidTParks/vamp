import { Icons } from "@/components/icons"
import { Button } from "@/ui/button"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { ExternalLink } from "@/ui/external-link"
import { getCurrentUser } from "@/lib/session"
import VideoPlayer from "@/components/marketing/video-player"
import { FAQSection } from "@/components/marketing/faq"
import { Cta } from "@/components/marketing/cta"
import { LeaderBoard } from "@/components/marketing/leaderboard"
import { LeaderBoardLoading } from "@/components/marketing/leaderboard"
import { Suspense } from "react"

async function getGitHubStars(): Promise<string | null> {
    try {
        const response = await fetch(
            "https://api.github.com/repos/davidtparks/vamp",
            {
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
                },
                next: {
                    revalidate: 60,
                },
            }
        )

        if (!response?.ok) {
            return null
        }

        const json = await response.json()
        return parseInt(json["stargazers_count"]).toLocaleString()
    } catch (error) {
        return null
    }
}

export default async function IndexPage() {
    const [stars, user] = await Promise.all([
        getGitHubStars(),
        getCurrentUser(),
    ])

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
                <h1 className="mt-5 font-extrabold leading-[1.15] text-white sm:text-7xl sm:leading-[1.15] inline bg-gradient-to-r from-white  to-brandtext-500 bg-clip-text text-5xl tracking-tight text-transparent">
                    Contribute to Open Source
                    <br />
                    <span className="bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent red-glow">
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
                            <p className="text-sm mr-2">Star on GitHub</p>
                            <Icons.star size={16} />
                        </Button>
                    </ExternalLink>
                </div>
            </div>
            <section className="container grid justify-center gap-6 py-8 md:py-12 lg:py-24 text-center items-center place-items-center">
                <div className="mx-auto flex flex-col gap-4 md:max-w-[52rem] items-center">
                    <h2 className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-clip-text font-display text-4xl font-extrabold leading-tight text-transparent sm:text-5xl sm:leading-tight">
                        Sync Github Issues with ease
                    </h2>
                    <p className="max-w-[85%] leading-normal text-brandtext-600 sm:text-lg sm:leading-7">
                        Link existing Github repositories and post bounties by
                        referencing issues directly.
                    </p>
                </div>
                <div className="rounded-lg overflow-hidden w-full flex justify-center items-center h-full">
                    <VideoPlayer />
                </div>
            </section>

            <section className="container grid gap-6 py-8 md:py-12 lg:py-24 text-center">
                <div className="mx-auto flex flex-col gap-4 md:max-w-[52rem] items-center">
                    <h2 className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-clip-text font-display text-4xl font-extrabold leading-tight text-transparent sm:text-5xl sm:leading-tight">
                        Make your mark
                    </h2>
                    <p className="max-w-[85%] leading-normal text-brandtext-600 sm:text-lg sm:leading-7">
                        Collect blood for each accepted bounty submission. Climb
                        the leaderboard and make a name for yourself!
                    </p>
                </div>
                <Suspense fallback={<LeaderBoardLoading />}>
                    {/* @ts-expect-error Server Component */}
                    <LeaderBoard />
                </Suspense>
            </section>

            <section className="container grid justify-center gap-6 py-8 md:py-12 lg:py-24 text-center items-center place-items-center">
                <div className="mx-auto flex flex-col gap-4 md:max-w-[52rem] items-center">
                    <h2 className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-clip-text font-display text-4xl font-extrabold leading-tight text-transparent sm:text-5xl sm:leading-tight">
                        Completely Open Source
                    </h2>
                    <p className="max-w-[85%] leading-normal text-brandtext-600 sm:text-lg sm:leading-7">
                        We support open source, so why not make our site open
                        source! Feel free to read, review, or contribute.
                    </p>
                </div>
                {stars && (
                    <ExternalLink href={siteConfig.links.github}>
                        <Button intent="primary">
                            <div className="flex h-10 w-10 items-center justify-center space-x-2 rounded-md border border-slate-600 bg-slate-800">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="h-5 w-5 text-white"
                                >
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                                </svg>
                            </div>
                            <div className="flex items-center">
                                <div className="h-4 w-4 border-y-8 border-r-8 border-l-0 border-solid border-y-transparent border-r-slate-800"></div>
                                <div className="flex h-10 items-center rounded-md border border-slate-800 bg-slate-800 px-4  font-medium text-slate-200">
                                    {stars} stars on GitHub
                                </div>
                            </div>
                        </Button>
                    </ExternalLink>
                )}
            </section>

            <FAQSection />

            <Cta />
        </>
    )
}
