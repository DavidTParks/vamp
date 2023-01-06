import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"
import { unstable_getServerSession } from "next-auth/next"

import { db } from "@/lib/db"
import { withMethods } from "@/lib/api-middlewares/with-methods"
import { authOptions } from "@/lib/auth"
import { withProject } from "@/lib/api-middlewares/with-project"
import { getRenderedMarkdown } from "@/lib/markdown"

const bountyCreateSchema = z.object({
    title: z.string(),
    content: z.any().optional(),
    projectId: z.string().cuid(),
    issue: z.any().optional(),
    issueLink: z.string().optional().nullable(),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
        return res.status(403).end()
    }

    if (req.method === "POST") {
        try {
            const body = bountyCreateSchema.parse(req.body)

            let issueContent: any = undefined
            try {
                if (body?.issue) {
                    issueContent = await getRenderedMarkdown(
                        body.issue.body,
                        session.user
                    )
                }
            } catch (e) {
                console.log(e)
            }

            const bounty = await db.bounty.create({
                data: {
                    title: body.title,
                    content: issueContent ?? undefined,
                    description: body?.issue?.description ?? "",
                    issueLink: body?.issueLink,
                    project: {
                        connect: {
                            id: body.projectId,
                        },
                    },
                    githubIssue: body?.issue,
                    submittedBy: {
                        connect: {
                            id: session?.user?.id,
                        },
                    },
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
