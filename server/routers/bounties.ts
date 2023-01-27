/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { db } from "@/lib/db"
import { getRenderedMarkdown } from "@/lib/markdown"
import { stripe } from "@/lib/stripe"
import { BountyType } from "@prisma/client"
import { z } from "zod"
import {
    router,
    withBounty,
    withBountyWithNoSubmissions,
    withProject,
} from "../trpc"

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */

const createBountySingle = z.object({
    title: z.string(),
    content: z.any().optional(),
    projectId: z.string().cuid(),
    issue: z.any().optional(),
    issueLink: z.string().optional().nullable(),
})

const createBounty = withProject
    .input(createBountySingle)
    .mutation(async ({ ctx, input }) => {
        const { title, content, projectId, issue, issueLink } = input

        let issueContent: any = undefined
        if (issue) {
            try {
                issueContent = await getRenderedMarkdown(issue.body, ctx.user)
            } catch (e) {
                console.log(e)
            }
        }

        const bounty = await db.bounty.create({
            data: {
                title: title,
                html: issueContent ?? undefined,
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

const editBounty = withBountyWithNoSubmissions
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

        if (!bountyRange && bountyPrice && bountyPrice < 1) {
            throw new Error("Bounty price must be greater than 0")
        }

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

const createMultipleBounties = withProject
    .input(
        z.object({
            issues: z.array(createBountySingle),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const { issues } = input

        const markdownContentForIssues = await Promise.all(
            issues.map((issue) => {
                return getRenderedMarkdown(issue.issue.body, ctx.user)
            })
        )

        // Current workaround since createMany does not return the created records
        // We need the Ids to redirect to a multi-edit page
        const bounties = await db.$transaction(
            issues.map((issue, index) =>
                db.bounty.create({
                    data: {
                        title: issue?.title ?? "Untitled Bounty",
                        description: issue?.issue?.description ?? "",
                        issueLink: issue.issueLink,
                        html: markdownContentForIssues[index] ?? undefined,
                        // content: markdownContentForIssues[index] ?? undefined,
                        projectId: issue.projectId,
                        githubIssue: issue,
                        userId: ctx.user?.id,
                    },
                    select: {
                        id: true,
                    },
                })
            )
        )

        ctx.log.info("User created multiple bounties", bounties)
        return bounties
    })

const editMultipleBounties = withProject
    .input(
        z.object({
            projectId: z.string().cuid(),
            bountyIds: z.array(z.string().cuid()),
            bountyPrice: z.coerce.number().min(1).positive().optional(),
            bountyRange: z.boolean().default(false),
            bountyPriceMin: z.coerce.number().min(1).positive().optional(),
            bountyPriceMax: z.coerce.number().min(1).positive().optional(),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const {
            projectId,
            bountyIds,
            bountyPrice,
            bountyRange,
            bountyPriceMin,
            bountyPriceMax,
        } = input

        let stripePrice

        if (!bountyRange && bountyPrice && bountyPrice < 1) {
            throw new Error("Bounty price must be greater than 0")
        }

        const project = await db.project.findUniqueOrThrow({
            where: {
                id: projectId,
            },
            select: {
                stripeProductId: true,
            },
        })

        if (!project.stripeProductId) {
            throw new Error("No stripe product ID for project")
        }

        if (bountyPrice && !bountyRange) {
            stripePrice = await stripe.prices.create({
                unit_amount: bountyPrice * 100,
                currency: "usd",
                product: project.stripeProductId,
            })
        }

        if (bountyRange && bountyPriceMax && bountyPriceMin) {
            if (bountyPriceMin > bountyPriceMax) {
                throw new Error(
                    "Bounty price minimum cannot be larger than the maximum"
                )
            }
        }

        const updatedBounties = await db.bounty.updateMany({
            where: {
                id: {
                    in: bountyIds,
                },
            },
            data: {
                bountyPrice,
                bountyRange,
                bountyPriceMax,
                bountyPriceMin,
                published: true,
                stripePriceId: stripePrice?.id ?? undefined,
            },
        })

        ctx.log.info(
            "User edited and published multiple bounties",
            updatedBounties
        )
        return updatedBounties
    })

/**
 * Router for Bounties
 */
export const bountyRouter = router({
    // Private
    createBounty: createBounty,
    editBounty: editBounty,
    deleteBounty: deleteBounty,
    createMultipleBounties: createMultipleBounties,
    editMultipleBounties: editMultipleBounties,
})
