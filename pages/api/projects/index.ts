import { withMethods } from "@/lib/api-middlewares/with-methods"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"

const projectCreateSchema = z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
    githubRepo: z.object({
        githubRepoId: z.string(),
        name: z.string(),
        url: z.string(),
        owner: z.string(),
    }),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const user = await getCurrentUser()

    if (!user) {
        return res.status(403).end()
    }

    if (req.method === "POST") {
        try {
            const { name, slug, githubRepo } = projectCreateSchema.parse(
                req.body
            )

            const project = await db.project.create({
                data: {
                    name: name,
                    slug: slug,
                    githubRepo: {
                        create: {
                            name: githubRepo.name,
                            url: githubRepo.url,
                            githubRepoId: githubRepo.githubRepoId,
                            owner: githubRepo.owner,
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
