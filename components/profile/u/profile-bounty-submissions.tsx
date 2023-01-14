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
                <div className="flex flex-col relative divide-y divide-palette-300">
                    {bountySubmissions.map((submission) => (
                        <div key={submission.id}>
                            <Link
                                className="p-4 pr-0 pl-0 flex items-center hover:brightness-150"
                                href={`/bounty/${submission.bounty.id}`}
                            >
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center w-full text-brandtext-700 gap-2 text-sm ">
                                        <span className="hidden sm:block">
                                            Submit a solution to
                                        </span>
                                        <div className="text-brandtext-500 truncate max-w-[204px] sm:max-w-[256px] block">
                                            {submission.bounty.title}
                                        </div>{" "}
                                    </div>
                                    <div className="text-brandtext-600 text-sm whitespace-nowrap">
                                        {dateToNow(submission.createdAt)} ago
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <EmptyPlaceholder className="min-h-[100px] mt-4">
                    <EmptyPlaceholder.Icon name="logo" />
                    <EmptyPlaceholder.Title>No projects</EmptyPlaceholder.Title>
                    <EmptyPlaceholder.Description className="mb-0">
                        This user does not have any projects
                    </EmptyPlaceholder.Description>
                </EmptyPlaceholder>
            )}
        </>
    )
}

UserBountySubmissionList.Skeleton = function CardSkeleton() {
    return (
        <div className="flex flex-col relative divide-y divide-palette-300 w-full">
            <div className="p-4 pr-0 pl-0 flex items-center w-full">
                <Skeleton className="h-8 w-full" />
            </div>
            <div className="p-4 pr-0 pl-0 flex items-center w-full">
                <Skeleton className="h-8 w-full" />
            </div>
            <div className="p-4 pr-0 pl-0 flex items-center w-full">
                <Skeleton className="h-8 w-full" />
            </div>
            <div className="p-4 pr-0 pl-0 flex items-center w-full">
                <Skeleton className="h-8 w-full" />
            </div>
            <div className="p-4 pr-0 pl-0 flex items-center w-full">
                <Skeleton className="h-8 w-full" />
            </div>
        </div>
    )
}
