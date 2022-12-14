"use client"

import Link from "next/link"
import * as React from "react"

import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/ui/button"
import { Project, User } from "@prisma/client"
import Image from "next/image"
import { MainNavItem } from "types"
import { MobileNavButton } from "@/ui/mobile-nav-button"
import { Select } from "@/ui/select"
import { useRouter } from "next/navigation"
import { DropdownMenu } from "@/ui/dropdown"
import { cn } from "@/lib/utils"

import { trpc } from "@/client/trpcClient"

interface MainNavProps {
    items?: MainNavItem[]
    children?: React.ReactNode
    project: Pick<Project, "id" | "name">
}

export function ProjectNav({ project }: MainNavProps) {
    const { data: userProjects } = trpc.user.getUserProjects.useQuery()

    const router = useRouter()
    return (
        <div className="flex gap-6 md:gap-10 text-red-50">
            <div className=" gap-4 items-center flex">
                <Link
                    href="/dashboard"
                    className="items-center space-x-2 md:flex text-2xl"
                >
                    <Icons.logo size={32} color="white" />
                </Link>
                <svg
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
                <div className="flex items-center gap-4 md:w-56">
                    <DropdownMenu>
                        <DropdownMenu.Trigger>
                            <div
                                className={cn(
                                    "inline-flex items-center text-sm gap-2 border border-raised-border rounded-md overflow-hidden px-3 py-2 hover:brightness-150 "
                                )}
                            >
                                <div className="h-6 w-6 rounded-full overflow-hidden inline-flex items-center justify-center relative">
                                    <Image
                                        fill={true}
                                        alt="Avatar"
                                        src={`https://avatar.vercel.sh/${project.id}${project.name}`}
                                    />
                                </div>
                                <span className="hidden md:block text-sm text-brandtext-500 truncate max-w-[128px]">
                                    {" "}
                                    {project.name}
                                </span>
                                <Icons.chevronDown size={16} />
                            </div>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                            <DropdownMenu.Content className="mt-2 w-24 z-50 md:min-w-[16rem] overflow-hidden truncate dropdown">
                                {userProjects?.map((userProject) => (
                                    <DropdownMenu.Item key={userProject.id}>
                                        <Link
                                            href={`/project/${userProject.id}`}
                                            className="w-full inline-flex gap-2 items-center relative"
                                        >
                                            {userProject.id === project.id && (
                                                <div className="absolute right-0 flex items-center">
                                                    <Icons.check size={16} />
                                                </div>
                                            )}
                                            <div className="h-6 w-6 rounded-full overflow-hidden inline-flex items-center justify-center relative flex-shrink-0">
                                                <Image
                                                    fill={true}
                                                    alt="Avatar"
                                                    src={`https://avatar.vercel.sh/${userProject.id}${userProject.name}`}
                                                />
                                            </div>
                                            <span className="hidden md:block text-sm text-brandtext-500 truncate max-w-[128px]">
                                                {" "}
                                                {userProject.name}
                                            </span>
                                        </Link>
                                    </DropdownMenu.Item>
                                ))}
                                <DropdownMenu.Item>
                                    <Link
                                        href={`/new`}
                                        className="w-full inline-flex gap-2 items-center text-brandtext-600"
                                    >
                                        <Icons.add size={16} />{" "}
                                        <span className="hidden md:block">
                                            Add a new project
                                        </span>
                                    </Link>
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}
