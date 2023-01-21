"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

type HoverCardProps = HoverCardPrimitive.HoverCardProps

export function HoverCard({ ...props }: HoverCardProps) {
    return <HoverCardPrimitive.Root {...props} />
}

HoverCard.Trigger = React.forwardRef<
    HTMLAnchorElement,
    HoverCardPrimitive.HoverCardTriggerProps
>(function HoverCardTrigger({ ...props }, ref) {
    return <HoverCardPrimitive.Trigger {...props} ref={ref} />
})

HoverCard.Portal = HoverCardPrimitive.Portal

HoverCard.Content = React.forwardRef<
    HTMLDivElement,
    HoverCardPrimitive.HoverCardContentProps
>(function HoverCardContent({ className, ...props }, ref) {
    return (
        <HoverCardPrimitive.Content
            ref={ref}
            className={cn(
                "dropdown z-30 overflow-hidden rounded-md border border-palette-300 shadow-lg animate-in slide-in-from-top-1 md:w-32",
                className
            )}
            {...props}
        />
    )
})
