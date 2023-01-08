"use client"

import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps } from "react"
import { useFormContext } from "react-hook-form"
import { Label } from "./label"

type InputProps = ComponentProps<"input">

const checkboxStyles = cva(
    "form-checkbox rounded focus:ring-offset-0 focus:ring-opacity-0 focus:ring shadow-sm",
    {
        variants: {
            intent: {
                primary:
                    " border-palette-300 text-rose-600 focus:border-rose-500 focus:ring-rose-200 bg-palette-400",
            },
        },
        defaultVariants: {
            intent: "primary",
        },
    }
)

export interface Props extends InputProps, VariantProps<typeof checkboxStyles> {
    id: string
    label?: string
    description?: string
}

export function Checkbox({
    id,
    label,
    description,
    intent,
    className,
    children,
    ...props
}: Props) {
    const { register } = useFormContext()

    return (
        <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2">
                <input
                    className={cn(checkboxStyles({ intent }), className)}
                    type="checkbox"
                    id={id}
                    {...register(id)}
                    {...props}
                ></input>
                {label && <Label htmlFor={id}>{label}</Label>}
            </div>
            {children}
        </div>
    )
}
