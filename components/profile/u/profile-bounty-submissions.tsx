import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"
import { db } from "@/lib/db"
import { dateToNow } from "@/lib/utils"
import { Skeleton } from "@/ui/skeleton"
import { User } from "@prisma/client"
import Link from "next/link"

interface IUserProjectList {
    user: Pick<User, "id">
}

export async function UserBountySubmissionList({ user }: IUserProjectList) {
    const bountySubmissions = await db.bountySubmission.findMany({
        where: {
            user: {
                id: user.id,
            },
            bounty: {
                deleted: false,
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            user: true,
            bounty: {
                include: {
                    project: true,
                },
            },
        },
    })

    return (
        <>
            {bountySubmissions?.length ? (
                <div className="relative flex flex-col divide-y divide-palette-300">
                    {bountySubmissions.map((submission) => (
                        <div key={submission.id}>
                            <Link
                                className="flex items-center p-4 pr-0 pl-0 hover:brightness-150"
                                href={`/bounty/${submission.bounty.id}`}
                            >
                                <div className="flex w-full items-center justify-between">
                                    <div className="flex w-full items-center gap-2 text-sm text-brandtext-700 ">
                                        <span className="hidden sm:block">
                                            Submit a solution to
                                        </span>
                                        <div className="block max-w-[204px] truncate text-brandtext-500 sm:max-w-[256px]">
                                            {submission.bounty.title}
                                        </div>{" "}
                                    </div>
                                    <div className="whitespace-nowrap text-sm text-brandtext-600">
                                        {dateToNow(submission.createdAt)} ago
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <EmptyPlaceholder className="mt-4 min-h-[100px]">
                    <EmptyPlaceholder.Icon name="activity" />
                    <EmptyPlaceholder.Title>No Activity</EmptyPlaceholder.Title>
                    <EmptyPlaceholder.Description className="mb-0">
                        This user has not posted any bounties or submissions
                        yet.
                    </EmptyPlaceholder.Description>
                </EmptyPlaceholder>
            )}
        </>
    )
}

UserBountySubmissionList.Skeleton = function CardSkeleton() {
    return (
        <div className="relative flex w-full flex-col divide-y divide-palette-300">
            <div className="flex w-full items-center p-4 pr-0 pl-0">
                <Skeleton className="h-8 w-full" />
            </div>
            <div className="flex w-full items-center p-4 pr-0 pl-0">
                <Skeleton className="h-8 w-full" />
            </div>
            <div className="flex w-full items-center p-4 pr-0 pl-0">
                <Skeleton className="h-8 w-full" />
            </div>
            <div className="flex w-full items-center p-4 pr-0 pl-0">
                <Skeleton className="h-8 w-full" />
            </div>
            <div className="flex w-full items-center p-4 pr-0 pl-0">
                <Skeleton className="h-8 w-full" />
            </div>
        </div>
    )
}
