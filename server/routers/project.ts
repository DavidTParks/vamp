/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { db } from "@/lib/db"
import { getRenderedMarkdown } from "@/lib/markdown"
import { stripe } from "@/lib/stripe"
import { BountyType } from "@prisma/client"
import { z } from "zod"
import { privateProcedure, router, withBounty, withProject } from "../trpc"
import { getRepoTopics } from "@/lib/github"

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */

export const newProjectSchema = z.object({
    repoId: z.number(),
    repoName: z.string(),
    name: z.string().min(3).max(32),
    description: z.string().max(320).optional().nullable(),
    url: z.string(),
    owner: z.string(),
})

const createProject = privateProcedure
    .input(newProjectSchema)
    .mutation(async ({ ctx, input }) => {
        const { repoId, name, description, url, owner, repoName } = input

        // Get topics for repo to import, tag to project for filtering down the line
        const [{ data }, projectBountyProduct] = await Promise.all([
            ctx.user.octokit.rest.repos.getAllTopics({
                owner: ctx.githubUser.login,
                repo: repoName,
            }),
            stripe.products.create({
                name: `${repoName} Bounties`,
                metadata: {
                    name,
                    description: description ?? "",
                    repoId,
                    url,
                    owner,
                },
            }),
        ])

        return db.project.create({
            data: {
                name: name,
                description: description,
                stripeProductId: projectBountyProduct.id,
                githubRepo: {
                    create: {
                        githubRepoId: repoId,
                        name: repoName,
                        url,
                        owner: owner,
                    },
                },
                tags: {
                    connectOrCreate: data.names.map((topic) => {
                        return {
                            where: { slug: topic },
                            create: { slug: topic },
                        }
                    }),
                },
                users: {
                    create: {
                        userId: ctx.user.id,
                        role: "ADMIN",
                    },
                },
            },
            select: {
                id: true,
            },
        })
    })

const updatePhoto = withProject
    .input(
        z.object({
            projectId: z.string().cuid(),
            image: z.string(),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const { projectId, image } = input

        const project = await db.project.update({
            where: {
                id: projectId,
            },
            data: {
                image,
            },
        })

        ctx.log.info("User updated project photo", project)
        return project
    })

/**
 * Router for Bounties
 */
export const projectRouter = router({
    // Private
    updatePhoto: updatePhoto,
    createProject: createProject,
})
