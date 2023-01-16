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
import { FormProvider, useForm } from "react-hook-form"
import * as z from "zod"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { trpc } from "@/client/trpcClient"

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
    project: Pick<Project, "id" | "image" | "name">
}

type FormData = z.infer<typeof projectCreateSchema>

export function ProjectImageForm({
    project,
    className,
    ...props
}: UserNameFormProps) {
    const updateProjectImage = trpc.project.updatePhoto.useMutation()

    const router = useRouter()

    const [isSaving, setIsSaving] = React.useState<boolean>(false)

    async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
        try {
            if (!event.target.files || event.target.files.length === 0) {
                throw new Error("You must select an image to upload.")
            }
            toast({
                message: "Updating photo...",
                type: "default",
            })
            setIsSaving(true)

            const file = event.target.files[0]
            const fileSize = file.size / 1024 / 1024

            if (fileSize > 5) {
                throw new Error(
                    "Image exceeds 2MB limit. Please upload a smaller image"
                )
            }

            const fileExt = file.name.split(".").pop()
            const fileName = `${project.id}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from("vamp")
                .upload(filePath, file, {
                    upsert: true,
                })

            if (uploadError) {
                throw uploadError
            }

            const { data } = supabase.storage
                .from("vamp")
                .getPublicUrl(`${filePath}`)

            const randomizedQueryString = `${
                data.publicUrl
            }?random=${Math.random()}`

            await updateProjectImage.mutateAsync({
                projectId: project.id,
                image: randomizedQueryString,
            })
            toast({
                message: "Project image updated",
                type: "success",
            })
            router.refresh()
        } catch (e) {
            console.log(e)
            toast({
                title: "Something went wrong.",
                message: "Please refresh the page and try again.",
                type: "error",
            })
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <Card>
            <Card.Header>
                <Card.Title>Project Photo</Card.Title>
                <Card.Description>Update your Project photo</Card.Description>
            </Card.Header>
            <Card.Content>
                <div className="relative h-24 w-24">
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full">
                        {project.image ? (
                            <Image
                                alt={`${project.name} avatar`}
                                height={128}
                                width={128}
                                src={project.image}
                            />
                        ) : (
                            <Image
                                alt={`${project.name} avatar`}
                                height={128}
                                width={128}
                                src={`https://avatar.vercel.sh/${project.id}`}
                            />
                        )}
                    </div>
                    {isSaving && (
                        <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-appbg/50">
                            <Icons.spinner className=" animate-spin" />
                        </div>
                    )}

                    <label
                        htmlFor="desktop-user-photo"
                        className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"
                    >
                        <span>Change</span>
                        <span className="sr-only"> project photo</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={uploadAvatar}
                            disabled={isSaving}
                            id="desktop-user-photo"
                            name="user-photo"
                            className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                        />
                    </label>
                </div>
            </Card.Content>
        </Card>
    )
}
