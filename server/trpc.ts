/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */

import { Context } from "./context"
import { initTRPC, TRPCError } from "@trpc/server"
import superjson from "superjson"
import { ZodError } from "zod"
import { db } from "@/lib/db"
import { AxiomAPIRequest } from "next-axiom"

export const t = initTRPC.context<Context>().create({
    /**
     * @see https://trpc.io/docs/v10/data-transformers
     */
    transformer: superjson,
    /**
     * @see https://trpc.io/docs/v10/error-formatting
     */
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zod:
                    error.cause instanceof ZodError
                        ? error.cause.flatten().fieldErrors
                        : null,
            },
        }
    },
})

export const axiomMiddleware = t.middleware(async ({ ctx, next }) => {
    const result = await next()
    ;(ctx.req as AxiomAPIRequest).log = ctx.log
    return result
})

/**
 * Create a router
 * @see https://trpc.io/docs/v10/router
 */
export const router = t.router

/**
 * Create an unprotected procedure
 * @see https://trpc.io/docs/v10/procedures
 **/
export const loggedProcedure = t.procedure.use(axiomMiddleware)

/**
 * Create an unprotected procedure
 * @see https://trpc.io/docs/v10/procedures
 **/
export const publicProcedure = t.procedure

/**
 * @see https://trpc.io/docs/v10/middlewares
 */
export const middleware = t.middleware

/**
 * @see https://trpc.io/docs/v10/merging-routers
 */
export const mergeRouters = t.mergeRouters

/**
 * Create an private procedure
 * @see https://trpc.io/docs/v10/procedures
 **/
export const privateProcedure = loggedProcedure.use((opts) => {
    if (!opts.ctx.user) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You have to be logged in to do this",
        })
    }
    return opts.next({
        ctx: {
            req: opts.ctx.req,
            res: opts.ctx.res,
            user: opts.ctx.user,
        },
    })
})

/**
 * User is an owner of this project
 **/
export const withProject = privateProcedure.use(async (opts) => {
    if (!opts.ctx.user) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You have to be logged in to do this",
        })
    }

    const json = opts.ctx.req?.body["0"]?.json
    const projectId = json?.projectId

    const count = await db.project.count({
        where: {
            id: projectId,
            users: {
                some: {
                    userId: opts.ctx?.user.id,
                },
            },
        },
    })

    if (count < 1) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You do not have access to this project",
        })
    }

    return opts.next({
        ctx: {
            user: opts.ctx.user,
        },
    })
})

/**
 * User is an owner of the project and therefore the bounty
 **/
export const withBounty = privateProcedure.use(async (opts) => {
    const json = opts.ctx.req?.body["0"]?.json
    const bountyId = json?.bountyId

    const count = await db.bounty.count({
        where: {
            id: bountyId,
            project: {
                users: {
                    some: {
                        user: {
                            id: opts.ctx.user.id,
                        },
                    },
                },
            },
        },
    })

    if (count < 1) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You do not have access to this bounty",
        })
    }

    return opts.next({
        ctx: {
            user: opts.ctx.user,
        },
    })
})

export const withBountyWithNoSubmissions = withBounty.use(async (opts) => {
    const json = opts.ctx.req?.body["0"]?.json
    const bountyId = json?.bountyId

    // If we have submissions, prevent editing the bounty
    const count = await db.bountySubmission.count({
        where: {
            bounty: {
                id: bountyId,
            },
        },
    })

    if (count > 1) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message:
                "This bounty has submissions already, you cannot edit it unless you delete it.",
        })
    }

    return opts.next({
        ctx: {
            user: opts.ctx.user,
        },
    })
})
