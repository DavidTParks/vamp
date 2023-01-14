import "server-only"

import { User } from "@prisma/client"
import { cache } from "react"
import { db } from "./db"

export const preloadProjects = (userId: User["id"]) => {
    void getUserById(userId)
}

export const getUserById = cache(async (userId: User["id"]) => {
    return await db.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            projects: true,
            bounties: true,
            bountySubmissions: true,
            accounts: true,
        },
    })
})
