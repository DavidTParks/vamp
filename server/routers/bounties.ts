/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { db } from "@/lib/db"
import { userNotificationsSchema } from "@/lib/validations/user"
import { privateProcedure, router, withBounty, withProject } from "../trpc"
import { z } from "zod"
import { getRenderedMarkdown } from "@/lib/markdown"
import { stripe } from "@/lib/stripe"

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

        return await db.bounty.create({
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
    })

const editBounty = withBounty
    .input(
        z.object({
            bountyId: z.string().cuid(),
            title: z.string().min(3).max(128).optional(),
            bountyPrice: z.string().min(1),
            issueLink: z.string().optional(),
            content: z.any().optional(),
            html: z.any().optional(),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const { title, bountyId, bountyPrice, issueLink, content, html } = input

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

        const stripePrice = await stripe.prices.create({
            unit_amount: parseFloat(bountyPrice) * 100,
            currency: "usd",
            product: existingBounty.project.stripeProductId,
        })

        return await db.bounty.update({
            where: {
                id: existingBounty.id,
            },
            data: {
                title: title || existingBounty.title,
                issueLink,
                content,
                html,
                bountyPrice: parseFloat(bountyPrice),
                published: true,
                stripePriceId: stripePrice.id,
            },
        })
    })

/**
 * Router for Bounties
 */
export const bountyRouter = router({
    // Private
    createBounty: createBounty,
    editBounty: editBounty,
})
