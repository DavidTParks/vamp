import { withMethods } from "@/lib/api-middlewares/with-methods"
import { getVGLDBalance } from "@/lib/web3/itxUtils"
import { NextApiRequest, NextApiResponse } from "next"
import { mintVGLD } from "@/lib/web3/itxUtils"
import { formatBytes32String } from "ethers/lib/utils.js"

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const hash = await mintVGLD()

            res.status(200).json({ hash })
        } catch (error) {
            console.log("Error", error)
            return res.status(422).end()
        }
    }
}

export default withMethods(["GET"], handler)
