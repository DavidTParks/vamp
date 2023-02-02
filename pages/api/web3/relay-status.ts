import { withMethods } from "@/lib/api-middlewares/with-methods"
import { getVGLDBalance } from "@/lib/web3/itxUtils"
import { NextApiRequest, NextApiResponse } from "next"
import { mintVGLD } from "@/lib/web3/itxUtils"
import { waitTransaction } from "@/lib/web3/itxUtils"

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const relayHash = req.query.relayHash as string

            const mined = await waitTransaction(relayHash)

            res.status(200).json({ mined })
        } catch (error) {
            console.log("Error", error)
            return res.status(422).end()
        }
    }
}

export default withMethods(["GET"], handler)
