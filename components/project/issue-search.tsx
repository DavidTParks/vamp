"use client"

import { Input } from "@/ui/input"
import { useForm } from "react-hook-form"
import { Icons } from "../icons"
export default function IssueSearch() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    return (
        <div className="w-full relative">
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
        </div>
    )
}
