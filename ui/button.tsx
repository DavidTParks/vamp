import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

type ButtonProps = ComponentProps<"button">

const buttonStyles = cva(
    "button flex items-center justify-center shadow-sm transition-all duration-150 text-sm font-medium disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed focus:outline-none focus:ring-0",
    {
        variants: {
            intent: {
                primary: "bg-rose-600 text-white hover:bg-rose-500",
                secondary:
                    "bg-secondary-button text-white border border-raised-border brightness-100 hover:brightness-150",
                tertiary: "text-white hover:bg-palette-150 ",
                outline:
                    "text-white hover:bg-palette-150  border border-raised-border ",
                text: "text-brandtext-500 hover:text-white",
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
        VariantProps<typeof buttonStyles> {
    isLoading?: boolean
    children?: React.ReactNode
}

export function Button({
    intent = "primary",
    borderRadius,
    isLoading,
    size,
    fullWidth,
    className,
    children,
    ...props
}: TButtonProps) {
    return (
        <button
            className={cn(
                buttonStyles({ intent, fullWidth, borderRadius, size }),
                className
            )}
            {...props}
        >
            {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {children}
        </button>
    )
}
