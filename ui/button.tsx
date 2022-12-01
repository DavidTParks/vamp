import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps } from "react"

type ButtonProps = ComponentProps<"button">

const buttonStyles = cva(
    "button flex items-center justify-center shadow-lg transition-all text-sm font-medium disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed",
    {
        variants: {
            intent: {
                primary:
                    "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:from-violet-600 hover:to-fuchsia-600",
                secondary:
                    "bg-slate-800 text-white border border-transparent hover:border-slate-700",
                tertiary: "text-white",
                danger: "bg-red-500 text-white focus:ring-red-500",
            },
            fullWidth: {
                true: "w-full",
            },
            size: {
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

export interface Props extends ButtonProps, VariantProps<typeof buttonStyles> {}

export function Button({
    intent = "primary",
    borderRadius,
    size,
    fullWidth,
    ...props
}: Props) {
    return (
        <button
            className={buttonStyles({ intent, fullWidth, borderRadius, size })}
            {...props}
        />
    )
}
