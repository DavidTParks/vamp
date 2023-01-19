"use client"

import { Checkbox } from "@/ui/checkbox"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useTransition } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { TProject } from "./secondary-nav"
import { deleteSearchParamByKeyValue } from "@/lib/utils"

type TIssueSelect = {
    issueId: number
}

type TSearch = {
    issueSelected: boolean
}

export function IssueSelect({ issueId }: TIssueSelect) {
    const [isPending, startTransition] = useTransition()
    const searchParams = useSearchParams()

    const selectedParams = searchParams.getAll("selected")

    const isItemSelected = selectedParams.find(
        (item) => item === issueId?.toString()
    )

    const router = useRouter()
    const methods = useForm<TSearch>({
        defaultValues: {
            issueSelected: isItemSelected ? true : false,
        },
    })

    useEffect(() => {
        if (!!isItemSelected) {
            methods.setValue("issueSelected", true)
        } else {
            methods.setValue("issueSelected", false)
        }
    }, [isItemSelected])

    const selected = methods.watch("issueSelected")

    useEffect(() => {
        if (selected && !isItemSelected) {
            const currentUrl = new URL(window.location.href)
            currentUrl.searchParams.append("selected", issueId?.toString())

            router.push(`${currentUrl?.toString()}`)
        } else if (!selected && isItemSelected) {
            const currentUrl = new URL(window.location.href)
            deleteSearchParamByKeyValue(
                currentUrl.searchParams,
                "selected",
                issueId?.toString()
            )

            router.push(`${currentUrl?.toString()}`)
        }
    }, [selected])

    return (
        <FormProvider {...methods}>
            <Checkbox id="issueSelected" />
        </FormProvider>
    )
}
