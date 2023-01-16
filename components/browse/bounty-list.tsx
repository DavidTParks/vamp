import { db } from "@/lib/db"
import { dateToNow, formatDate, formatDollars } from "@/lib/utils"
import { Pagination } from "@/ui/pagination"
import Image from "next/image"
import Link from "next/link"
import { UserAvatar } from "../dashboard/user-avatar"
import { Icons } from "../icons"
import { BountyEmptyPlaceholder } from "./bounty-empty-placeholder"

type TBountyList = {
    page: number
    search?: string
    pageSize?: number
    projectId?: string
    sortQuery?: string
    includeResolved?: boolean
}

const sortQueryToOrderBy = {
    createdDesc: {
        createdAt: "desc",
    },
    createdAsc: {
        createdAt: "asc",
    },
    priceDesc: {
        bountyPrice: "desc",
    },
    priceAsc: {
        bountyPrice: "asc",
    },
}

export async function BrowseBountyList({
    page,
    search,
    sortQuery,
    pageSize = 10,
    projectId,
    includeResolved = false,
}: TBountyList) {
    const skip = (page - 1) * pageSize

    const [bounties, bountyCount] = await Promise.all([
        db.bounty.findMany({
            take: pageSize,
            skip,
            // @ts-ignore
            orderBy: sortQueryToOrderBy[sortQuery] ?? {
                createdAt: "desc",
            },
            include: {
                project: {
                    include: {
                        githubRepo: true,
                    },
                },
                bountySubmissions: true,
                submittedBy: true,
            },
            where: {
                published: true,
                deleted: false,
                title: {
                    search,
                },
                resolved: includeResolved,
                projectId,
            },
        }),
        db.bounty.count({
            where: {
                published: true,
                deleted: false,
                title: {
                    search,
                },
                resolved: includeResolved,
                projectId,
            },
        }),
    ])

    return (
        <>
            {bounties?.length ? (
                <div className="divide-y divide-raised-border overflow-hidden rounded-md border border-raised-border">
                    <div className="divide divide-y divide-raised-border">
                        {bounties?.map((bounty) => (
                            <Link
                                className="block"
                                key={bounty.id}
                                href={`/bounty/${bounty.id}`}
                            >
                                <div className="cursor-pointer hover:bg-palette-150">
                                    <h3 className="sr-only">
                                        Bounty placed on{" "}
                                        <time
                                            dateTime={bounty.createdAt.toString()}
                                        >
                                            {formatDate(
                                                bounty.createdAt.toString()
                                            )}
                                        </time>
                                    </h3>
                                    <div className="flex items-center p-4 py-3 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:p-6">
                                        <dl className="grid flex-1 grid-cols-1 gap-4 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-4 lg:col-span-3">
                                            <div className="flex items-center gap-4">
                                                <div className="flex-shrink-0">
                                                    <Icons.circleDot
                                                        size={24}
                                                        className="mt-2 text-green-600"
                                                    />
                                                </div>
                                                <dl className="flex flex-col items-start">
                                                    <dt className="font-medium text-brandtext-600">
                                                        Bounty
                                                    </dt>
                                                    <dd className="mt-1 text-brandtext-500">
                                                        {
                                                            bounty.computedBountyPrice
                                                        }
                                                    </dd>
                                                </dl>
                                            </div>
                                            <div className="col-span-2 flex flex-col items-start">
                                                <dt className="inline-flex items-center gap-1 font-medium text-brandtext-600">
                                                    <Icons.gitHub size={16} />
                                                    {
                                                        bounty?.project
                                                            ?.githubRepo?.name
                                                    }
                                                </dt>
                                                <dd className="mt-1 inline-flex items-center gap-2 text-brandtext-500">
                                                    <span className="flex max-w-[300px] line-clamp-1">
                                                        {bounty.title}
                                                    </span>
                                                </dd>
                                            </div>
                                            <div className="flex w-full items-center justify-start gap-2 sm:justify-end">
                                                <div className="relative inline-flex h-6 w-6 flex-shrink-0 items-center justify-center overflow-hidden rounded-full">
                                                    {bounty?.submittedBy &&
                                                        bounty?.submittedBy
                                                            ?.image && (
                                                            <UserAvatar
                                                                user={{
                                                                    id: bounty
                                                                        .submittedBy
                                                                        .id,
                                                                    name: bounty
                                                                        .submittedBy
                                                                        .name,
                                                                }}
                                                            />
                                                        )}
                                                </div>
                                                <span className="text-brandtext-600">
                                                    &middot;
                                                </span>
                                                <span className="whitespace-nowrap text-sm text-brandtext-600">
                                                    Created{" "}
                                                    {dateToNow(
                                                        bounty.createdAt
                                                    )}{" "}
                                                    ago
                                                </span>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    {/* @ts-expect-error Server Component */}
                    <BountyEmptyPlaceholder />
                </>
            )}
            {bountyCount > pageSize && (
                <Pagination
                    baseUrl="/browse"
                    pageSize={pageSize}
                    itemCount={bountyCount}
                />
            )}
        </>
    )
}
