import { Button } from "@/ui/button"
import { CodeBracketIcon, SparklesIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"
export function ContributorFeatureSection() {
    return (
        <div className="relative overflow-hidden bg-rose-900/10 pt-16 pb-32">
            <div className="relative">
                <div className="mx-auto flex flex-col items-center gap-4 md:max-w-[52rem]">
                    <h2 className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-clip-text font-display text-4xl font-extrabold leading-tight text-transparent sm:text-5xl sm:leading-tight">
                        For Contributors
                    </h2>
                    <p className="max-w-[85%] leading-normal text-brandtext-600 sm:text-lg sm:leading-7">
                        Powerful, fun tools for Contributors to build their
                        open-source resume, and make money while doing it.
                    </p>
                </div>
                <div className="mt-12 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
                    <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
                        <div>
                            <div>
                                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-600">
                                    <CodeBracketIcon
                                        className="h-8 w-8 text-white"
                                        aria-hidden="true"
                                    />
                                </span>
                            </div>
                            <div className="mt-6">
                                <h2 className="text-3xl font-bold tracking-tight text-brandtext-500">
                                    Turn your expertise into a side hustle
                                </h2>
                                <p className="mt-4 text-lg text-brandtext-600">
                                    Track your payments via a powerful billing
                                    dashboard, and leverage your coding
                                    expertise to bring in some side income.
                                </p>
                                <div className="mt-6">
                                    <Link href="/register">
                                        <Button>Get started</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 sm:mt-16 lg:mt-0">
                        <div className="-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                            <Image
                                width={1200}
                                height={800}
                                className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                                src="/_static/payout-info.png"
                                alt="Payout user interface"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-24">
                <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
                    <div className="mx-auto max-w-xl px-6 lg:col-start-2 lg:mx-0 lg:max-w-none lg:py-32 lg:px-0">
                        <div>
                            <div>
                                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-600">
                                    <SparklesIcon
                                        className="h-8 w-8 text-white"
                                        aria-hidden="true"
                                    />
                                </span>
                            </div>
                            <div className="mt-6">
                                <h2 className="text-3xl font-bold tracking-tight text-brandtext-500">
                                    Build your resume
                                </h2>
                                <p className="text-brandtet-600 mt-4 text-lg">
                                    Collect achievements and tokens for
                                    completing bounties. Show off your progress
                                    and open-source resume to the world.
                                </p>
                                <div className="mt-6">
                                    <Link href="/register">
                                        <Button>Get started</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 sm:mt-16 lg:col-start-1 lg:mt-0">
                        <div className="-ml-0 pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                            <Image
                                width={1200}
                                height={800}
                                className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                                src="/_static/resume.png"
                                alt="User profile page"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
