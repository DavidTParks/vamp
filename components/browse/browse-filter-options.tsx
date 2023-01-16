"use client"

import { Button } from "@/ui/button"
import { useRouter } from "next/navigation"
import * as React from "react"

import { Icons } from "@/components/icons"
import { DropdownMenu } from "@/ui/dropdown"
import { useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { searchString } from "@/lib/utils"

const sortOptions = [
    {
        name: "Created",
        icon: Icons.sortDesc,
        query: "createdDesc",
    },
    {
        name: "Created",
        icon: Icons.sortAsc,
        query: "createdAsc",
    },
    {
        name: "Price",
        icon: Icons.sortDesc,
        query: "priceDesc",
    },
    {
        name: "Price",
        icon: Icons.sortAsc,
        query: "priceAsc",
    },
]

interface IBrowseFilterOptions {
    baseUrl?: string
}

export function BrowseFilterOptions({
    baseUrl = "/browse",
}: IBrowseFilterOptions) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const searchParams = useSearchParams()

    const sort = searchParams.get("sort")
    const page = searchParams.get("page")
    const search = searchParams.get("search")

    return (
        <>
            <DropdownMenu>
                <DropdownMenu.Trigger className="rounded-l-none" asChild>
                    <div>
                        <Button
                            className="h-9 flex-shrink-0 gap-2 rounded-l-none border-l-0 text-brandtext-600"
                            intent="outline"
                        >
                            <span className="text-brandtext-500">Sort</span>{" "}
                            {isPending ? (
                                <Icons.spinner
                                    size={16}
                                    className="animate-spin"
                                />
                            ) : (
                                <Icons.chevronDown size={16} />
                            )}
                        </Button>
                    </div>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content className="dropdown z-50 mt-2">
                        <DropdownMenu.Separator />
                        {sortOptions.map((option) => (
                            <DropdownMenu.Item
                                key={option.query}
                                onSelect={() => {
                                    router.push(
                                        `${baseUrl}?${searchString(
                                            page,
                                            search,
                                            option.query
                                        )}`
                                    )
                                    startTransition(() => {
                                        router.refresh()
                                    })
                                }}
                                className={cn(
                                    "flex gap-2",
                                    option.query === sort
                                        ? "text-rose-600"
                                        : null
                                )}
                            >
                                <option.icon
                                    size={16}
                                    className={cn(
                                        "text-brandtext-600",
                                        option.query === sort
                                            ? "text-rose-600"
                                            : null
                                    )}
                                />
                                {option.name}
                            </DropdownMenu.Item>
                        ))}
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu>
        </>
    )
}
