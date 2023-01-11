"use client"

import { Avatar } from "@/ui/avatar"
import { AvatarProps } from "@radix-ui/react-avatar"
import { TUser } from "./user-account-nav"
import Image from "next/image"
import { ImageLoaderProps } from "next/image"
interface UserAvatarProps extends AvatarProps {
    user: TUser
}

const imageLoader = ({ src }: ImageLoaderProps) => {
    return `https://vamp.sh/api/avatar?seed=${src}cachebuster`
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
    return (
        <Avatar {...props}>
            <Image
                src={user.id}
                loader={imageLoader}
                className="w-8 h-8 rounded-full overflow-hidden border border-sm border-zinc-700/50"
                height={32}
                width={32}
                alt={`${user.name} avatar`}
            />
        </Avatar>
    )
}
