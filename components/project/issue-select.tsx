"use client"

import { useStore } from "@/store"
import { GithubIssue } from "@/types"
import { Checkbox } from "@/ui/checkbox"
import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

type TIssueSelect = {
    issue: GithubIssue
}

type TSearch = {
    issueSelected: boolean
}

export function IssueSelect({ issue }: TIssueSelect) {
    const { selectIssue, removeIssue, selectedIssues } = useStore()
    const router = useRouter()

    const methods = useForm<TSearch>({
        defaultValues: {
            issueSelected: false,
        },
    })

    const isSelected = methods.watch("issueSelected")

    useEffect(() => {
        if (isSelected) {
            selectIssue(issue)
        } else {
            removeIssue(issue)
        }
    }, [isSelected])

    return (
        <FormProvider {...methods}>
            <Checkbox id="issueSelected" />
        </FormProvider>
    )
}
