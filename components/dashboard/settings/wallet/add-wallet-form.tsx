"use client"

import * as React from "react"
import { SiweMessage } from "siwe"
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
import { useFetchNonce } from "@/hooks/use-fetch-nonce"
import { useNetwork } from "wagmi"
import { useSignMessage } from "wagmi"

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
    const { chain } = useNetwork()
    const { signMessageAsync } = useSignMessage()

    const saveNotificationPreferences =
        trpc.user.saveNotificationPreferences.useMutation()

    const router = useRouter()

    const methods = useForm<FormData>({
        resolver: zodResolver(userNotificationsSchema),
    })

    const [state, setState] = React.useState<{
        loading?: boolean
        nonce?: string
    }>({})

    const fetchNonce = async () => {
        try {
            const nonceRes = await fetch("/api/nonce")
            const nonce = await nonceRes.text()
            setState((x) => ({ ...x, nonce }))
        } catch (error) {
            setState((x) => ({ ...x, error: error as Error }))
        }
    }

    // Pre-fetch random nonce when button is rendered
    // to ensure deep linking works for WalletConnect
    // users on iOS when signing the SIWE message
    React.useEffect(() => {
        fetchNonce()
    }, [])

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

    const signIn = async () => {
        try {
            const chainId = chain?.id

            if (!address || !chainId) return

            // Create SIWE message with pre-fetched nonce and sign with wallet
            const message = new SiweMessage({
                domain: window.location.host,
                address,
                statement: "Sign in with Ethereum to the app.",
                uri: window.location.origin,
                version: "1",
                chainId,
                nonce: state.nonce,
            })

            const signature = await signMessageAsync({
                message: message.prepareMessage(),
            })

            // Verify signature
            const verifyRes = await fetch(`/api/verify?userId=${user.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message, signature }),
            })
            if (!verifyRes.ok) throw new Error("Error verifying message")

            router.refresh()
            return toast({
                title: "Wallet linked",
                message:
                    "You can now interact with all the blockchain elements on our platform!",
                type: "success",
            })
        } catch (error) {
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
                            <Icons.eth />
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
                            Connect your wallet to your Vamp account. This lets
                            you participate in our on-chain, subsidized
                            blockchain game on the Polygon network.
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
                        {isConnected && (
                            <Button onClick={signIn}>
                                Sign message to link Wallet
                            </Button>
                        )}
                    </Card.Footer>
                </Card>
            </form>
        </FormProvider>
    )
}
