import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"
import { DashboardShell } from "@/components/dashboard/shell"
import { Icons } from "@/components/icons"
import { UserAchievements } from "@/components/profile/u/profile-achievements"
import { ProfileDonate } from "@/components/profile/u/profile-donate"
import { ProfileTabNav } from "@/components/profile/u/profile-tab-nav"
import { getGithubUserById } from "@/lib/github"
import { getUserBountySubmissions } from "@/lib/users"
import { Chip } from "@/ui/chip"
import { ExternalLink } from "@/ui/external-link"
import { Separator } from "@/ui/separator"
import { Tooltip } from "@/ui/tooltip"
import Image from "next/image"
import Link from "next/link"
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
    const user = await getUserBountySubmissions(params.userId)

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
                                            {user.blood}
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
                                {/* <span className="text-md  font-bold tracking-tight text-brandtext-600">
                                    Level {getUserLevel(user.blood)}
                                </span> */}

                                <h1 className="mt-1 flex w-full gap-8 text-xl font-bold tracking-tight text-brandtext-500 sm:text-2xl">
                                    {user.name}{" "}
                                </h1>
                                <Tooltip content="Gold and silver are earned proportional to the price of bounties you solve. 1$ = 1 gold. 1 cent = 1 silver.">
                                    <div className="mt-2 flex items-center gap-1">
                                        <span className="font-display font-bold tracking-tight text-brandtext-500">
                                            {Math.floor(
                                                user.gold
                                            ).toLocaleString()}
                                        </span>
                                        <Image
                                            alt="gold"
                                            height={24}
                                            width={24}
                                            src="/achievements/coin.png"
                                        />
                                        <span className="ml-2 font-display font-bold tracking-tight text-brandtext-500">
                                            {(
                                                (user.gold % 1) *
                                                100
                                            ).toLocaleString()}
                                        </span>
                                        <Image
                                            alt="silver"
                                            height={24}
                                            width={24}
                                            src="/achievements/silver-coin.png"
                                        />
                                    </div>
                                </Tooltip>

                                <div>
                                    <Tooltip
                                        content={
                                            "A users Blood score reflects how many bounty submissions they have had accepted."
                                        }
                                    >
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
                                    </Tooltip>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-col items-start gap-2">
                            <ExternalLink href={githubUser.html_url}>
                                <p className="flex w-full items-center gap-2 text-sm font-medium text-brandtext-600">
                                    <Icons.gitHub size={16} />
                                    {githubUser.login}
                                </p>
                            </ExternalLink>

                            <ExternalLink href={`mailto:${user.email}`}>
                                <p className="flex w-full items-center gap-2 text-sm font-medium text-brandtext-600">
                                    <Icons.mail size={16} />
                                    {user.email}
                                </p>
                            </ExternalLink>

                            {githubUser.twitter_username && (
                                <ExternalLink
                                    href={`https://www.twitter.com/${githubUser.twitter_username}`}
                                >
                                    <p className="flex w-full items-center gap-2 text-sm font-medium text-brandtext-600">
                                        <Icons.twitter size={16} />
                                        {githubUser.twitter_username}
                                    </p>
                                </ExternalLink>
                            )}
                            {user.stripeCustomerId && (
                                <div className="mt-4 w-full">
                                    <ProfileDonate
                                        user={{
                                            id: user.id,
                                        }}
                                    />
                                </div>
                            )}

                            <Separator className="my-2" />

                            <div className="w-full">
                                <p className="inline-flex items-center gap-2 font-bold tracking-tight">
                                    <Icons.trophy size={16} />
                                    Evil Relics
                                </p>
                                <Suspense
                                    fallback={<UserAchievements.Skeleton />}
                                >
                                    {/* @ts-expect-error Server Component */}
                                    <UserAchievements
                                        user={{
                                            id: user.id,
                                        }}
                                    />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 w-full lg:col-span-8">
                        <header className=" top-0 left-0 right-0 border-b border-palette-300 bg-appbg">
                            <div className="mx-auto max-w-screen-xl">
                                <div className="flex h-12 items-center justify-between">
                                    <ProfileTabNav
                                        user={{
                                            id: user.id,
                                        }}
                                    />
                                </div>
                            </div>
                        </header>
                        <h3 className="mt-8 flex w-full gap-8 text-lg font-bold tracking-tight text-brandtext-500">
                            Submissions
                        </h3>
                        <div className="flex flex-col divide-y divide-raised-border">
                            {user?.bountySubmissions?.length ? (
                                <>
                                    {user?.bountySubmissions.map(
                                        (submission) => (
                                            <div
                                                key={submission.id}
                                                className="flex flex-col gap-4 py-4 text-brandtext-500"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <Link
                                                        href={`/bounty/${submission.bountyId}`}
                                                    >
                                                        <Chip className="inline-flex gap-2 hover:brightness-150">
                                                            Bounty{" "}
                                                            <Icons.arrowRight
                                                                size={16}
                                                            />
                                                        </Chip>
                                                    </Link>
                                                    {!submission.accepted && (
                                                        <Chip>Pending</Chip>
                                                    )}
                                                    {submission.accepted && (
                                                        <Chip intent="green">
                                                            Accepted
                                                        </Chip>
                                                    )}
                                                </div>
                                                <ExternalLink
                                                    className="text-rose-500"
                                                    href={
                                                        submission?.solutionLink ??
                                                        "#"
                                                    }
                                                >
                                                    {submission.solutionLink}
                                                </ExternalLink>
                                                <div className="text-sm text-brandtext-500">
                                                    {submission.comments}{" "}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </>
                            ) : (
                                <EmptyPlaceholder className="mt-4 min-h-[100px]">
                                    <EmptyPlaceholder.Icon name="logo" />
                                    <EmptyPlaceholder.Title>
                                        This user has not submitted any
                                        solutions to bounties
                                    </EmptyPlaceholder.Title>
                                </EmptyPlaceholder>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardShell>
    )
}
