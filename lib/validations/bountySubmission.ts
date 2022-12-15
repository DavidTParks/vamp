import * as z from "zod"

export const bountySubmissionSchema = z.object({
    solutionLink: z.string().url(),
    comments: z.string().optional(),
})

export const bountyAcceptSchema = z.object({
    submissionId: z.string().cuid(),
    bountyId: z.string().cuid(),
    bountyStripePriceId: z.string(),
    bountySubmissionUserStripeId: z.string().min(1),
})
