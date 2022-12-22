import * as z from "zod"

const SORTOPTIONS = [
    "createdDesc",
    "createdAsc",
    "priceDesc",
    "priceAsc",
] as const

export const SortEnum = z.enum(SORTOPTIONS)
