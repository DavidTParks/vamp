import "server-only"

import { Project } from "@prisma/client"
import { cache } from "react"
import { db } from "./db"

export const preloadBounties = (projectId: Project["id"]) => {
    void getBountiesForProject(projectId)
}

export const getBountiesForProject = cache(async (projectId: Project["id"]) => {
    return await db.bounty.findMany({
        where: {
            projectId,
        },
        include: {
            project: true,
            bountySubmissions: {
                include: {
                    user: true,
                },
            },
        },
        orderBy: {
            updatedAt: "desc",
        },
    })
})
