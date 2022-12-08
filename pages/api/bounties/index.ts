import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"
import { unstable_getServerSession } from "next-auth/next"

import { db } from "@/lib/db"
import { withMethods } from "@/lib/api-middlewares/with-methods"
import { authOptions } from "@/lib/auth"
import { withProject } from "@/lib/api-middlewares/with-project"

const bountyCreateSchema = z.object({
    title: z.string().optional(),
    content: z.any().optional(),
    projectId: z.string().cuid(),
    issue: z.any().optional(),
    issueLink: z.string().optional(),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
        return res.status(403).end()
    }

    if (req.method === "POST") {
        try {
            const body = bountyCreateSchema.parse(req.body)

            const bounty = await db.bounty.create({
                data: {
                    title: body.title,
                    content: body?.issue?.body ?? body.content,
                    description: body?.issue?.description ?? "",
                    issueLink: body?.issueLink,
                    project: {
                        connect: {
                            id: body.projectId,
                        },
                    },
                    githubIssue: body?.issue,
                },
                select: {
                    id: true,
                },
            })

            return res.json(bounty)
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(422).json(error.issues)
            }

            return res.status(500).end()
        }
    }
}

export default withMethods(["GET", "POST"], withProject(handler))
