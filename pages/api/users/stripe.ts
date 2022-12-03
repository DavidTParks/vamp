import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"
import { unstable_getServerSession } from "next-auth/next"

import { db } from "@/lib/db"
import { withMethods } from "@/lib/api-middlewares/with-methods"
import { withCurrentUser } from "@/lib/api-middlewares/with-current-user"
import { userNameSchema } from "@/lib/validations/user"
import { authOptions } from "@/lib/auth"
import { stripe } from "@/lib/stripe"
import { getCurrentUser } from "@/lib/session"

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
                const account = await stripe.accounts.retrieve(
                    userAccount.stripeCustomerId
                )

                console.log("Account", account)

                const accountLink = await stripe.accountLinks.create({
                    account: account.id,
                    refresh_url:
                        "http://localhost:3000/dashboard/settings/billing",
                    return_url:
                        "http://localhost:3000/dashboard/settings/billing",
                    type: "account_onboarding",
                })
                res.json(accountLink)
            } else {
                const account = await stripe.accounts.create({
                    type: "express",
                    business_type: "individual",
                })

                const accountLink = await stripe.accountLinks.create({
                    account: account.id,
                    refresh_url:
                        "http://localhost:3000/dashboard/settings/billing",
                    return_url:
                        "http://localhost:3000/dashboard/settings/billing",
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
