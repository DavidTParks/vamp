"use client"
import { trpc } from "@/client/trpcClient"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Modal } from "@/ui/modal"
import { toast } from "@/ui/toast"
import { Tooltip } from "@/ui/tooltip"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { useRouter, useSearchParams } from "next/navigation"
import * as React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

interface IProfileDonate {
    user: Pick<User, "id">
}

export const donationAcceptSchema = z.object({
    donationAmount: z.coerce.number().min(1),
})

export type DonationAcceptSchema = z.infer<typeof donationAcceptSchema>

export function ProfileDonate({ user }: IProfileDonate) {
    const donateToUser = trpc.user.donateToUser.useMutation()
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)

    const searchParams = useSearchParams()

    // If we are returning from Stripe either from editing or creating our account
    const from = searchParams.get("from") as string

    React.useEffect(() => {
        toast({
            title: "Donation completed!",
            message:
                "Your donation has been sent to the user. Thanks for making open-source a better place.",
            type: "success",
        })
    }, [from, router, searchParams])

    const methods = useForm<DonationAcceptSchema>({
        resolver: zodResolver(donationAcceptSchema),
    })

    async function onSubmit(data: DonationAcceptSchema) {
        try {
            const donateLink = await donateToUser.mutateAsync({
                userId: user.id,
                donationAmount: data.donationAmount,
            })

            window.location.href = donateLink.url
        } catch (e) {
            return toast({
                title: "Something went wrong.",
                message: "Please refresh the page and try again.",
                type: "error",
            })
        }
    }

    return (
        <>
            <Tooltip
                content={
                    "Like what this user is doing? Show your appreciation by donating to them!"
                }
            >
                <Button
                    isLoading={donateToUser.isLoading}
                    disabled={donateToUser.isLoading}
                    onClick={() => setIsModalOpen(true)}
                    size="small"
                    fullWidth={true}
                    intent="secondary"
                >
                    Donate
                </Button>
            </Tooltip>
            <Modal onOpenChange={setIsModalOpen} open={isModalOpen}>
                <Modal.Content>
                    <Modal.Title>Donate</Modal.Title>
                    <p className="text-sm text-brandtext-600">
                        Show this user how much you appreciate their work!
                        Choose an amount you want to donate to them.
                    </p>

                    <FormProvider {...methods}>
                        <form
                            onSubmit={methods.handleSubmit(onSubmit)}
                            className="mt-4"
                        >
                            <Input
                                label="Donation amount *"
                                isUSD
                                id="donationAmount"
                                placeholder={"10.00"}
                                type="number"
                                min={"1"}
                                name="donationAmount"
                            />
                            <div className="mt-8 flex justify-end gap-4">
                                <Button
                                    isLoading={donateToUser.isLoading}
                                    disabled={donateToUser.isLoading}
                                >
                                    Donate
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </Modal.Content>
            </Modal>
        </>
    )
}
