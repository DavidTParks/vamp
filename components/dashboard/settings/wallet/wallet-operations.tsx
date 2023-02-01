"use client"

import { User, UserWallet } from "@prisma/client"
import { useRouter } from "next/navigation"
import * as React from "react"

import { trpc } from "@/client/trpcClient"
import { Icons } from "@/components/icons"
import { Alert } from "@/ui/alert"
import { DropdownMenu } from "@/ui/dropdown"
import { toast } from "@/ui/toast"

interface WalletOperationProps {
    user: Pick<User, "id">
    userWallet: Pick<UserWallet, "id" | "default">
}

export function WalletOperations({ user, userWallet }: WalletOperationProps) {
    const router = useRouter()
    const removeWallet = trpc.web3.removeWallet.useMutation()

    const setDefaultWallet = trpc.web3.setWalletDefault.useMutation({
        onSuccess: (data) => {
            toast({
                title: "Wallet has been set as default",
                message: "All rewards will now be funneled to this wallet.",
                type: "success",
            })
            router.refresh()
        },
        onError: () => {
            toast({
                title: "Something went wrong.",
                message:
                    "Your new default wallet was not set correctly. Please try again.",
                type: "error",
            })
        },
    })
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
                        {!userWallet.default && (
                            <>
                                <DropdownMenu.Item
                                    onSelect={() => {
                                        setDefaultWallet.mutate({
                                            userId: user.id,
                                            walletId: userWallet.id,
                                        })
                                        toast({
                                            title: "Updating default wallet...",
                                            message: "Please wait",
                                            type: "default",
                                        })
                                    }}
                                >
                                    Set default
                                </DropdownMenu.Item>
                                <DropdownMenu.Separator />
                            </>
                        )}

                        <DropdownMenu.Item
                            className="flex cursor-pointer items-center text-red-600 focus:text-red-700"
                            onSelect={(e) => {
                                setShowDeleteAlert(true)
                            }}
                        >
                            Remove
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu>
            <Alert open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <Alert.Content>
                    <Alert.Header>
                        <Alert.Title>
                            Are you sure you want to remove this wallet?
                        </Alert.Title>
                        <Alert.Description>
                            You can always re-add later, but note that on-chain
                            rewards can no longer be funneled to this wallet
                            address.
                        </Alert.Description>
                    </Alert.Header>
                    <Alert.Footer>
                        <Alert.Cancel>Cancel</Alert.Cancel>
                        <Alert.Action
                            className="disabled:pointer-events-none disabled:opacity-50"
                            disabled={
                                removeWallet.isLoading || removeWallet.isSuccess
                            }
                            onClick={async (event) => {
                                event.preventDefault()

                                await removeWallet.mutateAsync({
                                    userId: user.id,
                                    walletId: userWallet.id,
                                })

                                toast({
                                    title: "Wallet removed",
                                    message:
                                        "Your wallet has been removed. You can always re-add it later.",
                                    type: "success",
                                })
                                router.refresh()
                                setShowDeleteAlert(false)
                            }}
                        >
                            {removeWallet.isLoading ? (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Icons.trash className="mr-2 h-4 w-4" />
                            )}
                            <span>Remove</span>
                        </Alert.Action>
                    </Alert.Footer>
                </Alert.Content>
            </Alert>
        </>
    )
}
