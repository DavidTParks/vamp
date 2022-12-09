import * as z from "zod"

export const bountySubmissionSchema = z.object({
    solutionLink: z.string(),
    comments: z.string().optional(),
})
