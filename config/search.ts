export type TSortOptions =
    | "createdDesc"
    | "createdAsc"
    | "priceDesc"
    | "priceAsc"

export const sortQueryToOrderBy = {
    createdDesc: {
        createdAt: "desc",
    },
    createdAsc: {
        createdAt: "asc",
    },
    priceDesc: {
        bountyPrice: "desc",
    },
    priceAsc: {
        bountyPrice: "asc",
    },
}
