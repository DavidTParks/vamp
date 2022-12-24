import { db } from "@/lib/db"
import { dateToNow, formatDate, formatDollars } from "@/lib/utils"
import { Pagination } from "@/ui/pagination"
import Image from "next/image"
import Link from "next/link"
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
                <div className="divide-y divide-raised-border rounded-md overflow-hidden border-raised-border border">
                    <div className="divide-y divide divide-raised-border">
                        {bounties?.map((bounty) => (
                            <Link
                                className="block"
                                key={bounty.id}
                                href={`/bounty/${bounty.id}`}
                            >
                                <div className="hover:bg-palette-150 cursor-pointer">
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
                                    <div className="flex items-center p-4 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:p-6 py-3">
                                        <dl className="grid flex-1 grid-cols-1 gap-4 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-4 lg:col-span-3">
                                            <div className="flex gap-4 items-center">
                                                <div className="flex-shrink-0">
                                                    <Icons.circleDot
                                                        size={24}
                                                        className="text-green-600 mt-2"
                                                    />
                                                </div>
                                                <dl className="flex flex-col items-start">
                                                    <dt className="font-medium text-brandtext-600">
                                                        Bounty
                                                    </dt>
                                                    <dd className="mt-1 text-brandtext-500">
                                                        {formatDollars(
                                                            bounty.bountyPrice
                                                        )}
                                                    </dd>
                                                </dl>
                                            </div>
                                            <div className="flex flex-col items-start col-span-2">
                                                <dt className="font-medium text-brandtext-600 inline-flex items-center gap-1">
                                                    <Icons.gitHub size={16} />
                                                    {
                                                        bounty.project
                                                            .githubRepo.name
                                                    }
                                                </dt>
                                                <dd className="mt-1 text-brandtext-500 inline-flex items-center gap-2">
                                                    <span className="line-clamp-1 flex max-w-[300px]">
                                                        {bounty.title}
                                                    </span>
                                                </dd>
                                            </div>
                                            <div className="flex items-center gap-2 w-full justify-start sm:justify-end">
                                                <div className="h-6 w-6 rounded-full overflow-hidden relative inline-flex justify-center items-center flex-shrink-0">
                                                    <Image
                                                        alt={`${bounty.submittedBy.name} profile picture`}
                                                        fill
                                                        src={
                                                            bounty.submittedBy
                                                                .image
                                                        }
                                                    />
                                                </div>
                                                <span className="text-brandtext-600">
                                                    &middot;
                                                </span>
                                                <span className="text-brandtext-600 text-sm whitespace-nowrap">
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
