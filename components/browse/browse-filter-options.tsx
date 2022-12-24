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

export function BrowseFilterOptions() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const searchParams = useSearchParams()

    const sort = searchParams.get("sort")
    const page = searchParams.get("page")
    const search = searchParams.get("search")

    return (
        <>
            <DropdownMenu>
                <DropdownMenu.Trigger asChild>
                    <div>
                        <Button
                            className="flex-shrink-0 h-9 border-l-0 rounded-l-none text-brandtext-600 gap-2"
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
                    <DropdownMenu.Content className="mt-2 z-50 dropdown">
                        <DropdownMenu.Separator />
                        {sortOptions.map((option) => (
                            <DropdownMenu.Item
                                key={option.query}
                                onSelect={() => {
                                    router.push(
                                        `/browse?${searchString(
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
