import clsx from "clsx"
import { PropsWithChildren } from "react"

interface IContainer extends PropsWithChildren {
    className: string
}

export function Container({ className, ...props }: IContainer) {
    return (
        <div
            className={clsx(
                "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
                className
            )}
            {...props}
        />
    )
}
