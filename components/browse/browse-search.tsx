"use client"

import { searchString } from "@/lib/utils"
import { Input } from "@/ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { BrowseFilterOptions } from "./browse-filter-options"

type TSearch = {
    search?: string
}

export function BrowseSearch() {
    const [isPending, startTransition] = useTransition()

    const searchParams = useSearchParams()
    const search = searchParams.get("search")
    const sort = searchParams.get("sort")

    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TSearch>({
        defaultValues: {
            search,
        },
    })

    const onSubmit = (data: TSearch) => {
        router.push(`/browse?${searchString("1", data?.search ?? null, sort)}`)

        startTransition(() => {
            router.refresh()
        })
    }

    return (
        <div className="w-full relative flex">
            <form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    isPending={isPending}
                    className="bg-appbg rounded-r-none"
                    intent="search"
                    id="search"
                    placeholder="Search all bounties"
                    type="search"
                    autoCapitalize="none"
                    autoComplete="search"
                    autoCorrect="off"
                    name="search"
                    register={register}
                />
            </form>
            <BrowseFilterOptions />
        </div>
    )
}
