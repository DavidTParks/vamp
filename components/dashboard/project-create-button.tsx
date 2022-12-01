"use client"

import { NewProjectForm } from "@/components/dashboard/new-project-form"
import { Icons } from "@/components/icons"
import { projectSchema } from "@/lib/validations/project"
import { Button } from "@/ui/button"
import { Modal } from "@/ui/modal"
import { toast } from "@/ui/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useForm } from "react-hook-form"
import { GithubRepository } from "types"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { dateToNow } from "@/lib/utils"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { ScrollArea } from "@/ui/scroll-area"
import GithubRepoList from "./github-repo-list"
interface ProjectCreateButton extends React.HTMLAttributes<HTMLButtonElement> {
    repositories?: GithubRepository[]
}

export type CreateProjectFormData = z.infer<typeof projectSchema>

export function ProjectCreateButton({
    className,
    repositories,
    children,
    ...props
}: ProjectCreateButton) {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [showModal, setShowModal] = React.useState<boolean>(false)
    const [githubRepo, setSelectedGithubRepo] =
        React.useState<GithubRepository | null>(null)

    console.log("repos in create button", repositories)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateProjectFormData>({
        resolver: zodResolver(projectSchema),
    })

    async function onClick(data: CreateProjectFormData) {
        setShowModal(true)
        setIsLoading(true)

        const response = await fetch("/api/project", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: "Untitled Post",
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

        const post = await response.json()

        // This forces a cache invalidation.
        router.refresh()

        router.push(`/project/${post.id}`)
    }

    return (
        <>
            <Button
                onClick={() => setShowModal(true)}
                disabled={isLoading}
                {...props}
            >
                {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.add className="mr-2 h-4 w-4" />
                )}
                New project
            </Button>
            <Modal onOpenChange={setShowModal} open={showModal}>
                <Modal.Content>
                    <Modal.Title>Create new project</Modal.Title>
                    <div className={cn("grid gap-6", className)}>
                        <form onSubmit={handleSubmit(onClick)}>
                            <div className="grid gap-2">
                                <div className="grid gap-1">
                                    <Label htmlFor="projectName">
                                        Project name *
                                    </Label>
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
                                {/* @ts-ignore */}
                                {children}
                            </ScrollArea.Viewport>
                            <ScrollArea.ScrollBar orientation="vertical">
                                <ScrollArea.Thumb />
                            </ScrollArea.ScrollBar>
                        </ScrollArea>
                    </div>
                    <div className="mt-4 flex gap-4">
                        <Button
                            onClick={() => setShowModal(false)}
                            fullWidth={true}
                            intent="secondary"
                            type="submit"
                        >
                            Cancel
                        </Button>
                        <Button
                            fullWidth={true}
                            intent="primary"
                            type="submit"
                            disabled={true}
                        >
                            Create
                        </Button>
                    </div>
                </Modal.Content>
            </Modal>
        </>
    )
}
