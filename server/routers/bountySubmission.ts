/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { db } from "@/lib/db"
import { getRenderedMarkdown } from "@/lib/markdown"
import { stripe } from "@/lib/stripe"
import { BountyType } from "@prisma/client"
import { z } from "zod"
import { router, withBounty, withProject, privateProcedure } from "../trpc"
import { NOTIFICATIONTYPE } from "@prisma/client"
import { sendMarketingMail } from "@/emails/index"
import SubmissionReceived from "@/emails/SubmissionReceived"
import { getBaseUrl } from "@/lib/utils"
import { platformFee } from "@/lib/stripe"

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */

const createBountySubmission = privateProcedure
    .input(
        z.object({
            solutionLink: z.string().min(1),
            comments: z.string().optional(),
            bountyId: z.string().cuid(),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const { comments, bountyId, solutionLink } = input

        const newSubmission = await db.$transaction(async (tx) => {
            // Check if user has connected stripe before allowing a submission post otherwise they can't get paid
            const user = await tx.user.findUniqueOrThrow({
                where: {
                    id: ctx.user.id,
                },
                select: {
                    stripeCustomerId: true,
                },
            })

            if (!user.stripeCustomerId) {
                throw new Error("User has not connected stripe yet")
            }

            // Create submission record
            const submission = await tx.bountySubmission.create({
                data: {
                    comments: comments,
                    solutionLink: solutionLink,
                    bounty: {
                        connect: {
                            id: bountyId,
                        },
                    },
                    user: {
                        connect: {
                            id: ctx.user.id,
                        },
                    },
                },
                include: {
                    user: true,
                    bounty: {
                        include: {
                            project: {
                                include: {
                                    users: {
                                        include: {
                                            user: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            })

            await tx.notification.create({
                data: {
                    type: NOTIFICATIONTYPE.SUBMISSIONRECIEVED,
                    message: comments ?? "",
                    title: `Submission received on ${submission.bounty.title} from ${submission.user.name}`,
                    bounty: {
                        connect: {
                            id: bountyId,
                        },
                    },
                    bountySubmission: {
                        connect: {
                            id: submission.id,
                        },
                    },
                    users: {
                        create: submission.bounty.project.users.map(
                            (projectUser) => {
                                return {
                                    user: {
                                        connect: {
                                            id: projectUser.user.id,
                                        },
                                    },
                                }
                            }
                        ),
                    },
                },
            })

            const projectUserEmails = submission.bounty.project.users.map(
                (user) => {
                    return {
                        email: user.user.email,
                        id: user.user.id,
                    }
                }
            )

            if (projectUserEmails) {
                const emailPromiseArray = projectUserEmails.map((user) => {
                    return fetch(
                        `${getBaseUrl()}/api/send-mail/new-submission`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                apiKey: process.env.PROTECTED_API_ROUTE_KEY,
                                bountyId: bountyId,
                                bountyTitle: submission.bounty.title,
                                user: {
                                    id: user.id,
                                    email: user.email,
                                },
                                projectName: submission.bounty.project.name,
                            }),
                        }
                    )
                })

                await Promise.all(emailPromiseArray)
            }

            return submission
        })
        ctx.log.info("User created new submission", newSubmission)
        return newSubmission
    })

// Accepting a bounty submission for a bounty with a price range
// Need to dynamically create stripe price ID before initiating checkout event
const acceptBountyRangeSubmission = withBounty
    .input(
        z.object({
            submissionId: z.string().cuid(),
            bountyId: z.string().cuid(),
            bountyPrice: z.coerce.number().min(1),
            bountySubmissionUserId: z.string().min(1),
            bountySubmissionUserStripeId: z.string().min(1),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const bounty = await db.bounty.findUniqueOrThrow({
            where: {
                id: input.bountyId,
            },
            include: {
                project: true,
            },
        })

        if (!bounty.project.stripeProductId)
            throw new Error(
                "Project does not have a Stripe product ID associated"
            )

        const stripePrice = await stripe.prices.create({
            unit_amount: input.bountyPrice * 100,
            currency: "usd",
            product: bounty.project.stripeProductId,
        })

        ctx.log.info("User initiated bounty range payout", {
            bounty,
            stripePrice,
        })

        if (!stripePrice.unit_amount) {
            throw new Error("No unit amount for stripe price")
        }

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
                    url: `${getBaseUrl()}/bounty/${input.bountyId}`,
                },
            },
            transfer_data: {
                destination: input.bountySubmissionUserStripeId,
            },
            application_fee_amount: parseInt(
                platformFee(stripePrice.unit_amount).toString()
            ),
            metadata: {
                bountyId: input.bountyId,
                submissionId: input.submissionId,
                bountySubmissionUserId: input.bountySubmissionUserId,
                userId: ctx.user.id,
            },
        })
    })

/**
 * Router for Bounties
 */
export const bountySubmissionRouter = router({
    // Private
    createBountySubmission: createBountySubmission,
    acceptBountyRangeSubmission: acceptBountyRangeSubmission,
})
