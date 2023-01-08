//@ts-nocheck

import { ClassValue, clsx } from "clsx"
import { formatDistanceToNowStrict } from "date-fns"
import { twMerge } from "tailwind-merge"

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

export function formatDollars(input: number): string {
    const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        currencyDisplay: "narrowSymbol",
    }).format(input)
    return formatted
}

export function dateToNow(input: number | Date): string {
    return formatDistanceToNowStrict(input)
}

export function absoluteUrl(path: string) {
    return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function capitalize(input: string) {
    return input.charAt(0).toUpperCase() + input.slice(1)
}

export function cleanSearchParams(urlSearchParams: URLSearchParams) {
    let cleanedParams = urlSearchParams
    let keysForDel = []

    urlSearchParams.forEach((value, key) => {
        if (value == "null" || value === "undefined" || !value) {
            keysForDel.push(key)
        }
    })

    keysForDel.forEach((key) => {
        cleanedParams.delete(key)
    })

    return cleanedParams
}

export function searchString(
    page: string | null | undefined,
    search: string | null | undefined,
    sort?: string | null | undefined
): string {
    const searchParameters = new URLSearchParams({
        page,
        search,
        sort,
    })

    return cleanSearchParams(searchParameters)?.toString()
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

export function getBaseUrl() {
    // if (typeof window !== "undefined") {
    //     return ""
    // }
    // reference for vercel.com

    if (process.env.NODE_ENV === "production") {
        return `https://www.vamp.sh`
    }

    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`
    }

    // // reference for render.com
    if (process.env.RENDER_INTERNAL_HOSTNAME) {
        return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`
    }

    // assume localhost
    return `http://localhost:${process.env.PORT ?? 3000}`
}
