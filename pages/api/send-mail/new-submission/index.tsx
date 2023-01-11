import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"
import { withMethods } from "@/lib/api-middlewares/with-methods"
import { sendMarketingMail } from "@/emails/index"
import SubmissionReceived from "@/emails/SubmissionReceived"
import { db } from "@/lib/db"

export const newSubmissionEmailSchema = z.object({
    apiKey: z.string(),
    bountyId: z.string().cuid(),
    bountyTitle: z.string(),
    projectName: z.string(),
    user: z.object({
        email: z.string().email(),
        id: z.string().cuid(),
    }),
})

const PROTECTED_API_ROUTE_KEY = process.env.PROTECTED_API_ROUTE_KEY as string

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { apiKey, bountyId, bountyTitle, projectName, user } =
            newSubmissionEmailSchema.parse(req.body)

        if (apiKey !== PROTECTED_API_ROUTE_KEY) {
            return res.status(401).json({ message: "API key not provided" })
        }

        try {
            const dbUser = await db.user.findUnique({
                where: {
                    id: user.id,
                },
                select: {
                    notificationNewSubmission: true,
                },
            })
            if (dbUser?.notificationNewSubmission) {
                await sendMarketingMail({
                    subject: "🦇 You've got a new Bounty submission",
                    to: user.email,
                    component: (
                        <SubmissionReceived
                            bountyTitle={bountyTitle}
                            bountyId={bountyId}
                            projectName={projectName}
                        />
                    ),
                })
                return res.status(200).json({ message: "Email sent" })
            } else {
                res.status(200).json({
                    message:
                        "User has opted not to receive new submission emails",
                })
            }
        } catch (error) {
            console.log("Error?", error)
            if (error instanceof z.ZodError) {
                return res.status(422).json(error.issues)
            }

            return res.status(422).end()
        }
    }
}

export default withMethods(["POST"], handler)
