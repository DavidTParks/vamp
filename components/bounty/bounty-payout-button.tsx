"use client"

import { bountySubmissionSchema } from "@/lib/validations/bountySubmission"
import { Button } from "@/ui/button"
import { toast } from "@/ui/toast"
import { useRouter } from "next/navigation"
import * as React from "react"
import * as z from "zod"
import { Icons } from "../icons"

interface BountyPayoutButton {
    bountyStripePriceId: string
    stripeUserId: string
    bountyId: string
    submissionId: string
}

export type CreateProjectFormData = z.infer<typeof bountySubmissionSchema>

export function BountyPayoutButton({
    stripeUserId,
    bountyStripePriceId,
    submissionId,
    bountyId,
}: BountyPayoutButton) {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)

    async function onSubmit(event) {
        event.preventDefault()
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
        if (session) {
            window.location.href = session.url
        }
    }

    return (
        <>
            <Button intent="secondary" onClick={onSubmit} disabled={isLoading}>
                {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.check className="mr-2 h-4 w-4" />
                )}
                Accept solution
            </Button>
        </>
    )
}
