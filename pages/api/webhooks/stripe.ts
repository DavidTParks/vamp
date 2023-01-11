//@ts-nocheck

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
        return res.status(400).send(`Webhook Error: ${error.message}`)
    }

    if (event.type === "account.updated") {
        const session = event.data.object as Stripe.Account
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

    if (event.type === "checkout.session.completed") {
        // Retrieve the subscription details from Stripe.
        const session = event.data.object as Stripe.Account
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
            session.id,
            {
                expand: ["line_items"],
            }
        )

        await db.$transaction([
            // Resolve bounty and accept submission
            db.bounty.update({
                where: {
                    id: sessionWithLineItems.metadata.bountyId,
                },
                data: {
                    resolved: true,
                    bountySubmissions: {
                        update: {
                            where: {
                                id: sessionWithLineItems.metadata.submissionId,
                            },
                            data: {
                                accepted: true,
                            },
                        },
                    },
                },
            }),
            // Increment users blood score for leaderboard tracking
            db.user.update({
                where: {
                    id: sessionWithLineItems.metadata.bountySubmissionUserId,
                },
                data: {
                    blood: {
                        increment: 1,
                    },
                },
            }),
        ])
    }

    return res.json({})
}
