import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"

import { withMethods } from "@/lib/api-middlewares/with-methods"
import { withBounty } from "@/lib/api-middlewares/with-bounty"
import { db } from "@/lib/db"
import { bountyPatchSchema } from "@/lib/validations/bounty"
import { stripe } from "@/lib/stripe"

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
            const existingBounty = await db.bounty.findUniqueOrThrow({
                where: {
                    id: bountyId,
                },
                include: {
                    project: true,
                },
            })

            if (!existingBounty.project.stripeProductId) {
                throw new Error("No stripe product ID for project")
            }

            const body = bountyPatchSchema.parse(req.body)

            const stripePrice = await stripe.prices.create({
                unit_amount: parseFloat(body.bountyPrice) * 100,
                currency: "usd",
                product: existingBounty.project.stripeProductId,
            })

            const bounty = await db.bounty.update({
                where: {
                    id: existingBounty.id,
                },
                data: {
                    title: body.title || existingBounty.title,
                    content: body.content,
                    html: body.html,
                    bountyPrice: parseFloat(body.bountyPrice),
                    published: true,
                    stripePriceId: stripePrice.id,
                },
            })

            return res.json(bounty)
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
