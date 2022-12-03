import * as z from "zod"

export const projectCreateSchema = z.object({
    name: z.string().min(3).max(32),
    description: z.string().max(320).optional().nullable(),
})
