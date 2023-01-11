"use client"

import { Avatar } from "@/ui/avatar"
import { AvatarProps } from "@radix-ui/react-avatar"
import { TUser } from "./user-account-nav"
import Image from "next/image"
interface UserAvatarProps extends AvatarProps {
    user: TUser
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
    // if (!user.image)
    //     return (
    //         <Avatar {...props}>
    //             <Avatar.Fallback />
    //         </Avatar>
    //     )

    return (
        <Avatar {...props}>
            <img
                height={32}
                width={32}
                alt={`${user.name} avatar`}
                src={`/api/avatar?seed=${user.id}&cache=bust`}
            />
        </Avatar>
    )
}
