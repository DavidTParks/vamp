import "server-only"

import { Bounty, Project } from "@prisma/client"
import { cache } from "react"
import { db } from "./db"
import { getCurrentUser } from "./session"

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
                    bounties: true,
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

export const isBountyOwner = cache(
    async (bountyId: Bounty["id"]): Promise<boolean> => {
        const user = await getCurrentUser()

        const count = await db.bounty.count({
            where: {
                id: bountyId,
                project: {
                    users: {
                        some: {
                            userId: user?.id,
                        },
                    },
                },
            },
        })

        return Boolean(user && count > 0)
    }
)

type TFetchBountes = {
    take: number
    skip: number
}

export const fetchBounties = cache(
    async ({ take = 10, skip = 0 }: TFetchBountes) => {
        const bounties = await db.bounty.findMany({
            take,
            skip,
            include: {
                project: true,
                bountySubmissions: true,
                submittedBy: true,
            },
            where: {
                published: true,
            },
        })

        return bounties
    }
)
