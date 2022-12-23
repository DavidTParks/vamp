import Link from "next/link"

import { UserAvatar } from "@/components/dashboard/user-avatar"
import { Icons } from "@/components/icons"
import { TUser } from "./user-account-nav"
interface MainNavProps {
    user: TUser
}

export function DashboardNav({ user }: MainNavProps) {
    return (
        <div className="flex gap-6 md:gap-10 text-red-50">
            <div className=" gap-4 items-center flex">
                <Link
                    href="/"
                    className="items-center space-x-2 md:flex text-2xl"
                >
                    <Icons.logo size={32} color="white" />
                </Link>
                <svg
                    className="hidden md:flex"
                    data-testid="geist-icon"
                    fill="none"
                    height="32"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    viewBox="0 0 24 24"
                    width="32"
                >
                    <path d="M16.88 3.549L7.12 20.451"></path>
                </svg>
                <div className="hidden md:flex items-center gap-4 w-56">
                    <div className="w-8 h-8">
                        <UserAvatar
                            user={{ name: user.name, image: user.image }}
                        />
                    </div>
                    <span className="text-sm text-brandtext-500 truncate">
                        {" "}
                        {user.email}
                    </span>
                </div>
            </div>
        </div>
    )
}
