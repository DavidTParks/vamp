"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/ui/button"
import { Card } from "@/ui/card"
import { toast } from "@/ui/toast"
import { User } from "@prisma/client"
import { Icons } from "@/components/icons"

interface BillingFormProps extends React.HTMLAttributes<HTMLFormElement> {
    user: Pick<User, "stripeCustomerId">
}

export function BillingForm({ className, user, ...props }: BillingFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    async function onSubmit(event) {
        event.preventDefault()
        setIsLoading(!isLoading)

        // Get a Stripe session URL.
        const response = await fetch("/api/users/stripe")

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

    async function setupStripe() {
        setIsLoading(true)

        const response = await fetch("/api/users/stripe", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        setIsLoading(false)

        if (!response?.ok) {
            return toast({
                title: "Something went wrong.",
                message: "Your project was not created. Please try again.",
                type: "error",
            })
        }

        const stripeAccountLink = await response.json()

        console.log("Stripe account link")
    }

    const isStripeLinked = !!user.stripeCustomerId

    return (
        <form className={cn(className)} onSubmit={onSubmit} {...props}>
            <Card>
                <Card.Header>
                    <Card.Title>Stripe</Card.Title>
                    <Card.Description>
                        {!isStripeLinked
                            ? "No Stripe account linked"
                            : "Stripe account linked"}
                    </Card.Description>
                </Card.Header>
                <Card.Content>
                    {!isStripeLinked
                        ? "Link your Stripe account now to accept payouts from Project owners"
                        : "You can now accept payments from Open Source project owners for solving bounties!"}
                </Card.Content>
                <Card.Footer className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
                    {!isStripeLinked ? (
                        <Button disabled={isLoading}>
                            {isLoading ? (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Icons.billing className="mr-2 h-4 w-4" />
                            )}
                            Setup Stripe
                        </Button>
                    ) : (
                        <Button>Edit Stripe details</Button>
                    )}
                </Card.Footer>
            </Card>
        </form>
    )
}
