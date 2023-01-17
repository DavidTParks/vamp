import * as z from "zod"

export const bountyPatchSchema = z.object({
    title: z.string().min(3).max(128).optional(),
    bountyPrice: z.coerce.number().min(1).positive().optional(),
    bountyRange: z.boolean().default(false),
    bountyPriceMin: z.coerce.number().min(1).positive().optional(),
    bountyPriceMax: z.coerce.number().min(1).positive().optional(),
    githubIssueLink: z.string().optional(),
    content: z.any().optional(),
    html: z.any().optional(),
})
