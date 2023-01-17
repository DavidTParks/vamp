import "server-only"

import { Bounty, Project } from "@prisma/client"
import { cache } from "react"
import { db } from "./db"
import { getCurrentUser } from "./session"
import { Prisma } from "@prisma/client"
import { sortQueryToOrderBy } from "@/config/search"
import { z } from "zod"
import { BountySubmission, User } from "@prisma/client"
import { Await, ArrayElement } from "types"

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
                    bounties: {
                        where: {
                            deleted: false,
                        },
                    },
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

export const fetchSubmissionsPaginatedSchema = z.object({
    bountyId: z.string().cuid(),
    limit: z.number().min(1).max(100).default(10),
    cursor: z.string().nullish(),
    initialCursor: z.string().nullish(),
})

type TFetchSubmissionsPaginated = z.infer<
    typeof fetchSubmissionsPaginatedSchema
>

// In memory cache to preserve bounty submission cursor based pagination results
const cachedItems: (BountySubmission & {
    user: User
})[] = []

export const fetchSubmissionsPaginated = cache(
    async (params: TFetchSubmissionsPaginated) => {
        const { bountyId, limit, cursor, initialCursor } =
            fetchSubmissionsPaginatedSchema.parse(params)

        const items = await db.bountySubmission.findMany({
            // get an extra item to know if there's a next page
            take: limit + 1,
            where: {
                bounty: {
                    id: bountyId,
                },
            },
            include: {
                user: true,
            },
            cursor: cursor
                ? {
                      id: cursor,
                  }
                : undefined,
            orderBy: {
                createdAt: "desc",
            },
        })

        let nextCursor: string | undefined = undefined

        if (items.length > limit) {
            // Remove the last item and use it as next cursor

            const lastItem = items.pop()!
            nextCursor = lastItem.id
        }

        // This is pretty hacky, if you know a better way to preserve cursor based paginated items please open a PR
        // Basically, just preserve an in-memory cache and deduplicate items on concat of new items
        cachedItems.push(...items)
        const arrUniq = cachedItems.filter(
            (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
        )

        return {
            items: arrUniq,
            nextCursor,
        }
    }
)
