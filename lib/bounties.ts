import "server-only"

import { Bounty, Project } from "@prisma/client"
import { cache } from "react"
import { db } from "./db"

export const preloadBounties = (projectId: Project["id"]) => {
    void getBountiesForProject(projectId)
}

export const getBountiesForProject = cache(async (projectId: Project["id"]) => {
    return db.bounty.findMany({
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

export const preloadBountyById = (projectId: Project["id"]) => {
    void getBountyById(projectId)
}

export const getBountyById = cache(async (bountyId: Bounty["id"]) => {
    return db.bounty.findUnique({
        where: {
            id: bountyId,
        },
        include: {
            project: {
                include: {
                    githubRepo: true,
                },
            },
            bountySubmissions: {
                include: {
                    user: true,
                },
            },
        },
    })
})
