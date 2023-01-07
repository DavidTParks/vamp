"use client"

import { User } from "@prisma/client"
import { AvatarProps } from "@radix-ui/react-avatar"
import { TUser } from "./user-account-nav"
import { Icons } from "@/components/icons"
import { Avatar } from "@/ui/avatar"
import { getBaseUrl } from "@/lib/utils"

interface UserAvatarProps extends AvatarProps {
    user: TUser
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
    if (!user.image)
        return (
            <Avatar {...props}>
                <Avatar.Fallback />
            </Avatar>
        )

    return (
        <Avatar {...props}>
            <img
                alt={`${user.name} image`}
                src={`/api/avatar?seed=${user.id}`}
            />
        </Avatar>
    )
}
