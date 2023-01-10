"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"

import { cn } from "@/lib/utils"

type ToggleGroupProps = ToggleGroupPrimitive.ToggleGroupSingleProps

export function ToggleGroup({ ...props }: ToggleGroupProps) {
    return (
        <ToggleGroupPrimitive.Root
            className="flex-wrap inline-flex gap-2 overflow-hidden"
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
                `px-5 py-2  focus:outline-raised-border focus:outline-1 focus:ring-0 focus:text-white rounded-md text-brandtext-500 hover:brightness-150  border border-raised-border button flex items-center justify-center shadow-sm transition-all duration-300 text-xs font-medium disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed   data-[state='on']:border-rose-500 `
            )}
            {...props}
        />
    )
})
