import { withMethods } from "@/lib/api-middlewares/with-methods"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth"
import * as z from "zod"

import { projectCreateSchema } from "@/lib/validations/project"

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
        return res.status(403).end()
    }

    const { user } = session

    if (req.method === "POST") {
        try {
            console.log("Parsing body")
            const { name, description } = projectCreateSchema.parse(req.body)

            const project = await db.project.create({
                data: {
                    name: name,
                    description: description,
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
            console.log("ERror", error)
            if (error instanceof z.ZodError) {
                return res.status(422).json(error.issues)
            }

            return res.status(500).end()
        }
    }
}

export default withMethods(["GET", "POST"], handler)
