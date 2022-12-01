import React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
type LabelProps = LabelPrimitive.LabelProps

export function Label({ className, ...props }: LabelProps) {
    return <LabelPrimitive.Root className="text-sm text-slate-300" {...props} />
}
