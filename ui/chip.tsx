import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type ChipProps = ComponentProps<"span">

const chipStyles = cva("inline-flex items-center rounded-full font-medium", {
    variants: {
        intent: {
            green: "bg-green-900 text-green-100",
            default: "bg-palette-300 text-brandtext-400",
            purple: "bg-purple-900 text-purple-100",
            rose: "bg-rose-300 text-rose-900",
        },
        size: {
            small: "px-3 py-1 text-xs",
            regular: " px-3 py-1 text-sm",
        },
    },
    defaultVariants: {
        intent: "default",
        size: "regular",
    },
})

export interface TChipProps
    extends ChipProps,
        VariantProps<typeof chipStyles> {}

export function Chip({
    intent = "default",
    size,
    className,
    ...props
}: TChipProps) {
    return (
        <span
            className={cn(chipStyles({ intent, size }), className)}
            {...props}
        />
    )
}
