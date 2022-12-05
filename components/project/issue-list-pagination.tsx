"use client"

import { Button } from "@/ui/button"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { TProject } from "./secondary-nav"

type TIssueListPagination = {
    project: TProject
}
export default function IssueListPagination({ project }: TIssueListPagination) {
    const searchParams = useSearchParams()
    const router = useRouter()

    const page = searchParams.get("page")
        ? parseInt(searchParams.get("page"))
        : 1

    const previousPage = page ? parseInt(page.toString()) - 1 : null
    const nextPage = page ? parseInt(page.toString()) + 1 : 2

    return (
        <nav
            className="flex items-center justify-between border-t border-raised-border bg-appbg px-4 py-3 sm:px-0"
            aria-label="Pagination"
        >
            <div className="hidden sm:block">
                <p className="text-sm text-brandtext-600">
                    Showing{" "}
                    <span className="font-medium">{(page - 1) * 30 + 1}</span>{" "}
                    to <span className="font-medium">{page * 30}</span> of
                    results
                </p>
            </div>
            <div className="flex flex-1 justify-between sm:justify-end gap-4">
                {previousPage && (
                    <Button
                        onClick={() => {
                            router.push(
                                `/project/${project.id}/issues?page=${previousPage}`
                            )
                            router.refresh()
                        }}
                        intent="secondary"
                        size="small"
                    >
                        Previous
                    </Button>
                )}
                <Button
                    onClick={() => {
                        router.push(
                            `/project/${project.id}/issues?page=${nextPage}`
                        )
                        router.refresh()
                    }}
                    intent="secondary"
                    size="small"
                >
                    Next
                </Button>
            </div>
        </nav>
    )
}
