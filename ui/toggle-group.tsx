"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"

import { cn } from "@/lib/utils"

type ToggleGroupProps = ToggleGroupPrimitive.ToggleGroupSingleProps

export function ToggleGroup({ ...props }: ToggleGroupProps) {
    return (
        <ToggleGroupPrimitive.Root
            className="inline-flex flex-wrap gap-2 overflow-hidden"
            {...props}
        />
    )
}

ToggleGroup.Item = React.forwardRef<
    HTMLButtonElement,
    ToggleGroupPrimitive.ToggleGroupItemProps
>(function ToggleGroupItem({ className, ...props }, ref) {
    return (
        <ToggleGroupPrimitive.Item
            ref={ref}
            className={cn(
                className,
                `button flex  items-center justify-center rounded-md border border-raised-border px-5 py-2  text-xs font-medium text-brandtext-500 shadow-sm transition-all duration-300 hover:brightness-150 focus:text-white focus:outline-1 focus:outline-raised-border focus:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60   data-[state='on']:border-rose-500 `
            )}
            {...props}
        />
    )
})
