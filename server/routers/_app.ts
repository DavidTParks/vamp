import { privateProcedure, publicProcedure, router } from "../trpc"
import { notificationRouter } from "./notifications"
import { userRouter } from "./user"
export const appRouter = router({
    whoami: publicProcedure.query(({ ctx }) => ctx.user),
    secret: privateProcedure.query(() => "cow level"),
    notification: notificationRouter,
    user: userRouter,
})

export type AppRouter = typeof appRouter
