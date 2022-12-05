import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { string } from "zod"
import { formatDistanceToNow } from "date-fns"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
    const date = new Date(input)
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })
}

export function dateToNow(input: number | Date): string {
    return formatDistanceToNow(input)
}

export function absoluteUrl(path: string) {
    return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function capitalize(input: string) {
    return input.charAt(0).toUpperCase() + input.slice(1)
}

export function issueSearchString(
    page: string | null | undefined,
    search: string | null | undefined
): string {
    const searchWithOptionalPageParams = new URLSearchParams({
        page,
        search,
    })

    let keysForDel = []
    searchWithOptionalPageParams.forEach((value, key) => {
        if (value == "null") {
            keysForDel.push(key)
        }
    })

    keysForDel.forEach((key) => {
        searchWithOptionalPageParams.delete(key)
    })

    return searchWithOptionalPageParams?.toString()
}

export const isValidUrl = (url: string) => {
    try {
        new URL(url)
        return true
    } catch (e) {
        return false
    }
}

export const getDomainWithoutWWW = (url: string) => {
    if (isValidUrl(url)) {
        return new URL(url).hostname.replace(/^www\./, "")
    }
    try {
        if (url.includes(".") && !url.includes(" ")) {
            return new URL(`https://${url}`).hostname.replace(/^www\./, "")
        }
    } catch (e) {
        return null
    }
}
