"use client"

import { searchString } from "@/lib/utils"
import { Input } from "@/ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { TProject } from "./secondary-nav"

type TIssueSearch = {
    project: TProject
}

type TSearch = {
    search?: string
}

export default function IssueSearch({ project }: TIssueSearch) {
    const [isPending, startTransition] = useTransition()
    const searchParams = useSearchParams()
    const search = searchParams.get("search")

    const router = useRouter()
    const methods = useForm<TSearch>({
        defaultValues: {
            search: search ?? "",
        },
    })

    const onSubmit = (data: TSearch) => {
        router.push(
            `/project/${project.id}/issues?${searchString("1", data.search)}`
        )
        startTransition(() => {
            router.refresh()
        })
    }

    return (
        <FormProvider {...methods}>
            <div className="w-full relative">
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Input
                        isPending={isPending}
                        intent="search"
                        id="search"
                        placeholder="Search all issues"
                        type="search"
                        autoCapitalize="none"
                        autoComplete="search"
                        autoCorrect="off"
                        name="search"
                    />
                </form>
            </div>
        </FormProvider>
    )
}
