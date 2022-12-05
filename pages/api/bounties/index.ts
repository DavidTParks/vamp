import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"
import { unstable_getServerSession } from "next-auth/next"

import { db } from "@/lib/db"
import { withMethods } from "@/lib/api-middlewares/with-methods"
import { authOptions } from "@/lib/auth"

const bountyCreateSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    projectId: z.string().cuid(),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
        return res.status(403).end()
    }

    const { user } = session

    if (req.method === "POST") {
        try {
            const body = bountyCreateSchema.parse(req.body)

            const post = await db.bounty.create({
                data: {
                    title: body.title,
                    content: body.content,
                    project: {
                        connect: {
                            id: body.projectId,
                        },
                    },
                },
                select: {
                    id: true,
                },
            })

            return res.json(post)
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(422).json(error.issues)
            }

            return res.status(500).end()
        }
    }
}

export default withMethods(["GET", "POST"], handler)
