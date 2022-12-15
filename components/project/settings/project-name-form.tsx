"use client"

import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { projectCreateSchema } from "@/lib/validations/project"
import { Button } from "@/ui/button"
import { Card } from "@/ui/card"
import { Input } from "@/ui/input"
import { toast } from "@/ui/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Project } from "@prisma/client"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
    project: Pick<Project, "id" | "name" | "description">
}

type FormData = z.infer<typeof projectCreateSchema>

export function ProjectNameForm({
    project,
    className,
    ...props
}: UserNameFormProps) {
    const router = useRouter()
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(projectCreateSchema),
        defaultValues: {
            name: project.name,
            description: project.description,
        },
    })
    const [isSaving, setIsSaving] = React.useState<boolean>(false)

    async function onSubmit(data: FormData) {
        setIsSaving(true)

        const response = await fetch(`/api/project/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: project.id,
                name: data.name,
                description: data.description,
            }),
        })

        setIsSaving(false)

        if (!response?.ok) {
            return toast({
                title: "Something went wrong.",
                message: "Your name was not updated. Please try again.",
                type: "error",
            })
        }

        toast({
            title: "Project's name updated",
            message: "Your Project's name has been updated.",
            type: "success",
        })

        router.refresh()
    }

    return (
        <form
            className={cn(className)}
            onSubmit={handleSubmit(onSubmit)}
            {...props}
        >
            <Card>
                <Card.Header>
                    <Card.Title>Project Name</Card.Title>
                    <Card.Description>
                        Please enter your project's name or a name you are
                        comfortable with
                    </Card.Description>
                </Card.Header>
                <Card.Content>
                    <div className="grid gap-1">
                        <label className="sr-only" htmlFor="name">
                            Name
                        </label>
                        <Input
                            id="name"
                            // className="my-0 mb-2 block h-9 w-[350px] rounded-md border border-slate-300 py-2 px-3 text-sm placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1"
                            size={32}
                            name="name"
                            register={register}
                            {...register("name")}
                        />
                        {errors?.name && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                </Card.Content>
                <Card.Footer>
                    <Button intent="primary" type="submit" disabled={isSaving}>
                        {isSaving && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <span>Save</span>
                    </Button>
                </Card.Footer>
            </Card>
        </form>
    )
}
