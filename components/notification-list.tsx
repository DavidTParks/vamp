"use client"

import { TUser } from "@/components/dashboard/user-account-nav"
import { useIsIntersecting } from "@/hooks/use-is-intersecting"
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite"
import { Fragment } from "react"
import { Notification } from "@prisma/client"
import { trpc } from "@/client/trpcClient"

export interface INotificationList {
    user: TUser
}

export function NotificationList({ user }: INotificationList) {
    const [isLoadMoreVisible, ref] = useIsIntersecting<HTMLDivElement>()

    const myQuery = trpc.notification.list.useInfiniteQuery(
        {
            limit: 10,
            userId: user.id,
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    )

    return (
        <ul
            role="list"
            className="divide-y divide-palette-300 max-h-[300px] overflow-y-scroll"
        >
            {/* {notifications.map((notification) => (
                <li className="p-4" key={notification.id}>
                    {notification.title}
                </li>
            ))} */}
        </ul>
    )
}
