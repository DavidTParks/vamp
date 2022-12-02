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
                    "overflow-hidden rounded-md border border-slate-700 shadow-lg animate-in slide-in-from-top-1 md:w-32 dropdown z-30",
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
                "flex cursor-default select-none items-center py-2 px-3 m-1 rounded-md text-sm text-slate-100 outline-none focus:bg-palette-150 focus:text-white hover:brightness-200",
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
            className={cn("h-px bg-palette-300", className)}
            {...props}
        />
    )
})
