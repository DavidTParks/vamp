import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"
import { formatDate, formatDollars } from "@/lib/utils"
import { Button } from "@/ui/button"
import { Bounty } from "@prisma/client"
import { TProject } from "./secondary-nav"
import { Icons } from "../icons"
import { BountyOperations } from "./bounty-operations"

type TBountyList = {
    bounties: Bounty[]
    project: TProject
    page?: number | string
}

export default function BountyList({ bounties, project, page }: TBountyList) {
    const draftCount = bounties.filter(
        (bounty) => bounty.published === false
    ).length

    const activeCount = bounties.filter(
        (bounty) => bounty.published === true && bounty.resolved === false
    ).length

    return (
        <>
            <div className="divide-y divide-raised-border rounded-md overflow-hidden border border-raised-border">
                <div className="flex items-center p-6 py-3 gap-6 bg-raised">
                    <Button
                        size="noPadding"
                        intent="tertiary"
                        className="text-white inline-flex gap-1 items-center"
                    >
                        <Icons.edit2 size={16} className="text-brandtext-600" />
                        <span className="text-sm text-brandtext-600">
                            {draftCount} Drafts
                        </span>
                    </Button>
                    <Button
                        size="noPadding"
                        intent="tertiary"
                        className="text-white inline-flex gap-1 items-center"
                    >
                        <Icons.circleDot
                            size={16}
                            className="text-brandtext-600"
                        />
                        <span className="text-sm text-brandtext-600">
                            {activeCount} Active
                        </span>
                    </Button>
                    <Button
                        size="noPadding"
                        intent="tertiary"
                        className="text-white inline-flex gap-1 items-center"
                    >
                        <Icons.check size={16} className="text-brandtext-600" />
                        <span className="text-sm text-brandtext-600">
                            {activeCount} Resolved
                        </span>
                    </Button>
                </div>
                {bounties?.map((bounty) => (
                    <div
                        className=" hover:bg-palette-150 cursor-pointer"
                        key={bounty.id}
                    >
                        <h3 className="sr-only">
                            Bounty placed on{" "}
                            <time dateTime={bounty.createdAt.toString()}>
                                {formatDate(bounty.createdAt.toString())}
                            </time>
                        </h3>
                        <div className="flex items-center p-4 pb-4 sm:pb-0 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:p-6">
                            <dl className="grid flex-1 grid-cols-1 gap-4 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-4 lg:col-span-3">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 hidden sm:block">
                                        <Icons.edit2
                                            size={24}
                                            className="text-yellow-600 mt-2"
                                        />
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
                                            {formatDollars(bounty.bountyPrice)}
                                        </dd>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 items-center hidden sm:inline-flex w-full">
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
                            </dl>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
