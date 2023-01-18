"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/ui/button"
import { Card } from "@/ui/card"
import { toast } from "@/ui/toast"
import { User } from "@prisma/client"
import { Icons } from "@/components/icons"
import { useSearchParams } from "next/navigation"
import { returnUrlQueryParams } from "pages/api/users/stripe"
import { useRouter } from "next/navigation"

interface BillingFormProps extends React.HTMLAttributes<HTMLFormElement> {
    user: Pick<User, "stripeCustomerId">
}

export function ProjectBillingForm({
    className,
    user,
    ...props
}: BillingFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const searchParams = useSearchParams()

    // If we are returning from Stripe either from editing or creating our account
    const from = searchParams.get("from") as returnUrlQueryParams

    React.useEffect(() => {
        if (from === "stripeAccountUpdate") {
            toast({
                title: "Stripe details updated",
                message: "Your account information has been updated.",
                type: "success",
            })

            router.refresh()
        }

        if (from === "stripeAccountCreation") {
            toast({
                title: "Stripe details updated",
                message: "Your account information has been updated.",
                type: "success",
            })

            router.refresh()
        }
    }, [from, router])

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(!isLoading)

        // Get a Stripe session URL.
        const response = await fetch("/api/project/stripe")

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
        if (session && typeof window !== undefined) {
            window.location.href = session.url
        }
    }

    const isStripeLinked = !!user.stripeCustomerId

    return (
        <form className={cn(className)} onSubmit={onSubmit} {...props}>
            <Card>
                <Card.Header>
                    <Card.Title>Stripe</Card.Title>
                    <Card.Description>
                        {!isStripeLinked
                            ? "No Stripe account linked to project"
                            : "Stripe account linked to project"}
                    </Card.Description>
                </Card.Header>
                <Card.Content>
                    {!isStripeLinked
                        ? "Link a Stripe account to this project to pay out bounties, or accept funding from outside sources."
                        : "You can now accept funding from users, as well as pay out bounties!"}
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
                        <>
                            <Button disabled={isLoading}>
                                {isLoading ? (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Icons.edit className="mr-2 h-4 w-4" />
                                )}
                                Edit Stripe details
                            </Button>
                        </>
                    )}
                </Card.Footer>
            </Card>
        </form>
    )
}
