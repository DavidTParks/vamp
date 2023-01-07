"use client"

import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps } from "react"
import { UseFormRegister, FieldValues } from "react-hook-form"
import { useFormContext } from "react-hook-form"
import { Label } from "./label"
import { capitalize } from "@/lib/utils"

type TextAreaProps = ComponentProps<"textarea">

const textAreaStyles = cva(
    "form-textarea my-0 mb-2 h-24 block w-full rounded-md border py-2 px-3 text-sm  transition-all duration-100 focus:outline-none focus:ring-none placeholder:text-placeholder focus:ring-0 form-input",
    {
        variants: {
            intent: {
                primary:
                    "bg-palette-400 border-palette-300 placeholder:text-placeholder hover:border-brandtext-600 text-white focus:border-rose-500",
            },
        },
        defaultVariants: {
            intent: "primary",
        },
    }
)

export interface Props
    extends TextAreaProps,
        VariantProps<typeof textAreaStyles> {
    id: string
    label?: string
}

export function TextArea({
    intent = "primary",
    id,
    name,
    label,
    ...props
}: Props) {
    const { register } = useFormContext()
    return (
        <>
            {label && <Label htmlFor={id}>{capitalize(label)}</Label>}
            <textarea
                id={id}
                {...register(id)}
                className={textAreaStyles({ intent })}
                {...props}
            />
        </>
    )
}
