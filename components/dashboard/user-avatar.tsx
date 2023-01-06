"use client"

import { User } from "@prisma/client"
import { AvatarProps } from "@radix-ui/react-avatar"
import { TUser } from "./user-account-nav"
import { Icons } from "@/components/icons"
import { Avatar } from "@/ui/avatar"

interface UserAvatarProps extends AvatarProps {
    user: TUser
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
    return (
        <Avatar {...props}>
            <Avatar.Image alt={`${user.name} image`} src={user.image} />
        </Avatar>
    )
}
