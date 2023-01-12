import { DashboardShell } from "@/components/dashboard/shell"
import { Icons } from "@/components/icons"
import BountyList from "@/components/project/bounty-list"
import { getBountiesForProject } from "@/lib/bounties"
import { db } from "@/lib/db"
import { getRepo } from "@/lib/github"
import { ExternalLink } from "@/ui/external-link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getUserById } from "@/lib/users"
import { getCurrentUser } from "@/lib/session"
import { getGithubUserById } from "@/lib/github"
import { Separator } from "@/ui/separator"
import { Button } from "@/ui/button"
import { getUserLevel } from "@/lib/utils"
import { UserProjectList } from "@/components/profile/u/profile-project-list"
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
            <div className="mt-8 sm:mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="w-full col-span-4 lg:col-span-4">
                        <div className="flex items-center sm:flex-col sm:items-start gap-4">
                            <div className="relative w-32 h-32 sm:w-64 sm:h-64  flex flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5  ring-zinc-900/5 border border-zinc-700/50 bg-zinc-800 ring-0">
                                <Image
                                    height={240}
                                    width={240}
                                    src={`https://vamp.sh/api/avatar/${user.id}`}
                                    className="rounded-full overflow-hidden border border-sm border-zinc-700/50"
                                    alt={`${user.name} avatar`}
                                />
                                <div className="overflow-hidden rounded-full px-3 py-1 hidden items-center justify-center sm:flex m-3 flex-none shadow-md shadow-zinc-800/5  ring-zinc-900/5 border border-zinc-700/50 bg-zinc-800 ring-0 absolute gap-1 bottom-0 right-0">
                                    <span className="text-sm tracking-tight font-bold text-brandtext-500 font-display">
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
                            <div className="flex flex-col">
                                <span className="text-brandtext-700  tracking-tight text-md font-bold">
                                    Level {getUserLevel(user.blood)}
                                </span>
                                <h1 className="mt-1 text-lg font-bold tracking-tight text-brandtext-500 sm:text-2xl flex gap-8 w-full">
                                    {user.name}{" "}
                                </h1>
                            </div>
                        </div>

                        <div className="mt-2 flex flex-col items-start gap-2">
                            <div className="w-full mt-0 mb-2 h-8  rounded-md overflow-hidden relative border border-zinc-700/50 ">
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
                            </div>
                            <ExternalLink href={githubUser.html_url}>
                                <p className="text-sm font-medium text-brandtext-700 flex items-center gap-2 w-full">
                                    <Icons.gitHub size={16} />
                                    {githubUser.login}
                                </p>
                            </ExternalLink>

                            <ExternalLink href={`mailto:${user.email}`}>
                                <p className="text-sm font-medium text-brandtext-700 flex items-center gap-2 w-full">
                                    <Icons.mail size={16} />
                                    {user.email}
                                </p>
                            </ExternalLink>

                            {githubUser.twitter_username && (
                                <ExternalLink
                                    href={`https://www.twitter.com/${githubUser.twitter_username}`}
                                >
                                    <p className="text-sm font-medium text-brandtext-700 flex items-center gap-2 w-full">
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
                                <p className="text-brandtext-700">
                                    You don't have any achievements yet!{" "}
                                </p>
                                {/* <div className="grid grid-cols-4 mt-4 w-full place-items-center gap-4">
                                    <div className="overflow-hidden rounded-full p-3 flex items-center justify-center relative flex-none shadow-md shadow-zinc-800/5  ring-zinc-900/5 border border-zinc-700/50 bg-zinc-800 ring-0">
                                        <Image
                                            alt="potion"
                                            height={32}
                                            width={32}
                                            src="/achievements/key.png"
                                        />
                                    </div>
                                    <div className="overflow-hidden rounded-full p-3 flex items-center justify-center relative flex-none shadow-md shadow-zinc-800/5  ring-zinc-900/5 border border-zinc-700/50 bg-zinc-800 ring-0">
                                        <Image
                                            alt="potion"
                                            height={32}
                                            width={32}
                                            src="/achievements/gold.png"
                                        />
                                    </div>
                                    <div className="overflow-hidden rounded-full p-3 flex items-center justify-center relative flex-none shadow-md shadow-zinc-800/5  ring-zinc-900/5 border border-zinc-700/50 bg-zinc-800 ring-0">
                                        <Image
                                            alt="potion"
                                            height={32}
                                            width={32}
                                            src="/achievements/potion.png"
                                        />
                                    </div>
                                    <div className="overflow-hidden rounded-full p-3 flex items-center justify-center relative flex-none shadow-md shadow-zinc-800/5  ring-zinc-900/5 border border-zinc-700/50 bg-zinc-800 ring-0">
                                        <Image
                                            alt="potion"
                                            height={32}
                                            width={32}
                                            src="/achievements/silver.png"
                                        />
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="w-full col-span-4 lg:col-span-8">
                        <h3 className="mt-1 text-lg font-bold tracking-tight text-brandtext-500 sm:text-2xl flex gap-8 w-full">
                            Projects
                        </h3>
                        <Suspense fallback="Loading...">
                            {/* @ts-expect-error Server Component */}
                            <UserProjectList
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
