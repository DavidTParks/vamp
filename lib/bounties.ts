import "server-only"

import { Bounty, Project } from "@prisma/client"
import { cache } from "react"
import { db } from "./db"
import { getCurrentUser } from "./session"
import { Prisma } from "@prisma/client"
import { sortQueryToOrderBy } from "@/config/search"

type TBountiesForProject = {
    pageSize: number
    skip: number
    sort?: string
    whereQuery: Prisma.BountyWhereInput
}

type TBountyCount = {
    whereQuery: Prisma.BountyWhereInput
}

export const preloadBounties = ({
    pageSize,
    skip,
    sort,
    whereQuery,
}: TBountiesForProject) => {
    void getBountiesForProject({
        pageSize,
        skip,
        sort,
        whereQuery,
    })
}

export const getBountiesForProject = cache(
    async ({ pageSize, skip, sort, whereQuery }: TBountiesForProject) => {
        return db.bounty.findMany({
            take: pageSize,
            skip,
            // @ts-ignore
            orderBy: sortQueryToOrderBy[sort] ?? {
                createdAt: "desc",
            },
            include: {
                project: {
                    include: {
                        githubRepo: true,
                    },
                },
                bountySubmissions: true,
                submittedBy: true,
            },
            where: whereQuery,
        })
    }
)

export const getBountyCount = cache(async ({ whereQuery }: TBountyCount) => {
    return db.bounty.count({
        where: whereQuery,
    })
})

export type TProjectBountyReturn = Prisma.PromiseReturnType<
    typeof getBountiesForProject
>

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
                deleted: false,
            },
        })

        return bounties
    }
)
