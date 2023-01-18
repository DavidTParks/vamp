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
    return (
        <DropdownMenuPrimitive.Trigger
            className="overflow-hidden rounded-md   text-white ring-offset-1 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:ring-offset-rose-700"
            {...props}
            ref={ref}
        />
    )
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
                    "dropdown z-30 overflow-hidden rounded-md border border-palette-300 shadow-lg animate-in slide-in-from-top-1 md:w-32",
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
            onClick={(e) => {
                e.stopPropagation()
                e.nativeEvent.stopImmediatePropagation()
            }}
            ref={ref}
            className={cn(
                "m-1 flex cursor-pointer select-none items-center rounded-md py-2 px-3 text-sm text-slate-100 outline-none hover:brightness-200 focus:bg-palette-150 focus:text-white",
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
