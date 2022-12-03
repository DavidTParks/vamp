import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface EmptyPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function EmptyPlaceholder({
    className,
    children,
    ...props
}: EmptyPlaceholderProps) {
    return (
        <div
            className={cn(
                "flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed border-raised-border p-8 text-center animate-in fade-in-50",
                className
            )}
            {...props}
        >
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                {children}
            </div>
        </div>
    )
}

interface EmptyPlaceholderIconProps
    extends Partial<React.SVGProps<SVGSVGElement>> {
    name: keyof typeof Icons
}

EmptyPlaceholder.Icon = function EmptyPlaceHolderIcon({
    name,
    className,
    ...props
}: EmptyPlaceholderIconProps) {
    const Icon = Icons[name]

    if (!Icon) {
        return null
    }

    return (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-palette-300">
            <Icon
                className={cn("h-10 w-10 text-brandtext-400", className)}
                {...props}
            />
        </div>
    )
}

interface EmptyPlacholderTitleProps
    extends React.HTMLAttributes<HTMLHeadingElement> {}

EmptyPlaceholder.Title = function EmptyPlaceholderTitle({
    className,
    ...props
}: EmptyPlacholderTitleProps) {
    return (
        <h2
            className={cn("mt-6 text-xl font-semibold text-white", className)}
            {...props}
        />
    )
}

interface EmptyPlacholderDescriptionProps
    extends React.HTMLAttributes<HTMLParagraphElement> {}

EmptyPlaceholder.Description = function EmptyPlaceholderDescription({
    className,
    ...props
}: EmptyPlacholderDescriptionProps) {
    return (
        <p
            className={cn(
                "mt-3 mb-8 text-center text-sm font-normal leading-6 text-brandtext-600",
                className
            )}
            {...props}
        />
    )
}
