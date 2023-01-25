import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type ChipProps = ComponentProps<"span">

const chipStyles = cva(
    "inline-flex items-center rounded-full font-semibold leading-6 ring-1 ring-inset",
    {
        variants: {
            intent: {
                green: "bg-green-500/10 text-green-400 ring-green-500/20",
                default: "bg-slate-500/10 text-brandtext-500 ring-slate-500/20",
                purple: "bg-purple-500/10 text-purple-400 ring-purple-500/20",
                rose: " bg-rose-500/10 text-rose-400 ring-rose-500/20",
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
    }
)

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
