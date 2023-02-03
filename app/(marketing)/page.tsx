import { Icons } from "@/components/icons"
import { Cta } from "@/components/marketing/cta"
import { FAQSection } from "@/components/marketing/faq"
import {
    LeaderBoard,
    LeaderBoardLoading,
} from "@/components/marketing/leaderboard"
import VideoPlayer from "@/components/marketing/video-player"
import { siteConfig } from "@/config/site"
import { Button } from "@/ui/button"
import { ExternalLink } from "@/ui/external-link"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { MaintainerFeatureSection } from "@/components/marketing/maintainer-feature-section"
import { ContributorFeatureSection } from "@/components/marketing/contributors-feature-section"
import { Hero } from "@/components/marketing/hero"
import { LogoCloud } from "@/components/marketing/logo-cloud"

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
    const stars = await getGitHubStars()

    return (
        <>
            <Hero />

            <section className="container grid place-items-center items-center justify-center gap-6  py-8 text-center md:py-12 lg:py-24">
                <div className="mx-auto flex flex-col items-center gap-4 md:max-w-[52rem]">
                    <h2 className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-clip-text font-display text-4xl font-extrabold leading-tight text-transparent sm:text-5xl sm:leading-tight">
                        For Maintainers
                    </h2>
                    <p className="max-w-[85%] leading-normal text-brandtext-600 sm:text-lg sm:leading-7">
                        Sync your Github issues and reference them in bounties
                        directly. Save time rewarding your contributors.
                    </p>
                </div>
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-lg">
                    <VideoPlayer />
                </div>
            </section>

            <MaintainerFeatureSection />
            <ContributorFeatureSection />

            <section className=" grid gap-6 py-8 text-center md:py-12 lg:py-24">
                <div className="container">
                    <div className="mx-auto flex flex-col items-center gap-4 md:max-w-[52rem]">
                        <h2 className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-clip-text font-display text-4xl font-extrabold leading-tight text-transparent sm:text-5xl sm:leading-tight">
                            Make your mark
                        </h2>
                        <p className="max-w-[85%] leading-normal text-brandtext-600 sm:text-lg sm:leading-7">
                            Collect Blood for each accepted bounty submission.
                            Climb the leaderboard and make a name for yourself!
                        </p>
                    </div>
                    <Suspense fallback={<LeaderBoardLoading />}>
                        {/* @ts-expect-error Server Component */}
                        <LeaderBoard pageSize={10} page={1} />
                        <div className="mx-auto mt-8 flex w-full max-w-md justify-center">
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
                </div>
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

            <Cta />

            <FAQSection />
        </>
    )
}
