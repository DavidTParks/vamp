"use client"

import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { projectCreateSchema } from "@/lib/validations/project"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { TextArea } from "@/ui/textarea"
import { toast } from "@/ui/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useForm, FormProvider } from "react-hook-form"
import { GithubRepository } from "types"
import * as z from "zod"
import { TUser } from "./user-account-nav"

interface ProjectCreateForm extends React.HTMLAttributes<HTMLButtonElement> {
    repo: Pick<
        GithubRepository,
        "id" | "name" | "description" | "html_url" | "owner"
    >
}

export type CreateProjectFormData = z.infer<typeof projectCreateSchema>

export function ProjectCreateForm({
    className,
    children,
    repo,
    ...props
}: ProjectCreateForm) {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const methods = useForm<CreateProjectFormData>({
        resolver: zodResolver(projectCreateSchema),
        defaultValues: {
            name: repo.name,
            description: repo.description,
        },
    })

    async function onClick(data: CreateProjectFormData) {
        setIsLoading(true)

        const response = await fetch("/api/project", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                repoName: repo.name,
                url: repo.html_url,
                repoId: repo.id,
                name: data.name,
                description: data.description,
                owner: repo.owner.login,
            }),
        })

        setIsLoading(false)

        if (!response?.ok) {
            return toast({
                title: "Something went wrong.",
                message: "Your project was not created. Please try again.",
                type: "error",
            })
        }

        const project = await response.json()

        toast({
            title: "Project created",
            message: "Start posting issue bounties",
            type: "success",
        })

        // This forces a cache invalidation.
        router.refresh()

        router.push(`/dashboard?from=create`)
    }

    return (
        <FormProvider {...methods}>
            <div className={cn("mt-4 grid gap-6", className)}>
                <form onSubmit={methods.handleSubmit(onClick)}>
                    <div className="grid gap-8">
                        <div className="grid gap-1">
                            <Input
                                label="Project name *"
                                id="name"
                                placeholder="Ex. Next.js "
                                type="text"
                                autoCapitalize="none"
                                autoComplete="name"
                                autoCorrect="off"
                                name="name"
                                disabled={isLoading}
                            />
                            {methods.formState.errors?.name && (
                                <p className="px-1 text-xs text-red-600">
                                    {methods.formState.errors.name.message}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-1">
                            <TextArea
                                label="Project description"
                                maxLength={320}
                                id="description"
                                placeholder="Ex. The sickest project to exist in Open Source "
                                autoCapitalize="none"
                                autoComplete="description"
                                autoCorrect="off"
                                name="description"
                                disabled={isLoading}
                            />
                            {methods.formState.errors?.description && (
                                <p className="px-1 text-xs text-red-600">
                                    {
                                        methods.formState.errors.description
                                            .message
                                    }
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="mt-8 flex gap-4">
                        <Button
                            disabled={isLoading}
                            fullWidth={true}
                            intent="primary"
                            type="submit"
                        >
                            {isLoading ? (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            ) : null}
                            Create
                        </Button>
                    </div>
                </form>
            </div>
        </FormProvider>
    )
}
