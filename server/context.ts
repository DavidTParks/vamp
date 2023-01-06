import { authOptions } from "@/lib/auth"
import type { inferAsyncReturnType } from "@trpc/server"
import type { CreateNextContextOptions } from "@trpc/server/adapters/next"
import { unstable_getServerSession } from "next-auth"
/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(opts: CreateNextContextOptions) {
    const session = await unstable_getServerSession(
        opts.req,
        opts.res,
        authOptions
    )

    return {
        user: session?.user,
    }
}

export type Context = inferAsyncReturnType<typeof createContext>
