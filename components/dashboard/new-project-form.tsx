"use client"

import { cn, dateToNow } from "@/lib/utils"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { ScrollArea } from "@/ui/scroll-area"
import * as React from "react"
import { UseFormReturn } from "react-hook-form"
import { GithubRepository } from "types"
import { CreateProjectFormData } from "./project-create-button"

export type SelectGithubRepoEvent = React.Dispatch<
    React.SetStateAction<GithubRepository>
>
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    repositories: GithubRepository[]
    projectName: UseFormReturn<CreateProjectFormData>
    onSubmit: any
    onProjectSelect: SelectGithubRepoEvent
}

export function NewProjectForm({
    repositories,
    onProjectSelect,
    className,
    projectName,
    onSubmit,
    ...props
}: UserAuthFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = projectName

    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    return (
        <>
            <div className={cn("grid gap-6", className)} {...props}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        <div className="grid gap-1">
                            <Label htmlFor="projectName">Project name *</Label>
                            <Input
                                id="projectName"
                                placeholder="Ex. Next.js "
                                type="text"
                                autoCapitalize="none"
                                autoComplete="projectName"
                                autoCorrect="off"
                                name="projectName"
                                disabled={isLoading}
                                register={register}
                            />
                            {errors?.name && (
                                <p className="px-1 text-xs text-red-600">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                    </div>
                </form>
            </div>
            <p className="text-slate-200 mt-4">Select git repository</p>

            <div className="mt-0">
                <ScrollArea
                    type="auto"
                    className="h-72 w-full rounded-md overflow-hidden border border-slate-700"
                >
                    <ScrollArea.Viewport>
                        <div className="flex flex-col relative divide-y divide-slate-800">
                            {repositories?.map((repo) => (
                                <div
                                    className="p-4 flex justify-between items-center"
                                    key={repo.id}
                                >
                                    <div className="flex items-center gap-2">
                                        <a
                                            target="_blank"
                                            rel="noreferrer"
                                            href={repo.html_url}
                                            className="text-white text-sm font-medium hover:underline"
                                        >
                                            {repo.name}
                                        </a>
                                        <div className="text-slate-500 text-2xl">
                                            &middot;
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            {dateToNow(
                                                new Date(repo.pushed_at)
                                            )}
                                        </div>
                                    </div>
                                    <div className="pr-4">
                                        <Button
                                            onClick={() =>
                                                onProjectSelect(repo)
                                            }
                                            intent="secondary"
                                            size="small"
                                        >
                                            Select
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea.Viewport>
                    <ScrollArea.ScrollBar orientation="vertical">
                        <ScrollArea.Thumb />
                    </ScrollArea.ScrollBar>
                </ScrollArea>
            </div>
        </>
    )
}
