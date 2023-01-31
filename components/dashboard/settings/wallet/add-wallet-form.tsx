"use client"

import * as React from "react"

import { trpc } from "@/client/trpcClient"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { userNotificationsSchema } from "@/lib/validations/user"
import { Button } from "@/ui/button"
import { Card } from "@/ui/card"
import { Checkbox } from "@/ui/checkbox"
import { toast } from "@/ui/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { ConnectWallet } from "./conect-wallet"
import { useAccount } from "wagmi"
import { Chip } from "@/ui/chip"

type FormData = z.infer<typeof userNotificationsSchema>

interface AddWalletFormProps extends React.HTMLAttributes<HTMLFormElement> {
    user: Pick<User, "id">
}

export function AddWalletForm({
    className,
    user,
    ...props
}: AddWalletFormProps) {
    const { isConnected, address } = useAccount()

    console.log("Address", address)

    const saveNotificationPreferences =
        trpc.user.saveNotificationPreferences.useMutation()

    const router = useRouter()

    const methods = useForm<FormData>({
        resolver: zodResolver(userNotificationsSchema),
    })

    async function onSubmit(data: FormData) {
        try {
            await saveNotificationPreferences.mutateAsync({
                submissionAccepted: data.submissionAccepted,
                newSubmission: data.newSubmission,
            })
            toast({
                title: "Notification preferences updated",
                message: "",
                type: "success",
            })
            router.refresh()
        } catch (e) {
            return toast({
                title: "Something went wrong.",
                message: "Please refresh the page and try again.",
                type: "error",
            })
        }
    }

    return (
        <FormProvider {...methods}>
            <form
                className={cn(className)}
                onSubmit={methods.handleSubmit(onSubmit)}
                {...props}
            >
                <Card>
                    <Card.Header>
                        <Card.Title className="flex items-center gap-2">
                            Crypto Wallet{" "}
                            {isConnected ? (
                                <Chip size="small" intent="green">
                                    Connected
                                </Chip>
                            ) : (
                                <Chip size="small" intent="rose">
                                    Not connected
                                </Chip>
                            )}
                        </Card.Title>
                        <Card.Description>
                            Link a Crypto Wallet to accept payments, and
                            participate in our subsidized, on-chain blockchain
                            game.
                        </Card.Description>
                    </Card.Header>
                    <Card.Content className="flex flex-col items-start gap-8 pb-4">
                        {isConnected ? (
                            <ConnectWallet />
                        ) : (
                            "Connect your wallet"
                        )}
                    </Card.Content>
                    <Card.Footer className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
                        {!isConnected && <ConnectWallet />}
                    </Card.Footer>
                </Card>
            </form>
        </FormProvider>
    )
}
