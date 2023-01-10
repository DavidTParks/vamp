"use client"

import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import * as SelectPrimitive from "@radix-ui/react-select"
import * as React from "react"

type SelectProps = SelectPrimitive.SelectProps

export function Select({ ...props }: SelectProps) {
    return <SelectPrimitive.Root {...props} />
}

Select.Portal = SelectPrimitive.Portal
Select.Icon = SelectPrimitive.Icon
Select.Value = SelectPrimitive.Value
Select.Viewport = SelectPrimitive.Viewport
Select.Group = SelectPrimitive.Group

Select.Trigger = React.forwardRef<
    HTMLButtonElement,
    SelectPrimitive.SelectTriggerProps
>(function SelectTrigger({ children, className, ...props }, ref) {
    return (
        <SelectPrimitive.Trigger
            className={cn(
                className,
                "inline-flex items-center text-sm gap-2 border border-raised-border rounded-md overflow-hidden px-3 py-2 hover:brightness-150 focus:outline-none focus:ring-0 text-white focus:border-rose-500"
            )}
            ref={ref}
            {...props}
        >
            {children}
            <Select.Icon className="inline-flex items-center">
                <Icons.chevronDown size={16} />
            </Select.Icon>
        </SelectPrimitive.Trigger>
    )
})

Select.ScrollUpButton = React.forwardRef<
    HTMLDivElement,
    SelectPrimitive.SelectScrollUpButtonProps
>(function SelectScrollUpButton({ className, ...props }, ref) {
    return (
        <SelectPrimitive.ScrollUpButton ref={ref} {...props}>
            <Icons.chevronUp />
        </SelectPrimitive.ScrollUpButton>
    )
})

Select.ScrollDownButton = React.forwardRef<
    HTMLDivElement,
    SelectPrimitive.SelectScrollDownButtonProps
>(function SelectScrolDownButton({ className, ...props }, ref) {
    return (
        <SelectPrimitive.ScrollDownButton ref={ref} {...props}>
            <Icons.chevronDown />
        </SelectPrimitive.ScrollDownButton>
    )
})

Select.Content = React.forwardRef<
    HTMLDivElement,
    SelectPrimitive.SelectContentProps
>(function DropdownMenuContent({ className, ...props }, ref) {
    return (
        <SelectPrimitive.Content
            ref={ref}
            className={cn(
                "overflow-hidden rounded-md border border-palette-300 shadow-lg animate-in slide-in-from-top-1 md:min-xw-32 dropdown z-30",
                className
            )}
            {...props}
        />
    )
})

Select.Item = React.forwardRef<HTMLDivElement, SelectPrimitive.SelectItemProps>(
    function SelectItem({ children, className, ...props }, ref) {
        return (
            <SelectPrimitive.Item
                onClick={(e) => {
                    e.stopPropagation()
                    e.nativeEvent.stopImmediatePropagation()
                }}
                ref={ref}
                className={cn(
                    "relative flex gap-2 cursor-default select-none items-center py-2 px-3 m-1  pl-8 rounded-md text-sm text-brandtext-500 outline-none focus:bg-palette-150 focus:text-white hover:brightness-200",
                    className
                )}
                {...props}
            >
                <SelectPrimitive.ItemIndicator className="absolute left-2">
                    <Icons.check size={16} />
                </SelectPrimitive.ItemIndicator>
                <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
            </SelectPrimitive.Item>
        )
    }
)

Select.Separator = React.forwardRef<
    HTMLDivElement,
    SelectPrimitive.SelectSeparatorProps
>(function SelectSeparator({ className, ...props }, ref) {
    return (
        <SelectPrimitive.Separator
            ref={ref}
            className={cn("h-px bg-palette-300", className)}
            {...props}
        />
    )
})
