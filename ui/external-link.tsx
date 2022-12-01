import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps } from "react"

type ExternalLinkProps = ComponentProps<"a">

interface TExternalLink extends ExternalLinkProps {
    children?: React.ReactNode
}

export function ExternalLink({ children, ...props }: TExternalLink) {
    return (
        <a rel="noopener noreferrer" target="_blank" {...props}>
            {children}
        </a>
    )
}
