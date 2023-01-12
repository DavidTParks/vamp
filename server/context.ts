import { authOptions } from "@/lib/auth"
import type { inferAsyncReturnType } from "@trpc/server"
import type { CreateNextContextOptions } from "@trpc/server/adapters/next"
import { unstable_getServerSession } from "next-auth"
import { AxiomAPIRequest } from "next-axiom/dist/withAxiom"
import { NextApiRequest } from "next"

const isAxiomAPIRequest = (
    req?: NextApiRequest | AxiomAPIRequest
): req is AxiomAPIRequest => {
    return Boolean((req as AxiomAPIRequest)?.log)
}

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */

export async function createContext(opts: CreateNextContextOptions) {
    const req = opts?.req
    const res = opts?.res

    if (!isAxiomAPIRequest(req)) {
        throw new Error("req is not the AxiomAPIRequest I expected")
    }

    const session = await unstable_getServerSession(req, res, authOptions)

    const log = session ? req.log.with({ userId: session.user.id }) : req.log

    return {
        log,
        req,
        res,
        user: session?.user,
    }
}

export type Context = inferAsyncReturnType<typeof createContext>
