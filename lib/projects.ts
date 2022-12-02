import "server-only"

import { db } from "./db"
import { cache } from "react"
import { User } from "@prisma/client"

export const preloadProjects = (userId: User["id"]) => {
    void getProjectsForUser(userId)
}

export const getProjectsForUser = cache(async (userId: User["id"]) => {
    return await db.projectUsers.findMany({
        where: {
            userId,
        },
        include: {
            project: {
                include: {
                    users: true,
                },
            },
            user: {
                include: {
                    accounts: true,
                },
            },
        },
        orderBy: {
            updatedAt: "desc",
        },
    })
})
