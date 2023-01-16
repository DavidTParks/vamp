import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"
import Image, { ImageProps } from "next/image"

type AvatarProps = AvatarPrimitive.AvatarProps

export function Avatar({ className, ...props }: AvatarProps) {
    return (
        <AvatarPrimitive.Root
            className={cn(
                "relative flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-full border border-zinc-700/50  bg-zinc-800 shadow-md shadow-zinc-800/5 ring-0 ring-zinc-900/5",
                className
            )}
            {...props}
        />
    )
}

Avatar.Image = function AvatarImage({
    src,
    className,
    alt,
    width = 32,
    height = 32,
    ...props
}: ImageProps) {
    if (!src) {
        return <Avatar.Fallback />
    }

    return (
        <Image
            src={src}
            className={cn("", className)}
            alt={alt}
            width={width}
            height={height}
            {...props}
        />
    )
}

Avatar.Fallback = function AvatarFallback({
    className,
    children,
    ...props
}: AvatarPrimitive.AvatarFallbackProps) {
    return (
        <AvatarPrimitive.Fallback
            delayMs={500}
            className={cn("", className)}
            {...props}
        >
            {children}
        </AvatarPrimitive.Fallback>
    )
}
