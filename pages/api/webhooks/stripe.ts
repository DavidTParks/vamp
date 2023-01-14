import { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"
import rawBody from "raw-body"
import { getBaseUrl } from "@/lib/utils"
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
            // @ts-ignore
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        return res.status(400).send(`Webhook Error: ${error}`)
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
                id: session?.metadata?.userId,
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

        const [bounty, user] = await db.$transaction([
            // Resolve bounty and accept submission
            db.bounty.update({
                where: {
                    id: sessionWithLineItems?.metadata?.bountyId,
                },
                data: {
                    resolved: true,
                    resolvedAt: new Date(Date.now()).toISOString(),
                    bountySubmissions: {
                        update: {
                            where: {
                                id: sessionWithLineItems?.metadata
                                    ?.submissionId,
                            },
                            data: {
                                accepted: true,
                                acceptedAt: new Date(Date.now()),
                            },
                        },
                    },
                },
                select: {
                    id: true,
                    title: true,
                },
            }),
            // Increment users blood score for leaderboard tracking
            db.user.update({
                where: {
                    id: sessionWithLineItems?.metadata?.bountySubmissionUserId,
                },
                data: {
                    blood: {
                        increment: 1,
                    },
                },
                select: {
                    notificationSubmissionAccepted: true,
                    id: true,
                    email: true,
                },
            }),
        ])

        if (user.notificationSubmissionAccepted) {
            await fetch(`${getBaseUrl()}/api/send-mail/submission-accepted`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    apiKey: process.env.PROTECTED_API_ROUTE_KEY,
                    bountyId: bounty.id,
                    bountyTitle: bounty.title,
                    user: {
                        id: user.id,
                        email: user.email,
                    },
                }),
            })
        }
    }

    return res.json({})
}
