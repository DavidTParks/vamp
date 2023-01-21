import { db } from "@/lib/db"
import { User } from "@prisma/client"
import Link from "next/link"
import Image from "next/image"
import { Skeleton } from "@/ui/skeleton"
import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"
import { getUserAchievements } from "@/lib/users"
import { Fragment } from "react"
import { Tooltip } from "@/ui/tooltip"

interface IUserProjectList {
    user: Pick<User, "id">
}

export async function UserAchievements({ user }: IUserProjectList) {
    const achievements = await getUserAchievements(user.id)

    return (
        <>
            {achievements?.length ? (
                <div className="mt-4 grid w-full grid-cols-4 place-items-center gap-2">
                    <Fragment>
                        {achievements.map((achievement) => (
                            <Fragment key={achievement.title}>
                                <Tooltip
                                    content={
                                        <div className="flex flex-col items-center justify-center p-5">
                                            <Image
                                                alt={achievement.title}
                                                height={64}
                                                width={64}
                                                src={achievement.image}
                                            />
                                            <h4 className="mt-4 text-center text-lg font-bold text-brandtext-500">
                                                {achievement.title}
                                            </h4>
                                            <p className="mt-2 max-w-[256px] text-center text-sm text-brandtext-600">
                                                {achievement.description}
                                            </p>
                                        </div>
                                    }
                                >
                                    <div className="relative flex flex-none items-center justify-center overflow-hidden rounded-full border border-zinc-700/50 bg-zinc-800 p-3  shadow-md shadow-zinc-800/5 ring-0 ring-zinc-900/5 hover:brightness-150">
                                        <Image
                                            alt={achievement.title}
                                            height={40}
                                            width={40}
                                            src={achievement.image}
                                        />
                                    </div>
                                </Tooltip>
                            </Fragment>
                        ))}
                    </Fragment>
                </div>
            ) : (
                <EmptyPlaceholder className="mt-4 min-h-[100px]">
                    <EmptyPlaceholder.Icon name="trophy" />
                    <EmptyPlaceholder.Title>
                        No Evil Relics
                    </EmptyPlaceholder.Title>
                    <EmptyPlaceholder.Description className="mb-0">
                        Post or solve Bounties to begin earning Evil Relics.
                    </EmptyPlaceholder.Description>
                </EmptyPlaceholder>
            )}
        </>
    )
}

UserAchievements.Skeleton = function AchievementsSkeleton() {
    return (
        <>
            <div className="mt-4 grid w-full grid-cols-4 place-items-center gap-2">
                {Array.from(Array(8), (e, i) => {
                    return (
                        <div
                            key={e}
                            className="relative flex flex-none items-center justify-center overflow-hidden rounded-full border border-zinc-700/50 bg-zinc-800 p-3  shadow-md shadow-zinc-800/5 ring-0 ring-zinc-900/5 hover:brightness-150"
                        >
                            <Skeleton className="inline-flex h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-full" />
                        </div>
                    )
                })}
            </div>
        </>
    )
}
