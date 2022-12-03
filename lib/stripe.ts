import Stripe from "stripe"

import { db } from "@/lib/db"
import { User } from "@prisma/client"

export const stripe = new Stripe(process.env.STRIPE_API_KEY, {
    apiVersion: "2022-11-15",
    typescript: true,
})

export async function getStripeDetails(
    userId: string
): Promise<Pick<User, "stripeCustomerId">> {
    const user = await db.user.findFirst({
        where: {
            id: userId,
        },
        select: {
            stripeCustomerId: true,
        },
    })

    return {
        ...user,
    }
}
