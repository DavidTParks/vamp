import { NextApiRequest, NextApiResponse } from "next"

import { withMethods } from "@/lib/api-middlewares/with-methods"
import { withProject } from "@/lib/api-middlewares/with-project"
import { db } from "@/lib/db"
import { projectPatchSchema } from "@/lib/validations/project"
import { z } from "zod"

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PATCH") {
        try {
            const body = projectPatchSchema.parse(req.body)

            const project = await db.project.update({
                where: {
                    id: body.id,
                },
                data: {
                    name: body.name,
                    description: body.description,
                },
            })

            return res.json(project)
        } catch (error) {
            console.log("Error", error)
            if (error instanceof z.ZodError) {
                return res.status(422).json(error.issues)
            }

            return res.status(422).end()
        }
    }

    if (req.method === "DELETE") {
        try {
            await db.project.delete({
                where: {
                    id: req.query.projectId as string,
                },
            })

            return res.status(204).end()
        } catch (error) {
            console.log("ERror", error)
            return res.status(500).end()
        }
    }
}

export default withMethods(["DELETE", "PATCH"], withProject(handler))
