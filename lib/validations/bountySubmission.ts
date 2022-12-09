import * as z from "zod"

export const bountySubmissionSchema = z.object({
    solutionLink: z.string().min(1),
    comments: z.string().optional(),
})
