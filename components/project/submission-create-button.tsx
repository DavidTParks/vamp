"use client"

import { Bounty } from "@prisma/client"
import { useRouter } from "next/navigation"
import * as React from "react"

import { Icons } from "@/components/icons"
import { bountySubmissionSchema } from "@/lib/validations/bountySubmission"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { Modal } from "@/ui/modal"
import { TextArea } from "@/ui/textarea"
import { toast } from "@/ui/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider } from "react-hook-form"
import * as z from "zod"

interface PostOperationsProps {
    bounty: Pick<Bounty, "id">
    size?: "small" | "noPadding" | "regular"
}

export type CreateProjectFormData = z.infer<typeof bountySubmissionSchema>

export function SubmissionCreateButton({
    bounty,
    size = "regular",
}: PostOperationsProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)

    const methods = useForm<CreateProjectFormData>({
        resolver: zodResolver(bountySubmissionSchema),
    })

    async function onClick(data: CreateProjectFormData) {
        setIsLoading(true)
        const response = await fetch("/api/bounty-submissions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                solutionLink: data.solutionLink,
                comments: data.comments,
                bountyId: bounty.id,
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
        toast({
            title: "Submission posted",
            message:
                "Allow the project maintainer some time to review your submission.",
            type: "success",
        })
        // This forces a cache invalidation.
        router.refresh()
        setIsModalOpen(false)
    }

    return (
        <FormProvider {...methods}>
            <Modal onOpenChange={setIsModalOpen} open={isModalOpen}>
                <Modal.Trigger asChild>
                    <Button size={size}>Post solution</Button>
                </Modal.Trigger>
                <Modal.Content>
                    <Modal.Title>Post solution</Modal.Title>
                    <form
                        className="mt-4"
                        onSubmit={methods.handleSubmit(onClick)}
                    >
                        <div className="grid gap-8">
                            <div className="grid gap-1">
                                <Input
                                    label="Solution link *"
                                    id="solutionLink"
                                    placeholder="Ex. Pull Request link, CodeSandbox environment link"
                                    type="text"
                                    autoCapitalize="solutionLink"
                                    autoComplete="solutionLink"
                                    autoCorrect="off"
                                    name="solutionLink"
                                    disabled={isLoading}
                                />
                                {methods.formState.errors?.solutionLink
                                    ?.type === "too_small" && (
                                    <small className="text-red-600">
                                        Solution link is required
                                    </small>
                                )}
                                {methods.formState.errors?.solutionLink
                                    ?.type === "invalid_string" && (
                                    <small className="text-red-600">
                                        You must submit a valid URL
                                    </small>
                                )}
                            </div>
                            <div className="grid gap-1">
                                <TextArea
                                    label="Comments"
                                    maxLength={320}
                                    id="comments"
                                    placeholder="Provide some more information about your proposed solution!"
                                    autoCapitalize="none"
                                    autoComplete="comments"
                                    autoCorrect="off"
                                    name="comments"
                                    disabled={isLoading}
                                />
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
                                Submit Solution
                            </Button>
                        </div>
                    </form>
                </Modal.Content>
            </Modal>
        </FormProvider>
    )
}
