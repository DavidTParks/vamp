"use client"

import { Input } from "@/ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"

type TSearch = {
    search?: string
}

export function BrowseSearch() {
    const [isPending, startTransition] = useTransition()

    const searchParams = useSearchParams()
    const search = searchParams.get("search")

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
        const searchTrimmed = data?.search?.trim()
        const searchQuery = !!searchTrimmed ? `?search=${searchTrimmed}` : ""
        router.push(`/browse${searchQuery}`)

        startTransition(() => {
            router.refresh()
        })
    }

    return (
        <div className="w-full relative">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    isPending={isPending}
                    className="bg-appbg"
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
        </div>
    )
}