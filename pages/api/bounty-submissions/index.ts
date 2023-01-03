import { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth/next"
import * as z from "zod"
import { NOTIFICATIONTYPE } from "@prisma/client"
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
            const bountySubmission = await db.$transaction(async (tx) => {
                // Create submission record
                const submission = await tx.bountySubmission.create({
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
                    include: {
                        user: true,
                        bounty: {
                            include: {
                                project: {
                                    include: {
                                        users: {
                                            include: {
                                                user: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                })

                await tx.notification.create({
                    data: {
                        type: NOTIFICATIONTYPE.SUBMISSIONRECIEVED,
                        message: body.comments,
                        title: `Submission received on ${submission.bounty.title} from ${submission.user.name}`,
                        bounty: {
                            connect: {
                                id: body.bountyId,
                            },
                        },
                        bountySubmission: {
                            connect: {
                                id: submission.id,
                            },
                        },
                        users: {
                            create: submission.bounty.project.users.map(
                                (projectUser) => {
                                    return {
                                        user: {
                                            connect: {
                                                id: projectUser.user.id,
                                            },
                                        },
                                    }
                                }
                            ),
                        },
                    },
                })

                return submission
            })

            return res.json(bountySubmission)
        } catch (error) {
            console.log("Error", error)
            if (error instanceof z.ZodError) {
                return res.status(422).json(error.issues)
            }

            return res.status(500).end()
        }
    }
}

export default withMethods(["POST"], withAuthentication(handler))
