import { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"
import rawBody from "raw-body"

import { stripe } from "@/lib/stripe"
import { db } from "@/lib/db"

export const config = {
    api: {
        // Turn off the body parser so we can access raw body for verification.
        bodyParser: false,
    },
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const body = await rawBody(req)
    const signature = req.headers["stripe-signature"]

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        console.log("error", error)
        return res.status(400).send(`Webhook Error: ${error.message}`)
    }

    const session = event.data.object as Stripe.Account

    if (event.type === "account.updated") {
        // Retrieve the subscription details from Stripe.
        const account = await stripe.accounts.retrieve(session.id)

        // Update the user stripe into in our database.
        // Since this is the initial subscription, we need to update
        // the subscription id and customer id.
        await db.user.update({
            where: {
                id: session.metadata.userId,
            },
            data: {
                stripeCustomerId: account.id as string,
            },
        })
    }

    return res.json({})
}
