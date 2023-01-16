import { DashboardShell } from "@/components/dashboard/shell"
import { Icons } from "@/components/icons"
import { UserBountySubmissionList } from "@/components/profile/u/profile-bounty-submissions"
import { UserProjectList } from "@/components/profile/u/profile-project-list"
import { ProfileTabNav } from "@/components/profile/u/profile-tab-nav"
import { getGithubUserById } from "@/lib/github"
import { getUserById } from "@/lib/users"
import { getUserLevel } from "@/lib/utils"
import { ExternalLink } from "@/ui/external-link"
import { Separator } from "@/ui/separator"
import { Tooltip } from "@/ui/tooltip"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Suspense } from "react"
interface ProfilePageProps {
    params: { userId: string }
    searchParams?: { page: string; search: string; sort: string }
}

export default async function ProjectPage({
    params,
    searchParams,
}: ProfilePageProps) {
    const user = await getUserById(params.userId)

    if (!user) {
        notFound()
    }

    const providerAccountId = user?.accounts.find(
        (account) => account.providerAccountId
    )?.providerAccountId

    if (!providerAccountId) return notFound()

    const githubUser = await getGithubUserById(providerAccountId)

    if (!githubUser) return notFound()

    return (
        <DashboardShell>
            <div className="mt-8 sm:mt-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="col-span-4 w-full lg:col-span-4">
                        <div className="flex items-center gap-4 sm:flex-col sm:items-start">
                            <div className="relative flex h-32 w-32 flex-none  items-center justify-center rounded-full border border-zinc-700/50 bg-zinc-800 shadow-md  shadow-zinc-800/5 ring-0 ring-zinc-900/5 sm:h-64 sm:w-64">
                                <Image
                                    height={240}
                                    width={240}
                                    src={`https://vamp.sh/api/avatar/${user.id}`}
                                    className="border-sm overflow-hidden rounded-full border border-zinc-700/50"
                                    alt={`${user.name} avatar`}
                                />
                                <Tooltip
                                    content={
                                        "A users Blood score reflects how many bounty submissions they have had accepted."
                                    }
                                >
                                    <div className="absolute bottom-0 right-0 flex hidden flex-none items-center justify-center gap-1 overflow-hidden rounded-full border border-zinc-700/50  bg-zinc-800 px-3 py-1 shadow-md shadow-zinc-800/5 ring-0 ring-zinc-900/5 sm:m-3 sm:flex">
                                        <span className="font-display text-sm font-bold tracking-tight text-brandtext-500">
                                            x{user.blood}
                                        </span>
                                        <Image
                                            alt="potion"
                                            height={24}
                                            width={24}
                                            src="/achievements/blood.png"
                                        />
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="flex w-full flex-col">
                                <span className="text-md  font-bold tracking-tight text-brandtext-700">
                                    Level {getUserLevel(user.blood)}
                                </span>

                                <h1 className="mt-1 flex w-full gap-8 text-xl font-bold tracking-tight text-brandtext-500 sm:text-2xl">
                                    {user.name}{" "}
                                </h1>
                                <div>
                                    <div className="mt-3 flex w-fit flex-none items-center justify-center gap-1 overflow-hidden rounded-full border border-zinc-700/50 bg-zinc-800 px-3 py-1 shadow-md  shadow-zinc-800/5 ring-0 ring-zinc-900/5 sm:m-3 sm:flex sm:hidden ">
                                        <span className="font-display text-sm font-bold tracking-tight text-brandtext-500">
                                            x{user.blood}
                                        </span>
                                        <Image
                                            alt="potion"
                                            height={24}
                                            width={24}
                                            src="/achievements/blood.png"
                                        />
                                    </div>
                                </div>

                                {/* <div className="w-full mt-0 mb-2 h-4  rounded-md overflow-hidden relative border border-zinc-700/50 ">
                                    <div className="grid grid-cols-5 absolute inset-0 w-full">
                                        <div className="h-8 w-px  bg-raised-border opacity-0" />
                                        <div className="h-8 w-px bg-raised-border" />
                                        <div className="h-8 w-px bg-raised-border" />
                                        <div className="h-8 w-px bg-raised-border" />
                                        <div className="h-8 w-px bg-raised-border" />
                                        <div className="h-8 w-px bg-raised-border" />
                                        <div className="h-8 w-[20%] absolute inset-0 bg-gradient-to-r from-red-500/10 via-red-500/75 to-red-500/90"></div>
                                    </div>
                                    <span className="absolute inset-0 flex items-center justify-center font-medium test-sm tracking-tight">
                                        50%
                                    </span>
                                </div> */}
                            </div>
                        </div>

                        <div className="mt-4 flex flex-col items-start gap-2">
                            <ExternalLink href={githubUser.html_url}>
                                <p className="flex w-full items-center gap-2 text-sm font-medium text-brandtext-700">
                                    <Icons.gitHub size={16} />
                                    {githubUser.login}
                                </p>
                            </ExternalLink>

                            <ExternalLink href={`mailto:${user.email}`}>
                                <p className="flex w-full items-center gap-2 text-sm font-medium text-brandtext-700">
                                    <Icons.mail size={16} />
                                    {user.email}
                                </p>
                            </ExternalLink>

                            {githubUser.twitter_username && (
                                <ExternalLink
                                    href={`https://www.twitter.com/${githubUser.twitter_username}`}
                                >
                                    <p className="flex w-full items-center gap-2 text-sm font-medium text-brandtext-700">
                                        <Icons.twitter size={16} />
                                        {githubUser.twitter_username}
                                    </p>
                                </ExternalLink>
                            )}

                            <Separator className="my-2" />

                            <div>
                                <p className="font-bold tracking-tight">
                                    Achievements
                                </p>
                                <p className="mt-2 text-sm text-brandtext-700">
                                    Coming soon
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 w-full lg:col-span-8">
                        <header className=" sticky top-0 left-0 right-0 z-30 border-b border-palette-300 bg-appbg">
                            <div className="mx-auto max-w-screen-xl">
                                <div className="flex h-12 items-center justify-between">
                                    <ProfileTabNav />
                                </div>
                            </div>
                        </header>
                        <h3 className="mt-8 flex w-full gap-8 text-lg font-bold tracking-tight text-brandtext-500">
                            Projects
                        </h3>
                        <Suspense fallback={<UserProjectList.Skeleton />}>
                            {/* @ts-expect-error Server Component */}
                            <UserProjectList
                                user={{
                                    id: user.id,
                                }}
                            />
                        </Suspense>
                        <h3 className="mt-8 flex w-full gap-8 text-lg font-bold tracking-tight text-brandtext-500">
                            Activity
                        </h3>

                        <Suspense
                            fallback={<UserBountySubmissionList.Skeleton />}
                        >
                            {/* @ts-expect-error Server Component */}
                            <UserBountySubmissionList
                                user={{
                                    id: user.id,
                                }}
                            />
                        </Suspense>
                    </div>
                </div>
            </div>
        </DashboardShell>
    )
}
