import { privateProcedure, publicProcedure, router } from "../trpc"
import { notificationRouter } from "./notifications"

export const appRouter = router({
    whoami: publicProcedure.query(({ ctx }) => ctx.user),
    secret: privateProcedure.query(() => "cow level"),
    notification: notificationRouter,
})

export type AppRouter = typeof appRouter
