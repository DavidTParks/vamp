import { NextApiRequest, NextApiResponse } from "next"

import { withMethods } from "@/lib/api-middlewares/with-methods"
import { withProject } from "@/lib/api-middlewares/with-project"
import { db } from "@/lib/db"

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "DELETE") {
        try {
            console.log()
            await db.project.delete({
                where: {
                    id: req.query.projectId as string,
                },
            })

            return res.status(204).end()
        } catch (error) {
            console.log("Error", error)
            return res.status(500).end()
        }
    }
}

export default withMethods(["DELETE", "PATCH"], withProject(handler))
