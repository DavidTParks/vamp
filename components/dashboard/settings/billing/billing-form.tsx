"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/ui/button"
import { Card } from "@/ui/card"
import { toast } from "@/ui/toast"

interface BillingFormProps extends React.HTMLAttributes<HTMLFormElement> {}

export function BillingForm({ className, ...props }: BillingFormProps) {
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

    return (
        <form className={cn(className)} onSubmit={onSubmit} {...props}>
            <Card>
                <Card.Header>
                    <Card.Title>Stripe</Card.Title>
                    <Card.Description>
                        Setup Stripe so you can start collecting bounties, paid
                        out directly to your bank account.
                    </Card.Description>
                </Card.Header>
                <Card.Content>
                    Link your Stripe account now to begin funding project
                    balances
                </Card.Content>
                <Card.Footer className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
                    <Button>Setup Stripe</Button>
                </Card.Footer>
            </Card>
        </form>
    )
}
