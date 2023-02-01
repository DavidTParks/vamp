/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { db } from "@/lib/db"
import { getRenderedMarkdown } from "@/lib/markdown"
import { stripe } from "@/lib/stripe"
import { BountyType } from "@prisma/client"
import { z } from "zod"
import {
    privateProcedure,
    router,
    withBounty,
    withProject,
    withUser,
} from "../trpc"
import { getRepoTopics } from "@/lib/github"

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */

const setWalletDefault = withUser
    .input(
        z.object({
            userId: z.string().cuid(),
            walletId: z.string().cuid(),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const { userId, walletId } = input

        return await db.$transaction(async (tx) => {
            await tx.userWallet.updateMany({
                where: {
                    user: {
                        id: userId,
                    },
                },
                data: {
                    default: false,
                },
            })

            const newDefaultWallet = await tx.userWallet.update({
                where: {
                    id: walletId,
                },
                data: {
                    default: true,
                },
            })

            const defaultWalletCount = await tx.userWallet.count({
                where: {
                    user: {
                        id: userId,
                    },
                    default: true,
                },
            })

            if (defaultWalletCount > 1) {
                throw new Error("Can only have one default wallet at a time")
            }

            return newDefaultWallet
        })
    })

const removeWallet = withUser
    .input(
        z.object({
            userId: z.string().cuid(),
            walletId: z.string().cuid(),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const { userId, walletId } = input

        return await db.$transaction(async (tx) => {
            const deleted = await tx.userWallet.delete({
                where: {
                    id: walletId,
                },
            })

            const wallet = await tx.userWallet.findFirst({
                where: {
                    user: {
                        id: userId,
                    },
                },
            })

            if (wallet) {
                await tx.userWallet.update({
                    where: {
                        id: wallet.id,
                    },
                    data: {
                        default: true,
                    },
                })
            }

            return deleted
        })
    })

/**
 * Router for Bounties
 */
export const web3Router = router({
    // Private
    setWalletDefault: setWalletDefault,
    removeWallet: removeWallet,
})
