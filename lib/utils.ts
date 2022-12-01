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
