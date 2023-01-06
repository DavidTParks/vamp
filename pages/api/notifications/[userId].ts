import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"
import { db } from "@/lib/db"
import { withMethods } from "@/lib/api-middlewares/with-methods"
import { notificationGetSchema } from "@/lib/validations/notifications"

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const body = notificationGetSchema.parse(req.query)
            const limit = body.limit ?? 1
            const cursor = body.cursor ?? body.initialCursor

            const items = await db.notification.findMany({
                // get an extra item to know if there's a next page
                take: limit + 1,
                where: {
                    users: {
                        every: {
                            user: {
                                id: req.query.userId as string,
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

                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const lastItem = items.pop()!
                nextCursor = lastItem.id
            }

            res.status(200).json({
                items: items,
                nextCursor,
            })
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(422).json(error.issues)
            }

            return res.status(422).end()
        }
    }
}

export default withMethods(["GET"], handler)
