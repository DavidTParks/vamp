import { withMethods } from "@/lib/api-middlewares/with-methods"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth"
import * as z from "zod"
import { stripe } from "@/lib/stripe"

export const newProjectSchema = z.object({
    repoId: z.number(),
    name: z.string().min(3).max(32),
    description: z.string().max(320).optional().nullable(),
    repoName: z.string(),
    url: z.string(),
    owner: z.string(),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
        return res.status(403).end()
    }

    const { user } = session

    if (req.method === "POST") {
        try {
            const { name, description, repoId, repoName, url, owner } =
                newProjectSchema.parse(req.body)

            const projectBountyProduct = await stripe.products.create({
                name: `${repoName} Bounties`,
                metadata: {
                    name,
                    description: description ?? "",
                    repoId,
                    url,
                    owner,
                },
            })

            const project = await db.project.create({
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
                    users: {
                        create: {
                            userId: user.id,
                            role: "ADMIN",
                        },
                    },
                },
                select: {
                    id: true,
                },
            })

            return res.json(project)
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(422).json(error.issues)
            }

            return res.status(500).end()
        }
    }
}

export default withMethods(["GET", "POST"], handler)
