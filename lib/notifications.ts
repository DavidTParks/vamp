import "server-only"

import { User } from "@prisma/client"
import { cache } from "react"
import { db } from "./db"

export const preloadNotifications = (userId: User["id"]) => {
    void getUnreadNotificationCount(userId)
}

export const getUnreadNotificationCount = cache(async (userId: User["id"]) => {
    return await db.userNotifications.count({
        where: {
            userId,
            read: false,
        },
    })
})
