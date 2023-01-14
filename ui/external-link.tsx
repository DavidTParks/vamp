import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps } from "react"
import { cn } from "@/lib/utils"

type ExternalLinkProps = ComponentProps<"a">

interface TExternalLink extends ExternalLinkProps {
    children?: React.ReactNode
}

export function ExternalLink({ children, className, ...props }: TExternalLink) {
    return (
        <a
            className={cn(
                className,
                "hover:text-brandtext-500 hover:underline hover:brightness-150"
            )}
            rel="noopener noreferrer"
            target="_blank"
            {...props}
        >
            {children}
        </a>
    )
}
