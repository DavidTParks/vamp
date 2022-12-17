"use client"

import { Input } from "@/ui/input"
import { useForm } from "react-hook-form"
import { Icons } from "../icons"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { issueSearchString } from "@/lib/utils"

type TSearch = {
    search?: string
}

export function BrowseSearch() {
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
        router.push(`/browse?search=${data.search}`)
        router.refresh()
    }

    return (
        <div className="w-full relative">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
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
