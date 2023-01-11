/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { db } from "@/lib/db"
import { userNotificationsSchema } from "@/lib/validations/user"
import { privateProcedure, router } from "../trpc"
/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */

export const userRouter = router({
    saveNotificationPreferences: privateProcedure
        .input(userNotificationsSchema)
        .mutation(async ({ ctx, input }) => {
            const { newSubmission, submissionAccepted } = input

            return await db.user.update({
                where: {
                    id: ctx.user.id,
                },
                data: {
                    notificationNewSubmission: newSubmission,
                    notificationSubmissionAccepted: submissionAccepted,
                },
            })
        }),
    getUserProjects: privateProcedure.query(async ({ ctx }) => {
        return db.project.findMany({
            where: {
                users: {
                    some: {
                        user: {
                            id: ctx.user.id,
                        },
                    },
                },
            },
        })
    }),
})
