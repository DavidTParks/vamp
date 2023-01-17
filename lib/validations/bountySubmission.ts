import * as z from "zod"

export const bountySubmissionSchema = z.object({
    solutionLink: z.string().url(),
    comments: z.string().optional(),
})

export const bountyAcceptSchema = z.object({
    submissionId: z.string().cuid(),
    bountyId: z.string().cuid(),
    bountyStripePriceId: z.string(),
    bountySubmissionUserId: z.string().min(1),
    bountySubmissionUserStripeId: z.string().min(1),
})

export const bountyRangeAcceptSchema = z.object({
    bountyPrice: z.coerce.number().min(1),
})
