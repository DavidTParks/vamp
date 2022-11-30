"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"

import { cn } from "@/lib/utils"

type DropdownMenuProps = DropdownMenuPrimitive.DropdownMenuProps

export function DropdownMenu({ ...props }: DropdownMenuProps) {
    return <DropdownMenuPrimitive.Root {...props} />
}

DropdownMenu.Trigger = React.forwardRef<
    HTMLButtonElement,
    DropdownMenuPrimitive.DropdownMenuTriggerProps
>(function DropdownMenuTrigger({ ...props }, ref) {
    return <DropdownMenuPrimitive.Trigger {...props} ref={ref} />
})

DropdownMenu.Portal = DropdownMenuPrimitive.Portal

DropdownMenu.Content = React.forwardRef<
    HTMLDivElement,
    DropdownMenuPrimitive.MenuContentProps
>(function DropdownMenuContent({ className, ...props }, ref) {
    return (
        <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
                ref={ref}
                align="end"
                className={cn(
                    "overflow-hidden rounded-md border border-slate-800 bg-appbg shadow-lg animate-in slide-in-from-top-1 md:w-32",
                    className
                )}
                {...props}
            />
        </DropdownMenuPrimitive.Portal>
    )
})

DropdownMenu.Item = React.forwardRef<
    HTMLDivElement,
    DropdownMenuPrimitive.DropdownMenuItemProps
>(function DropdownMenuItem({ className, ...props }, ref) {
    return (
        <DropdownMenuPrimitive.Item
            ref={ref}
            className={cn(
                "flex cursor-default select-none items-center py-2 px-3 text-sm text-slate-100 outline-none focus:bg-slate-900 focus:text-white",
                className
            )}
            {...props}
        />
    )
})

DropdownMenu.Separator = React.forwardRef<
    HTMLDivElement,
    DropdownMenuPrimitive.DropdownMenuSeparatorProps
>(function DropdownMenuItem({ className, ...props }, ref) {
    return (
        <DropdownMenuPrimitive.Separator
            ref={ref}
            className={cn("h-px bg-slate-800", className)}
            {...props}
        />
    )
})
