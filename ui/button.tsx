import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type ButtonProps = ComponentProps<"button">

const buttonStyles = cva(
    "button flex items-center justify-center shadow-sm transition-all duration-300 text-sm font-medium disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed",
    {
        variants: {
            intent: {
                primary: "bg-fuchsia-600 text-white hover:bg-fuchsia-500",
                secondary:
                    "bg-secondary-button text-white border border-secondary-border brightness-150 hover:brightness-200",
                tertiary: "text-white hover:brightness-150",
                text: "text-white",
                danger: "bg-red-600 text-white border border-transparent hover:bg-red-700",
            },
            fullWidth: {
                true: "w-full",
            },
            size: {
                noPadding: "p-0",
                small: "px-5 py-2 text-xs",
                regular: "px-5 py-2.5 text-sm",
            },
            borderRadius: {
                lg: "rounded-lg",
                full: "rounded-full",
            },
        },
        defaultVariants: {
            intent: "primary",
            size: "regular",
            borderRadius: "lg",
        },
    }
)

export interface TButtonProps
    extends ButtonProps,
        VariantProps<typeof buttonStyles> {}

export function Button({
    intent = "primary",
    borderRadius,
    size,
    fullWidth,
    className,
    ...props
}: TButtonProps) {
    return (
        <button
            className={cn(
                className,
                buttonStyles({ intent, fullWidth, borderRadius, size })
            )}
            {...props}
        />
    )
}
