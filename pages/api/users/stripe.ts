import { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth/next"
import * as z from "zod"

import { withMethods } from "@/lib/api-middlewares/with-methods"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"

export type returnUrlQueryParams =
    | "stripeAccountUpdate"
    | "stripeAccountCreation"
    | null

async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("Have session")
    if (req.method === "GET") {
        try {
            const session = await unstable_getServerSession(
                req,
                res,
                authOptions
            )

            const user = session?.user

            const userAccount = await db.user.findUnique({
                where: {
                    id: user.id,
                },
            })

            if (userAccount?.stripeCustomerId) {
                const accountLink = await stripe.accountLinks.create({
                    account: userAccount?.stripeCustomerId,
                    refresh_url:
                        "http://localhost:3000/dashboard/settings/billing?from=stripeAccountUpdate",
                    return_url:
                        "http://localhost:3000/dashboard/settings/billing?from=stripeAccountUpdate",
                    type: "account_onboarding",
                })
                res.json(accountLink)
            } else {
                const account = await stripe.accounts.create({
                    type: "express",
                    business_type: "individual",
                    metadata: {
                        userId: user.id,
                    },
                })

                const accountLink = await stripe.accountLinks.create({
                    account: account.id,
                    refresh_url:
                        "http://localhost:3000/dashboard/settings/billing?from=stripeAccountCreation",
                    return_url:
                        "http://localhost:3000/dashboard/settings/billing?from=stripeAccountCreation",
                    type: "account_onboarding",
                })
                res.json(accountLink)
            }
        } catch (error) {
            console.log("ERror", error)
            if (error instanceof z.ZodError) {
                return res.status(422).json(error.issues)
            }

            return res.status(422).end()
        }
    }
}

export default withMethods(["GET"], handler)
