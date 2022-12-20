import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"
import { formatDate, formatDollars, dateToNow } from "@/lib/utils"
import { Button } from "@/ui/button"
import { Bounty, Project, User, BountySubmission } from "@prisma/client"
import { TProject } from "@/components/project/secondary-nav"
import { Icons } from "../icons"
import Image from "next/image"
import { fetchBounties } from "@/lib/bounties"
import { getCurrentUser } from "@/lib/session"
import { db } from "@/lib/db"
import { BountyEmptyPlaceholder } from "./bounty-empty-placeholder"

import Link from "next/link"

type TIssueList = {
    page: number
    search?: string
    pageSize?: number
}

export async function BrowseBountyList({
    page,
    search,
    pageSize = 10,
}: TIssueList) {
    const bounties = await db.bounty.findMany({
        take: pageSize,
        skip: page ?? 0 * 10,
        orderBy: {
            createdAt: "desc",
        },
        include: {
            project: true,
            bountySubmissions: true,
            submittedBy: true,
        },
        where: {
            published: true,
            title: {
                search,
            },
            description: {
                search,
            },
        },
    })

    return (
        <>
            {bounties?.length ? (
                <div className="divide-y divide-raised-border rounded-md overflow-hidden border-raised-border border">
                    <div className="divide-y divide divide-raised-border">
                        {bounties?.map((bounty) => (
                            <Link
                                className="block"
                                key={bounty.id}
                                href={
                                    bounty?.published
                                        ? `/bounty/${bounty.id}`
                                        : `/bounty/${bounty.id}/edit`
                                }
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
                                    <div className="flex items-center p-4 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:p-6 pb-0">
                                        <dl className="grid flex-1 grid-cols-1 gap-4 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-4 lg:col-span-3">
                                            <div className="flex gap-4">
                                                <div className="flex-shrink-0 hidden sm:block">
                                                    {!bounty.published &&
                                                        !bounty.resolved && (
                                                            <Icons.edit2
                                                                size={24}
                                                                className="text-yellow-600 mt-2"
                                                            />
                                                        )}
                                                    {bounty.published &&
                                                        !bounty.resolved && (
                                                            <Icons.circleDot
                                                                size={24}
                                                                className="text-green-600 mt-2"
                                                            />
                                                        )}

                                                    {bounty.resolved && (
                                                        <Icons.check
                                                            size={24}
                                                            className="text-purple-600 mt-2"
                                                        />
                                                    )}
                                                </div>

                                                <div>
                                                    <dt className="font-medium text-brandtext-600">
                                                        {bounty.project.name}
                                                    </dt>
                                                    <dd className="mt-1 text-brandtext-500 inline-flex items-center gap-2">
                                                        <span className=" line-clamp-1 flex">
                                                            {bounty.title}
                                                        </span>
                                                    </dd>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <dt className="font-medium text-brandtext-600">
                                                        Bounty
                                                    </dt>
                                                    <dd className="mt-1 text-brandtext-500">
                                                        {formatDollars(
                                                            bounty.bountyPrice
                                                        )}
                                                    </dd>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
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
                                                    {bounty.submittedBy.name}{" "}
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
        </>
    )
}
