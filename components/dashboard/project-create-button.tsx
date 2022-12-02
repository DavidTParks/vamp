"use client"

import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { projectCreateSchema } from "@/lib/validations/project"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { Modal } from "@/ui/modal"
import { toast } from "@/ui/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useForm } from "react-hook-form"
import { GithubRepository } from "types"
import * as z from "zod"
import { TextArea } from "@/ui/textarea"
import { UserAvatar } from "@/components/dashboard/user-avatar"
import { UserAccountNavProps } from "./user-account-nav"
import { TUser } from "./user-account-nav"
interface ProjectCreateButton extends React.HTMLAttributes<HTMLButtonElement> {
    repositories?: GithubRepository[]
    user: TUser
}

export type CreateProjectFormData = z.infer<typeof projectCreateSchema>

export function ProjectCreateButton({
    className,
    repositories,
    children,
    user,
    ...props
}: ProjectCreateButton) {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [showModal, setShowModal] = React.useState<boolean>(false)
    const [githubRepo, setSelectedGithubRepo] =
        React.useState<GithubRepository | null>(null)

    const {
        getValues,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateProjectFormData>({
        resolver: zodResolver(projectCreateSchema),
    })

    console.log(getValues("description"))

    async function onClick(data: CreateProjectFormData) {
        setShowModal(true)
        setIsLoading(true)

        console.log("Data", data)

        const response = await fetch("/api/project", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                description: data.description,
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

        // This forces a cache invalidation.
        router.refresh()

        setShowModal(false)
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
                    <div className={cn("grid gap-6 mt-4", className)}>
                        <form onSubmit={handleSubmit(onClick)}>
                            <div className="grid gap-8">
                                <div className="grid gap-1">
                                    <Label htmlFor="name">Project name *</Label>
                                    <Input
                                        id="name"
                                        placeholder="Ex. Next.js "
                                        type="text"
                                        autoCapitalize="none"
                                        autoComplete="name"
                                        autoCorrect="off"
                                        name="name"
                                        disabled={isLoading}
                                        register={register}
                                    />
                                    {errors?.name && (
                                        <p className="px-1 text-xs text-red-600">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-1">
                                    <Label htmlFor="description">
                                        Project description
                                    </Label>
                                    <TextArea
                                        maxLength={320}
                                        id="description"
                                        placeholder="Ex. The sickest project to exist in Open Source "
                                        autoCapitalize="none"
                                        autoComplete="description"
                                        autoCorrect="off"
                                        name="description"
                                        disabled={isLoading}
                                        register={register}
                                    />
                                    {errors?.description && (
                                        <p className="px-1 text-xs text-red-600">
                                            {errors.description.message}
                                        </p>
                                    )}
                                </div>
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
                                >
                                    Create
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal.Content>
            </Modal>
        </>
    )
}
