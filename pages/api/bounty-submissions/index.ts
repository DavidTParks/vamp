import { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth/next"
import * as z from "zod"

import { withAuthentication } from "@/lib/api-middlewares/with-authentication"
import { withMethods } from "@/lib/api-middlewares/with-methods"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

const bountyCreateSchema = z.object({
    solutionLink: z.string().min(1),
    comments: z.string().optional(),
    bountyId: z.string().cuid(),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
        return res.status(403).end()
    }

    if (req.method === "POST") {
        try {
            const body = bountyCreateSchema.parse(req.body)

            const bountySubmission = await db.bountySubmission.create({
                data: {
                    comments: body.comments,
                    solutionLink: body.solutionLink,
                    bounty: {
                        connect: {
                            id: body.bountyId,
                        },
                    },
                    user: {
                        connect: {
                            id: session.user.id,
                        },
                    },
                },
                select: {
                    id: true,
                },
            })

            return res.json(bountySubmission)
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(422).json(error.issues)
            }

            return res.status(500).end()
        }
    }
}

export default withMethods(["POST"], withAuthentication(handler))
