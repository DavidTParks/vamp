"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { useFormContext } from "react-hook-form"

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
interface RadioItem extends RadioGroupPrimitive.RadioGroupItemProps {
    id: string
}
RadioGroup.Item = React.forwardRef<HTMLButtonElement, RadioItem>(
    function RadioGroupItem({ children, id, ...props }, ref) {
        const { register } = useFormContext()

        return (
            <div className="flex items-start gap-2">
                <RadioGroupPrimitive.Item
                    {...register(id)}
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
                <label
                    className="flex flex-col items-start text-sm text-brandtext-500"
                    htmlFor={id}
                >
                    {children}
                </label>
            </div>
        )
    }
)
