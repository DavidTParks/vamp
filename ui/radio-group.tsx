"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

type RadioGroupProps = RadioGroupPrimitive.RadioGroupProps

export function RadioGroup({ ...props }: RadioGroupProps) {
    return (
        <RadioGroupPrimitive.Root
            className="flex flex-col items-start gap-4"
            {...props}
        />
    )
}

// RadioGroup.Indicator = React.forwardRef<
//     HTMLDivElement,
//     RadioGroupPrimitive.RadioIndicatorProps
// >(function RadioGroupIndicator({ className, ...props }, ref) {
//     return (
//         <RadioGroupPrimitive.Indicator
//             ref={ref}
//             className={cn("h-px bg-palette-300", className)}
//             {...props}
//         />
//     )
// })

RadioGroup.Item = React.forwardRef<
    HTMLButtonElement,
    RadioGroupPrimitive.RadioGroupItemProps
>(function RadioGroupItem({ children, id, ...props }, ref) {
    return (
        <div className="flex items-start gap-2">
            <RadioGroupPrimitive.Item
                ref={ref}
                {...props}
                className="flex h-6 w-6 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-raised-border bg-appbg focus:ring-2 focus:ring-rose-600"
                id={id}
            >
                <RadioGroupPrimitive.Indicator
                    className={cn(
                        "flex h-2 w-2 items-center justify-center overflow-hidden rounded-full bg-rose-600"
                    )}
                />
            </RadioGroupPrimitive.Item>
            <label className="flex flex-col items-start" htmlFor={id}>
                {children}
            </label>
        </div>
    )
})
