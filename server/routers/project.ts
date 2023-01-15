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
})
