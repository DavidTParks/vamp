"use client"

import Link from "next/link"
import * as React from "react"

import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/ui/button"
import { Project } from "@prisma/client"
import Image from "next/image"
import { MainNavItem } from "types"

interface MainNavProps {
    items?: MainNavItem[]
    children?: React.ReactNode
    project: Pick<Project, "id" | "name">
}

export function BountyNav({ items, children, project }: MainNavProps) {
    const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

    return (
        <div className="flex gap-6 md:gap-10 text-red-50">
            <div className=" gap-4 items-center hidden md:flex">
                <Link
                    href="/"
                    className="hidden items-center space-x-2 md:flex text-2xl"
                >
                    <Icons.logo size={32} color="white" />
                    <span className="text-brandtext-500 font-bold text-xl ml-2">
                        Vamp
                    </span>
                </Link>
            </div>

            <Button
                className="flex items-center space-x-2 md:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
                {showMobileMenu ? (
                    <Icons.close />
                ) : (
                    <Icons.logo size={24} color="white" />
                )}
                <span className="font-bold">Menu</span>
            </Button>
            {showMobileMenu && <MobileNav items={items}>{children}</MobileNav>}
        </div>
    )
}
