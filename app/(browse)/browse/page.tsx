import { fetchBounties } from "@/lib/bounties"
import { BrowseSearch } from "@/components/browse/browse-search"
import Image from "next/image"
import { formatDate, formatDollars } from "@/lib/utils"
import { Chip } from "@/ui/chip"
import Link from "next/link"
import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"
import { Button } from "@/ui/button"
import { getCurrentUser } from "@/lib/session"

export default async function SettingsPage() {
    const user = await getCurrentUser()

    const bounties = await fetchBounties({
        take: 10,
        skip: 0,
    })

    return (
        <div className="max-w-4xl mx-auto w-full">
            <div className="my-8">
                <div className="mx-auto  px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-lg font-semibold text-rose-600">
                            Browse
                        </h2>
                        <p className="mt-1 text-4xl font-bold tracking-tight text-brandtext-500 sm:text-5xl lg:text-6xl">
                            Start solving bounties
                        </p>
                        <p className="mx-auto mt-5 max-w-xl text-xl text-brandtext-600">
                            If your bounty resolution is accepted by an Open
                            Source project, you get paid!
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-12 w-full">
                <BrowseSearch />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8">
                {bounties?.length ? (
                    <>
                        {bounties.map((bounty) => (
                            <Link
                                href={`/bounty/${bounty.id}`}
                                key={bounty.id}
                                className="group relative p-4 border border-raised-border rounded-lg  dropdown"
                            >
                                <div className="flex flex-col gap-2">
                                    <span className="text-brandtext-500 text-sm flex gap-2 items-center">
                                        <Chip
                                            className="text-xs"
                                            intent="green"
                                        >
                                            {formatDollars(bounty.bountyPrice)}
                                        </Chip>
                                        {bounty.title}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <div className="h-6 w-6 rounded-full overflow-hidden relative inline-flex justify-center items-center">
                                            <Image
                                                alt={`${bounty.submittedBy.name} profile picture`}
                                                fill
                                                src={bounty.submittedBy.image}
                                            />
                                        </div>
                                        <span className="text-brandtext-600">
                                            &middot;
                                        </span>
                                        <span className="text-brandtext-600 text-sm">
                                            Posted{" "}
                                            {formatDate(
                                                bounty.createdAt?.toString()
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </>
                ) : (
                    <EmptyPlaceholder>
                        <EmptyPlaceholder.Icon name="logo" />
                        <EmptyPlaceholder.Title>
                            No Bounties
                        </EmptyPlaceholder.Title>
                        <EmptyPlaceholder.Description>
                            No bounties match your search query, or are open
                            right now. Be the first to post!
                        </EmptyPlaceholder.Description>
                        {user ? (
                            <Link href={`/dashboard`}>
                                <Button>New Bounty</Button>
                            </Link>
                        ) : (
                            <Link href={`/login`}>
                                <Button>Login to post</Button>
                            </Link>
                        )}
                    </EmptyPlaceholder>
                )}
            </div>
        </div>
    )
}
