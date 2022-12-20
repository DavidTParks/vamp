import Stripe from "stripe"

import { db } from "@/lib/db"
import { User } from "@prisma/client"
import { cache } from "react"

export const stripe = new Stripe(process.env.STRIPE_API_KEY, {
    apiVersion: "2022-11-15",
    typescript: true,
})

export const preloadStripeDetails = (userId: User["id"]) => {
    void getStripeDetails(userId)
    void getStripeBalance(userId)
    void getStripePayouts(userId)
}

export type TStripeDetails = Promise<Pick<User, "stripeCustomerId">>

export const getStripeDetails = cache(
    async (userId: User["id"]): Promise<TStripeDetails> => {
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
)

export type TStripeBalance = Promise<Stripe.Response<Stripe.Balance>>

export const getStripeBalance = cache(
    async (userId: User["id"]): Promise<TStripeBalance> => {
        const user = await db.user.findFirst({
            where: {
                id: userId,
            },
            select: {
                stripeCustomerId: true,
            },
        })

        return await stripe.balance.retrieve({
            stripeAccount: user.stripeCustomerId,
        })
    }
)

export type TStripePayouts = Stripe.ApiListPromise<Stripe.Payout>

export const getStripePayouts = cache(
    async (userId: User["id"]): Promise<TStripePayouts> => {
        const user = await db.user.findFirst({
            where: {
                id: userId,
            },
            select: {
                stripeCustomerId: true,
            },
        })

        return await stripe.payouts.list({
            stripeAccount: user.stripeCustomerId,
        })
    }
)

// 5% plus .50C per transaction
export const platformFee = (price: number): number => {
    return ((price / 100) * 0.05 + 0.5) * 100
}
