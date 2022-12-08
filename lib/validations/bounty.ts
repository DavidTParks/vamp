import * as z from "zod"

export const bountyPatchSchema = z.object({
    title: z.string().min(3).max(128).optional(),
    bountyPrice: z.string(),
    githubIssueLink: z.string().optional(),

    // TODO: Type this properly from editorjs block types?
    content: z.any().optional(),
    html: z.any().optional(),
})
