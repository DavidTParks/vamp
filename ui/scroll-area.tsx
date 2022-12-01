import React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
type ScrollAreaProps = ScrollAreaPrimitive.ScrollAreaProps
import { cn } from "@/lib/utils"

export function ScrollArea({ className, ...props }: ScrollAreaProps) {
    return (
        <ScrollAreaPrimitive.Root
            className={cn("overflow-hidden ", className)}
            {...props}
        />
    )
}

ScrollArea.Viewport = React.forwardRef<
    HTMLDivElement,
    ScrollAreaPrimitive.ScrollAreaViewportProps
>(function Viewport({ className, ...props }, ref) {
    return (
        <ScrollAreaPrimitive.ScrollAreaViewport
            className="h-full w-full"
            {...props}
            ref={ref}
        />
    )
})

ScrollArea.ScrollBar = React.forwardRef<
    HTMLDivElement,
    ScrollAreaPrimitive.ScrollAreaScrollbarProps
>(function Scrollbar({ className, ...props }, ref) {
    return (
        <ScrollAreaPrimitive.Scrollbar
            className={cn("bg-slate-800 select-none flex w-3 p-1", className)}
            {...props}
            ref={ref}
        />
    )
})

ScrollArea.Thumb = React.forwardRef<
    HTMLDivElement,
    ScrollAreaPrimitive.ScrollAreaThumbProps
>(function Thumb({ className, ...props }, ref) {
    return (
        <ScrollAreaPrimitive.Thumb
            className={cn("relative flex-1 bg-slate-700 rounded-lg", className)}
            {...props}
            ref={ref}
        />
    )
})
