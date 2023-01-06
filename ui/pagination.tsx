"use client"

import { searchString } from "@/lib/utils"
import { Button } from "@/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"
import { Icons } from "@/components/icons"
interface TBountyListPagination {
    itemCount: number
    pageSize: number
    baseUrl: string
}

export function Pagination({
    itemCount,
    pageSize,
    baseUrl,
}: TBountyListPagination) {
    const [isPending, startTransition] = useTransition()
    const searchParams = useSearchParams()
    const router = useRouter()

    const page = searchParams.get("page")
        ? // @ts-ignore
          parseInt(searchParams.get("page"))
        : 1

    const search = searchParams.get("search")
    const sort = searchParams.get("sort")

    const previousPage = page ? parseInt(page.toString()) - 1 : null
    const nextPage = page ? parseInt(page.toString()) + 1 : 2

    const nextPageQueryString = searchString(nextPage.toString(), search, sort)
    const previousPageQueryString = searchString(
        previousPage?.toString(),
        search,
        sort
    )

    return (
        <nav
            className="flex items-center justify-between border-t border-raised-border bg-appbg px-4 py-3 sm:px-0"
            aria-label="Pagination"
        >
            <div className="hidden sm:block">
                <p className="text-sm text-brandtext-600">
                    Showing{" "}
                    <span className="font-medium">
                        {(page - 1) * pageSize + 1}
                    </span>{" "}
                    to <span className="font-medium">{page * pageSize}</span> of{" "}
                    {itemCount} results
                </p>
            </div>
            <div className="flex flex-1 justify-between sm:justify-end gap-4">
                {previousPage ? (
                    <Button
                        onClick={() => {
                            router.push(`${baseUrl}?${previousPageQueryString}`)
                            startTransition(() => {
                                router.refresh()
                            })
                        }}
                        className="inline-flex gap-2"
                        intent="secondary"
                        size="small"
                    >
                        {isPending ? (
                            <Icons.spinner className="h-4 w-4 animate-spin text-brandtext-600" />
                        ) : (
                            <Icons.arrowLeft size={16} />
                        )}
                        Previous
                    </Button>
                ) : null}
                {page * pageSize < itemCount && (
                    <Button
                        onClick={() => {
                            router.push(`${baseUrl}?${nextPageQueryString}`)
                            startTransition(() => {
                                router.refresh()
                            })
                        }}
                        className="inline-flex gap-2"
                        intent="secondary"
                        size="small"
                    >
                        Next
                        {isPending ? (
                            <Icons.spinner className="h-4 w-4 animate-spin text-brandtext-600" />
                        ) : (
                            <Icons.arrowRight size={16} />
                        )}
                    </Button>
                )}
            </div>
        </nav>
    )
}
