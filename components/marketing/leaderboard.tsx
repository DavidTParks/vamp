import { db } from "@/lib/db"
import { Button } from "@/ui/button"
import Image from "next/image"
import { UserAvatar } from "../dashboard/user-avatar"
import { Skeleton } from "@/ui/skeleton"
import { Pagination } from "@/ui/pagination"
import Link from "next/link"
import { ExternalLink } from "@/ui/external-link"

export const LeaderBoardLoading = () => {
    return (
        <div className="sm:px-6 lg:px-8">
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-palette-300  md:rounded-lg">
                            <table className="min-w-full divide-y divide-palette-300">
                                <thead className="bg-appbg">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-brandtext-500 sm:pl-6"
                                        >
                                            Place
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-brandtext-500 sm:pl-6"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-brandtext-500 inline-flex items-center gap-2"
                                        >
                                            Blood{" "}
                                            <Image
                                                alt="blood icon"
                                                src={`/achievements/blood.png`}
                                                height={24}
                                                width={24}
                                            />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-palette-300 bg-appbg">
                                    {Array.from(Array(10), (e, i) => {
                                        return (
                                            <tr key={e}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                    <div className="flex items-center justify-start gap-4">
                                                        <Skeleton className="w-full h-9" />
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                    <Skeleton className="w-full h-9" />
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-brandtext-500">
                                                    <Skeleton className="w-full h-9" />
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

type TLeaderboard = {
    page: number
    search?: string
    pageSize?: number
    projectId?: string
    sortQuery?: string
    includeResolved?: boolean
    showPagination: boolean
}

export async function LeaderBoard({
    page,
    search,
    sortQuery,
    pageSize = 10,
    showPagination = false,
}: TLeaderboard) {
    const skip = (page - 1) * pageSize

    const [users, userCount] = await Promise.all([
        db.user.findMany({
            take: pageSize,
            skip: skip && !isNaN(skip) ? skip : 0,
            orderBy: {
                blood: "desc",
            },
        }),
        db.user.count(),
    ])

    const getLeaderBoardPosition = (index: number) => {
        return index + 1 + (page - 1) * pageSize
    }

    return (
        <>
            <div className="sm:px-6 lg:px-8">
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-palette-300  md:rounded-lg">
                                <table className="min-w-full divide-y divide-palette-300">
                                    <thead className="bg-appbg">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-brandtext-500 sm:pl-6"
                                            >
                                                Place
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-brandtext-500 sm:pl-6"
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-brandtext-500 inline-flex items-center gap-2"
                                            >
                                                Blood{" "}
                                                <Image
                                                    alt="blood icon"
                                                    src={`/achievements/blood.png`}
                                                    height={24}
                                                    width={24}
                                                />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-palette-300 bg-appbg">
                                        {users.map((user, index) => (
                                            <tr key={user.id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                    <div className="flex items-center justify-start gap-4">
                                                        {getLeaderBoardPosition(
                                                            index
                                                        )}
                                                        {getLeaderBoardPosition(
                                                            index
                                                        ) === 1 && (
                                                            <Image
                                                                alt="gold"
                                                                src="/achievements/gold.png"
                                                                height={24}
                                                                width={24}
                                                            />
                                                        )}
                                                        {getLeaderBoardPosition(
                                                            index
                                                        ) === 2 && (
                                                            <Image
                                                                alt="silver"
                                                                src="/achievements/silver.png"
                                                                height={24}
                                                                width={24}
                                                            />
                                                        )}
                                                        {getLeaderBoardPosition(
                                                            index
                                                        ) === 3 && (
                                                            <Image
                                                                alt="bronze"
                                                                src="/achievements/bronze.png"
                                                                height={24}
                                                                width={24}
                                                            />
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                    <div className="flex items-center justify-start">
                                                        <div className="h-10 w-10 flex-shrink-0">
                                                            <UserAvatar
                                                                user={{
                                                                    id: user.id,
                                                                    name: user.name,
                                                                }}
                                                            />
                                                        </div>
                                                        <Link
                                                            href={`/u/${user.id}`}
                                                        >
                                                            <div className="ml-2 hover:underline hover:brightness-150">
                                                                <div className=" text-brandtext-500">
                                                                    {user.name}
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-brandtext-500">
                                                    {user.blood}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {showPagination && (
                    <div className="mt-8">
                        <Pagination
                            baseUrl="/leaderboard"
                            pageSize={10}
                            itemCount={userCount}
                        />
                    </div>
                )}
            </div>
        </>
    )
}
