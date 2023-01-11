import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"
import { withMethods } from "@/lib/api-middlewares/with-methods"
import { sendMarketingMail } from "@/emails/index"
import SubmissionAccepted from "@/emails/SubmissionAccepted"
import { db } from "@/lib/db"

export const newSubmissionEmailSchema = z.object({
    apiKey: z.string(),
    bountyId: z.string().cuid(),
    bountyTitle: z.string(),
    user: z.object({
        email: z.string().email(),
        id: z.string().cuid(),
    }),
})

const PROTECTED_API_ROUTE_KEY = process.env.PROTECTED_API_ROUTE_KEY as string

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { apiKey, bountyId, bountyTitle, user } =
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
                    notificationSubmissionAccepted: true,
                },
            })

            if (dbUser?.notificationSubmissionAccepted) {
                await sendMarketingMail({
                    subject: "🦇 Your Bounty solution has been accepted!",
                    to: user.email,
                    component: (
                        <SubmissionAccepted
                            bountyTitle={bountyTitle}
                            bountyId={bountyId}
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
