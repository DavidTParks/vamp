import { createNextApiHandler } from "@trpc/server/adapters/next"
import { createContext } from "@/server/context"
import { appRouter } from "@/server/routers/_app"
import { log } from "next-axiom"
import { withAxiom } from "next-axiom"

export default withAxiom(
    createNextApiHandler({
        router: appRouter,
        onError({ error, type, path, input, ctx, req }) {
            log.error(error.message, {
                type,
                path,
                input,
                ctx,
                req,
            })
        },
        createContext(opts) {
            return createContext({
                ...opts,
            })
        },
    })
)
