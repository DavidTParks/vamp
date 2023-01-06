import { z } from "zod"

export const notificationGetSchema = z.object({
    limit: z.number().min(1).nullish(),
    cursor: z.string().nullish(),
    initialCursor: z.string().nullish(),
})
