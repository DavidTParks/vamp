"use client"

import * as React from "react"

import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

type CheckboxProps = CheckboxPrimitive.CheckboxProps

export function Checkbox({ ...props }: CheckboxProps) {
    return (
        <CheckboxPrimitive.Root
            className="my-0 inline-flex justify-center items-center h-4 w-4 rounded-md border p-2 text-sm  transition-all duration-100 focus:outline-none focus:ring-0 form-input bg-palette-400 border-slate-600 placeholder:text-placeholder hover:border-slate-500 text-white focus:border-rose-500"
            {...props}
        >
            <CheckboxPrimitive.Indicator className="text-brandtext-500">
                <Icons.check size={12} />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    )
}
