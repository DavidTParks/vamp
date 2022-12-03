import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"
import { unstable_getServerSession } from "next-auth/next"

import { db } from "@/lib/db"
import { withMethods } from "@/lib/api-middlewares/with-methods"
import { withCurrentUser } from "@/lib/api-middlewares/with-current-user"
import { userNameSchema } from "@/lib/validations/user"
import { authOptions } from "@/lib/auth"
import { stripe } from "@/lib/stripe"

async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("Have session")
    if (req.method === "GET") {
        try {
            const account = await stripe.accounts.create({
                type: "express",
                business_type: "company",
            })

            const accountLink = await stripe.accountLinks.create({
                account: account.id,
                refresh_url: "https://example.com/reauth",
                return_url: "https://example.com/return",
                type: "account_onboarding",
            })
            res.json(accountLink)
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
