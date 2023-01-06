import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"
import { TProjectBountyReturn } from "@/lib/bounties"
import { formatDate, formatDollars } from "@/lib/utils"
import Link from "next/link"
import { Icons } from "../icons"
import { BountyCreateButton } from "./bounty-create-button"
import { BountyOperations } from "./bounty-operations"
import { TProject } from "./secondary-nav"
import { db } from "@/lib/db"
import { PrismaPromise } from "@prisma/client"
import { Suspense } from "react"
import { Skeleton } from "@/ui/skeleton"

type TBountyList = {
    bountyPromise: Promise<TProjectBountyReturn>
    project: TProject
    showDrafts?: boolean
    showControls?: boolean
    children: React.ReactNode
}

export default async function BountyList({
    children,
    bountyPromise,
    project,
    showDrafts = true,
    showControls = true,
}: TBountyList) {
    const bounties = await bountyPromise

    const draftPromise = db.bounty.count({
        where: {
            projectId: project.id,
            published: false,
            resolved: false,
        },
    })

    const activePromise = db.bounty.count({
        where: {
            projectId: project.id,
            published: true,
            resolved: false,
        },
    })

    const resolvedPromise = db.bounty.count({
        where: {
            projectId: project.id,
            published: true,
            resolved: true,
        },
    })

    return (
        <>
            {bounties.length ? (
                <>
                    <div className="divide-y divide-raised-border rounded-md overflow-hidden border-raised-border border">
                        <div className="flex items-center p-6 py-3 gap-6 bg-raised">
                            <Suspense fallback={<Skeleton className="w-72" />}>
                                {showDrafts && (
                                    <>
                                        {/* @ts-expect-error Server Component */}
                                        <BountyCount
                                            label="Drafts"
                                            promise={draftPromise}
                                        >
                                            <Icons.edit2
                                                size={16}
                                                className="text-brandtext-600"
                                            />
                                        </BountyCount>
                                    </>
                                )}
                                {/* @ts-expect-error Server Component */}
                                <BountyCount
                                    label="Active"
                                    promise={activePromise}
                                >
                                    <Icons.circleDot
                                        size={16}
                                        className="text-brandtext-600"
                                    />
                                </BountyCount>

                                {/* @ts-expect-error Server Component */}
                                <BountyCount
                                    label="Resolved"
                                    promise={resolvedPromise}
                                >
                                    <Icons.check
                                        size={16}
                                        className="text-brandtext-600"
                                    />
                                </BountyCount>
                            </Suspense>
                        </div>
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
                                        <div className="flex items-center p-4 pb-4 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:p-6">
                                            <dl className="grid flex-1 grid-cols-1 gap-4 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-4 lg:col-span-3">
                                                <div className="flex gap-4">
                                                    <div className="flex-shrink-0 sm:block">
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
                                                            Bounty{" "}
                                                            {!bounty.published &&
                                                            !bounty.resolved
                                                                ? "(Draft)"
                                                                : null}
                                                        </dt>
                                                        <dd className="mt-1 text-brandtext-500 inline-flex items-center gap-2">
                                                            <span className=" line-clamp-1 flex">
                                                                {bounty.title}
                                                            </span>
                                                        </dd>
                                                    </div>
                                                </div>
                                                <div>
                                                    <dt className="font-medium text-brandtext-600">
                                                        Date placed
                                                    </dt>
                                                    <dd className="mt-1 text-brandtext-500">
                                                        <time
                                                            dateTime={bounty.createdAt.toString()}
                                                        >
                                                            {formatDate(
                                                                bounty.createdAt.toString()
                                                            )}
                                                        </time>
                                                    </dd>
                                                </div>
                                                <div>
                                                    <div>
                                                        <dt className="font-medium text-brandtext-600">
                                                            Bounty reward
                                                        </dt>
                                                        <dd className="mt-1 text-brandtext-500">
                                                            {formatDollars(
                                                                bounty?.bountyPrice ??
                                                                    0
                                                            )}
                                                        </dd>
                                                    </div>
                                                </div>
                                                {showControls && (
                                                    <div className="flex-shrink-0 items-center hidden sm:inline-flex justify-end w-full">
                                                        <BountyOperations
                                                            project={{
                                                                id: project.id,
                                                            }}
                                                            bounty={{
                                                                id: bounty.id,
                                                                title: bounty.title,
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </dl>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <EmptyPlaceholder>
                    <EmptyPlaceholder.Icon name="logo" />
                    <EmptyPlaceholder.Title>
                        No bounties created
                    </EmptyPlaceholder.Title>
                    <EmptyPlaceholder.Description>
                        You do not have any feature requests or issue bounties
                        yet. Create one and reward contributors!
                    </EmptyPlaceholder.Description>
                    <BountyCreateButton
                        project={{
                            id: project.id,
                        }}
                    />
                </EmptyPlaceholder>
            )}
            {children}
        </>
    )
}

type TBountyCount = {
    promise: PrismaPromise<number>
    children: React.ReactNode
    label: string
}

async function BountyCount({ promise, children, label }: TBountyCount) {
    const count = await promise

    return (
        <div className="text-white inline-flex gap-1 items-center">
            {children}
            <span className="text-sm text-brandtext-600">
                {count} {label}
            </span>
        </div>
    )
}
