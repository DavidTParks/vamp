"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Modal } from "@/ui/modal"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { toast } from "@/ui/toast"
import { Input } from "@/ui/input"
import { GithubRepository } from "types"
import { NewProjectForm } from "@/components/dashboard/new-project-form"
import { Button } from "@/ui/button"

interface ProjectCreateButton extends React.HTMLAttributes<HTMLButtonElement> {
    repositories?: GithubRepository[]
}

export function PostCreateButton({
    className,
    repositories,
    ...props
}: ProjectCreateButton) {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [showModal, setShowModal] = React.useState<boolean>(false)

    async function onClick() {
        setShowModal(true)
    }

    return (
        <>
            <Button onClick={onClick} disabled={isLoading} {...props}>
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
                    <NewProjectForm className="mt-4" />
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
