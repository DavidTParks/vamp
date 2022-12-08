import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"

import { withMethods } from "@/lib/api-middlewares/with-methods"
import { withBounty } from "@/lib/api-middlewares/with-bounty"
import { db } from "@/lib/db"
import { bountyPatchSchema } from "@/lib/validations/bounty"

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "DELETE") {
        try {
            await db.bounty.delete({
                where: {
                    id: req.query.bountyId as string,
                },
            })

            return res.status(204).end()
        } catch (error) {
            return res.status(500).end()
        }
    }

    if (req.method === "PATCH") {
        try {
            const bountyId = req.query.bountyId as string
            const post = await db.bounty.findUnique({
                where: {
                    id: bountyId,
                },
            })

            const body = bountyPatchSchema.parse(req.body)

            // TODO: Implement sanitization for content.

            await db.bounty.update({
                where: {
                    id: post.id,
                },
                data: {
                    title: body.title || post.title,
                    content: body.content,
                    html: body.html,
                    bountyPrice: parseFloat(body.bountyPrice),
                    published: true,
                },
            })

            return res.end()
        } catch (error) {
            console.log("Error", error)
            if (error instanceof z.ZodError) {
                return res.status(422).json(error.issues)
            }

            return res.status(422).end()
        }
    }
}

export default withMethods(["DELETE", "PATCH"], withBounty(handler))
