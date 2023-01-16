import Link from "next/link"

import { UserAvatar } from "@/components/dashboard/user-avatar"
import { Icons } from "@/components/icons"
import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"

export async function DashboardNav() {
    const user = await getCurrentUser()

    if (!user) {
        return notFound()
    }

    return (
        <div className="flex gap-6 text-red-50 md:gap-10">
            <div className=" flex items-center gap-4">
                <Link
                    href="/"
                    className="items-center space-x-2 text-2xl md:flex"
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
                <div className="hidden w-32 items-center gap-2 md:flex md:w-56">
                    <UserAvatar
                        user={{
                            id: user.id,
                            name: user.name,
                            image: user.image,
                        }}
                    />
                    <span className="truncate text-sm text-brandtext-500">
                        {" "}
                        {user.email}
                    </span>
                </div>
            </div>
        </div>
    )
}
