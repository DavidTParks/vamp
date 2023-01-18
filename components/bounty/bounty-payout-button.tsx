"use client"

import {
    bountySubmissionSchema,
    bountyAcceptSchema,
    bountyRangeAcceptSchema,
} from "@/lib/validations/bountySubmission"
import { Button } from "@/ui/button"
import { toast } from "@/ui/toast"
import { useRouter } from "next/navigation"
import * as React from "react"
import * as z from "zod"
import { Icons } from "../icons"
import { Modal } from "@/ui/modal"
import { Input } from "@/ui/input"
import { KeyValue } from "@/ui/keyvalue"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { trpc } from "@/client/trpcClient"
interface BountyPayoutButton {
    bountyStripePriceId: string
    stripeUserId: string
    bountyId: string
    submissionId: string
    bountySubmissionUserId: string
    bountyRange?: boolean
    bountyPriceMin?: number | null | undefined
    bountyPriceMax?: number | null | undefined
    computedBountyPrice?: string
}

export type AcceptBountySubmissionSchema = z.infer<
    typeof bountyRangeAcceptSchema
>

export function BountyPayoutButton({
    stripeUserId,
    bountyStripePriceId,
    submissionId,
    bountyId,
    bountySubmissionUserId,
    bountyRange = false,
    bountyPriceMax,
    bountyPriceMin,
    computedBountyPrice,
}: BountyPayoutButton) {
    const acceptBountyRangeSubmission =
        trpc.bountySubmission.acceptBountyRangeSubmission.useMutation()

    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const methods = useForm<AcceptBountySubmissionSchema>({
        resolver: zodResolver(bountyRangeAcceptSchema),
        defaultValues: {
            bountyPrice: bountyPriceMax ?? 1,
        },
    })

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()

        if (bountyRange) {
            setIsModalOpen(true)
        } else {
            setIsLoading(!isLoading)

            const response = await fetch("/api/bounty-submissions/stripe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    submissionId: submissionId,
                    bountyId: bountyId,
                    bountySubmissionUserStripeId: stripeUserId,
                    bountyStripePriceId,
                    bountySubmissionUserId,
                }),
            })

            if (!response?.ok) {
                return toast({
                    title: "Something went wrong.",
                    message: "Please refresh the page and try again.",
                    type: "error",
                })
            }

            // Redirect to the Stripe session.
            // This could be a checkout page for initial upgrade.
            // Or portal to manage existing subscription.
            const session = await response.json()
            if (session && typeof window !== "undefined") {
                window.location.href = session.url
            }
        }
    }

    async function acceptRangeSubmission() {
        try {
            const link = await acceptBountyRangeSubmission.mutateAsync({
                submissionId: submissionId,
                bountyId: bountyId,
                bountySubmissionUserStripeId: stripeUserId,
                bountyPrice: methods.getValues("bountyPrice"),
                bountySubmissionUserId,
            })
            if (typeof window !== "undefined") {
                window.location.href = link.url
            }
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
            <Button
                intent="secondary"
                size="small"
                onClick={onSubmit}
                disabled={isLoading}
            >
                {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.billing className="mr-2 h-4 w-4" />
                )}
                Accept and pay
            </Button>
            <Modal onOpenChange={setIsModalOpen} open={isModalOpen}>
                <Modal.Content>
                    <Modal.Title>Determine Payment Amount</Modal.Title>
                    <p className="text-sm text-brandtext-600">
                        Assess the quality of the submission you are accepting
                        and decide what you feel a fair payment would be based
                        on your pre-selected price range.
                    </p>
                    <div className="mt-4">
                        <KeyValue
                            label={"Bounty"}
                            value={<p>{computedBountyPrice}</p>}
                        ></KeyValue>
                    </div>

                    <FormProvider {...methods}>
                        <form className="mt-4">
                            <Input
                                label="Payment amount *"
                                isUSD
                                id="bountyPrice"
                                placeholder={bountyPriceMax?.toString()}
                                type="number"
                                min={bountyPriceMin?.toString()}
                                max={bountyPriceMax?.toString()}
                                name="bountyPrice"
                            />
                            <div className="mt-8 flex justify-end gap-4">
                                <Button
                                    onClick={() => setIsModalOpen(false)}
                                    intent={"secondary"}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    isLoading={
                                        acceptBountyRangeSubmission.isLoading
                                    }
                                    disabled={
                                        acceptBountyRangeSubmission.isLoading
                                    }
                                    onClick={acceptRangeSubmission}
                                >
                                    Accept and pay
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </Modal.Content>
            </Modal>
        </>
    )
}
