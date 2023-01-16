/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { db } from "@/lib/db"
import { getRenderedMarkdown } from "@/lib/markdown"
import { stripe } from "@/lib/stripe"
import { BountyType } from "@prisma/client"
import { z } from "zod"
import { router, withBounty, withProject } from "../trpc"

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */

const createBounty = withProject
    .input(
        z.object({
            title: z.string(),
            content: z.any().optional(),
            projectId: z.string().cuid(),
            issue: z.any().optional(),
            issueLink: z.string().optional().nullable(),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const { title, content, projectId, issue, issueLink } = input

        let issueContent: any = undefined
        try {
            if (issue) {
                issueContent = await getRenderedMarkdown(issue.body, ctx.user)
            }
        } catch (e) {
            console.log(e)
        }

        const bounty = await db.bounty.create({
            data: {
                title: title,
                content: issueContent ?? undefined,
                description: issue?.description ?? "",
                issueLink: issueLink,
                project: {
                    connect: {
                        id: projectId,
                    },
                },
                githubIssue: issue,
                submittedBy: {
                    connect: {
                        id: ctx.user?.id,
                    },
                },
            },
            select: {
                id: true,
            },
        })
        ctx.log.info("User created bounty", bounty)
        return bounty
    })

const editBounty = withBounty
    .input(
        z.object({
            bountyId: z.string().cuid(),
            title: z.string().min(3).max(128).optional(),
            bountyPrice: z.coerce.number().min(1).positive().optional(),
            bountyRange: z.boolean().default(false),
            bountyPriceMin: z.coerce.number().min(1).positive().optional(),
            bountyPriceMax: z.coerce.number().min(1).positive().optional(),
            issueLink: z.string().optional(),
            content: z.any().optional(),
            html: z.any().optional(),
            type: z.nativeEnum(BountyType),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const {
            title,
            bountyId,
            bountyPrice,
            bountyRange,
            bountyPriceMin,
            bountyPriceMax,
            issueLink,
            content,
            html,
            type,
        } = input

        const existingBounty = await db.bounty.findUniqueOrThrow({
            where: {
                id: bountyId,
            },
            include: {
                project: true,
            },
        })

        if (!existingBounty.project.stripeProductId) {
            throw new Error("No stripe product ID for project")
        }

        let stripePrice
        if (bountyPrice && !bountyRange) {
            stripePrice = await stripe.prices.create({
                unit_amount: bountyPrice * 100,
                currency: "usd",
                product: existingBounty.project.stripeProductId,
            })
        }

        if (bountyRange && bountyPriceMax && bountyPriceMin) {
            if (bountyPriceMin > bountyPriceMax) {
                throw new Error(
                    "Bounty price minimum cannot be larger than the maximum"
                )
            }
        }

        return await db.bounty.update({
            where: {
                id: existingBounty.id,
            },
            data: {
                title: title || existingBounty.title,
                issueLink,
                content,
                html,
                bountyPrice,
                bountyRange,
                bountyPriceMax,
                bountyPriceMin,
                published: true,
                stripePriceId: stripePrice?.id ?? undefined,
                type,
            },
        })
    })

const deleteBounty = withBounty
    .input(
        z.object({
            bountyId: z.string().cuid(),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const deleted = await db.bounty.delete({
            where: {
                id: input.bountyId,
            },
        })

        ctx.log.info("User deleted bounty", deleted)
        return deleted
    })

/**
 * Router for Bounties
 */
export const bountyRouter = router({
    // Private
    createBounty: createBounty,
    editBounty: editBounty,
    deleteBounty: deleteBounty,
})
