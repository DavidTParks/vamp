"use client"

import { Input } from "@/ui/input"
import { useForm } from "react-hook-form"
import { Icons } from "../icons"
import { useRouter } from "next/navigation"
import { TProject } from "./secondary-nav"
import { useSearchParams } from "next/navigation"
import { issueSearchString } from "@/lib/utils"

type TIssueSearch = {
    project: TProject
}

type TSearch = {
    search?: string
}

export default function IssueSearch({ project }: TIssueSearch) {
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
        router.push(
            `/project/${project.id}/issues?${issueSearchString(
                "1",
                data.search
            )}`
        )
        router.refresh()
    }

    return (
        <div className="w-full relative">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    intent="search"
                    id="search"
                    placeholder="Search all issues"
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
