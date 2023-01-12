import { privateProcedure, publicProcedure, router } from "../trpc"
import { notificationRouter } from "./notifications"
import { userRouter } from "./user"
import { bountyRouter } from "./bounties"
import { bountySubmissionRouter } from "./bountySubmission"
import { axiomMiddleware } from "../trpc"

export const appRouter = router({
    whoami: publicProcedure.query(({ ctx }) => ctx.user),
    secret: privateProcedure.query(() => "cow level"),
    notification: notificationRouter,
    user: userRouter,
    bounty: bountyRouter,
    bountySubmission: bountySubmissionRouter,
})

export type AppRouter = typeof appRouter
