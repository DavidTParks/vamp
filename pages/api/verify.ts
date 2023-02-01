import { withIronSessionApiRoute } from "iron-session/next"
import { NextApiRequest, NextApiResponse } from "next"
import { SiweMessage } from "siwe"
import { ironOptions } from "@/lib/wagmiClient"
import { authOptions } from "@/lib/auth"
import { unstable_getServerSession } from "next-auth"
import { withMethods } from "@/lib/api-middlewares/with-methods"
import { withAuthentication } from "@/lib/api-middlewares/with-authentication"
import { withCurrentUser } from "@/lib/api-middlewares/with-current-user"
import { db } from "@/lib/db"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req
    switch (method) {
        case "POST":
            try {
                const { message, signature } = req.body
                const siweMessage = new SiweMessage(message)
                const fields = await siweMessage.validate(signature)

                if (fields.nonce !== req.session.nonce)
                    return res.status(422).json({ message: "Invalid nonce." })
                req.session.siwe = fields
                await req.session.save()

                const session = await unstable_getServerSession(
                    req,
                    res,
                    authOptions
                )

                const user = session?.user

                if (!user) {
                    return res.status(401).json({ message: "Unauthorized" })
                }

                const walletCount = await db.userWallet.count({
                    where: {
                        user: {
                            id: user.id,
                        },
                    },
                })

                if (walletCount >= 10) {
                    res.status(404).json({
                        message: "A user can only connect 10 wallets at a time",
                    })
                }

                const defaultWalletCount = await db.userWallet.count({
                    where: {
                        user: {
                            id: user.id,
                        },
                        default: true,
                    },
                })

                const defaultWallet = defaultWalletCount >= 1 ? false : true

                const updatedUser = await db.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        wallets: {
                            connectOrCreate: {
                                create: {
                                    address: fields.address,
                                    chainId: fields.chainId,
                                    default: defaultWallet,
                                },
                                where: {
                                    userId_address_chainId: {
                                        userId: user.id,
                                        address: fields.address,
                                        chainId: fields.chainId,
                                    },
                                },
                            },
                        },
                    },
                })

                res.json({ ok: true, updatedUser })
            } catch (_error) {
                res.json({ ok: false })
            }
            break
        default:
            res.setHeader("Allow", ["POST"])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}

export default withMethods(
    ["POST"],
    withAuthentication(
        withCurrentUser(withIronSessionApiRoute(handler, ironOptions))
    )
)
