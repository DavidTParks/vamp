"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bounty, Project } from "@prisma/client"

import { DropdownMenu } from "@/ui/dropdown"
import { Icons } from "@/components/icons"
import { Alert } from "@/ui/alert"
import { toast } from "@/ui/toast"
import { trpc } from "@/client/trpcClient"

interface PostOperationsProps {
    bounty: Pick<Bounty, "id" | "title">
    project: Pick<Project, "id">
}

export function BountyOperations({ bounty, project }: PostOperationsProps) {
    const deleteBounty = trpc.bounty.deleteBounty.useMutation()

    const router = useRouter()
    const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)

    return (
        <>
            <DropdownMenu>
                <DropdownMenu.Trigger>
                    <div>
                        <div className="inline-flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-raised-border p-1 transition-all duration-100 hover:brightness-200 focus:outline-none">
                            <Icons.ellipsis
                                size={16}
                                className="text-brandtext-400"
                            />
                        </div>
                        <span className="sr-only">Open</span>
                    </div>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content className="dropdown z-50 mt-2">
                        <DropdownMenu.Item>
                            <Link
                                passHref
                                href={`/bounty/${bounty.id}/edit`}
                                className="flex w-full"
                            >
                                Edit
                            </Link>
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item
                            className="flex cursor-pointer items-center text-red-600 focus:text-red-700"
                            onSelect={(e) => {
                                setShowDeleteAlert(true)
                            }}
                        >
                            Delete
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu>
            <Alert open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <Alert.Content>
                    <Alert.Header>
                        <Alert.Title>
                            Are you sure you want to delete this bounty?
                        </Alert.Title>
                        <Alert.Description>
                            This action cannot be undone. Any pending
                            submissions will be deleted as well.
                        </Alert.Description>
                    </Alert.Header>
                    <Alert.Footer>
                        <Alert.Cancel>Cancel</Alert.Cancel>
                        <Alert.Action
                            className="disabled:pointer-events-none disabled:opacity-50"
                            disabled={
                                deleteBounty.isLoading || deleteBounty.isSuccess
                            }
                            onClick={async (event) => {
                                event.preventDefault()

                                const deleted = await deleteBounty.mutateAsync({
                                    bountyId: bounty.id,
                                })

                                toast({
                                    title: "Bounty deleted",
                                    message: "Your bounty has been deleted.",
                                    type: "success",
                                })
                                router.refresh()
                                setShowDeleteAlert(false)
                            }}
                        >
                            {deleteBounty.isLoading ? (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Icons.trash className="mr-2 h-4 w-4" />
                            )}
                            <span>Delete</span>
                        </Alert.Action>
                    </Alert.Footer>
                </Alert.Content>
            </Alert>
        </>
    )
}
