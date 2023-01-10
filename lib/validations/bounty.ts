import * as z from "zod"

export const bountyPatchSchema = z.object({
    title: z.string().min(3).max(128).optional(),
    bountyPrice: z.number().positive(),
    githubIssueLink: z.string().optional(),
    content: z.any().optional(),
    html: z.any().optional(),
})
