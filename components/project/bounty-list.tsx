import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"
import { Bounty } from "@prisma/client"
import Link from "next/link"
import { Icons } from "../icons"
import { TProject } from "./secondary-nav"

type TBountyList = {
    bounties: Bounty[]
    project: TProject
    page?: number | string
}

export default function BountyList({ bounties, project, page }: TBountyList) {
    return (
        <div className="flex flex-col relative divide-y divide-palette-300">
            {bounties?.length ? (
                <>
                    {bounties?.map((bounty) => (
                        <div
                            className="p-4 pr-0 pl-0 flex flex-col sm:flex-row items-start justify-between sm:items-center gap-4 sm:gap-0"
                            key={bounty.id}
                        >
                            <div className="flex items-center gap-2">
                                <Icons.circleDot
                                    size={16}
                                    className="text-green-400"
                                />
                                <Link
                                    href={`/project/${project.id}/bounty/${bounty.id}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-white font-medium text-sm hover:underline max-w-[128px] md:max-w-[256px] truncate"
                                >
                                    {bounty.title}
                                </Link>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <EmptyPlaceholder>
                    <EmptyPlaceholder.Icon name="gitHub" />
                    <EmptyPlaceholder.Title>No issues</EmptyPlaceholder.Title>
                    <EmptyPlaceholder.Description>
                        This Github repository does not have any issues, or any
                        issues that match this search query.
                    </EmptyPlaceholder.Description>
                </EmptyPlaceholder>
            )}
        </div>
    )
}
