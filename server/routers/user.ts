/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { db } from "@/lib/db"
import { userNotificationsSchema } from "@/lib/validations/user"
import { privateProcedure, router } from "../trpc"
import { z } from "zod"
import { stripe } from "@/lib/stripe"
import { getBaseUrl } from "@/lib/utils"
import { platformFee } from "@/lib/stripe"

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */

export const userRouter = router({
    saveNotificationPreferences: privateProcedure
        .input(userNotificationsSchema)
        .mutation(async ({ ctx, input }) => {
            const { newSubmission, submissionAccepted } = input

            return await db.user.update({
                where: {
                    id: ctx.user.id,
                },
                data: {
                    notificationNewSubmission: newSubmission,
                    notificationSubmissionAccepted: submissionAccepted,
                },
            })
        }),
    getUserProjects: privateProcedure.query(async ({ ctx }) => {
        return db.project.findMany({
            where: {
                users: {
                    some: {
                        user: {
                            id: ctx.user.id,
                        },
                    },
                },
            },
        })
    }),
    donateToUser: privateProcedure
        .input(
            z.object({
                userId: z.string().cuid(),
                donationAmount: z.coerce.number().min(1).positive(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const user = await db.user.findUniqueOrThrow({
                where: {
                    id: input.userId,
                },
            })

            if (!user.stripeCustomerId) {
                throw new Error("User does not have a stripe customer ID setup")
            }

            let stripeCustomerProductId = user?.stripeCustomerProductId

            if (!stripeCustomerProductId) {
                const userDonationProduct = await stripe.products.create({
                    name: `${user.name} Donation`,
                    metadata: {
                        userId: user.id,
                        userEmail: user.email,
                    },
                })

                stripeCustomerProductId = userDonationProduct.id
                await db.user.update({
                    where: {
                        id: input.userId,
                    },
                    data: {
                        stripeCustomerProductId: userDonationProduct.id,
                    },
                })
            }

            const stripePrice = await stripe.prices.create({
                unit_amount: input.donationAmount * 100,
                currency: "usd",
                product: stripeCustomerProductId,
            })

            if (!stripePrice.unit_amount) {
                throw new Error("No unit amount for stripe price")
            }

            await db.user.update({
                where: {
                    id: input.userId,
                },
                data: {
                    stripeCustomerDonationPriceId: stripePrice.id,
                },
            })

            return await stripe.paymentLinks.create({
                line_items: [
                    {
                        price: stripePrice.id,
                        quantity: 1,
                    },
                ],
                after_completion: {
                    type: "redirect",
                    redirect: {
                        url: `${getBaseUrl()}/u/${
                            input.userId
                        }?from=donationCompleted`,
                    },
                },
                transfer_data: {
                    destination: user.stripeCustomerId,
                },
                application_fee_amount: parseInt(
                    platformFee(stripePrice.unit_amount).toString()
                ),
                metadata: {
                    receivingUser: input.userId,
                    donatingUser: ctx.user.id,
                },
            })
        }),
})
