/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { db } from "@/lib/db"
import { z } from "zod"
import { publicProcedure, router } from "../trpc"

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */

export const notificationRouter = router({
    list: publicProcedure
        .input(
            z.object({
                userId: z.string().cuid(),
                limit: z.number().min(1).max(100).default(10),
                cursor: z.string().nullish(),
                initialCursor: z.string().nullish(),
            })
        )
        .query(async ({ input }) => {
            const limit = input.limit ?? 20
            const cursor = input.cursor ?? input.initialCursor

            const items = await db.notification.findMany({
                // get an extra item to know if there's a next page
                take: limit + 1,
                where: {
                    users: {
                        every: {
                            user: {
                                id: input.userId,
                            },
                        },
                    },
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

            return {
                items: items,
                nextCursor,
            }
        }),
})
