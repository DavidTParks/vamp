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

type FormData = z.infer<typeof userNotificationsSchema>

interface BillingFormProps extends React.HTMLAttributes<HTMLFormElement> {
    user: Pick<User, "id">
    newSubmission?: boolean
    submissionAccepted?: boolean
}

export function NotificationsForm({
    className,
    user,
    submissionAccepted,
    newSubmission,
    ...props
}: BillingFormProps) {
    const saveNotificationPreferences =
        trpc.user.saveNotificationPreferences.useMutation()

    const router = useRouter()

    const methods = useForm<FormData>({
        resolver: zodResolver(userNotificationsSchema),
        defaultValues: {
            submissionAccepted,
            newSubmission,
        },
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
                        <Card.Title>Notifications</Card.Title>
                        <Card.Description>
                            Handle your email notification preferences
                        </Card.Description>
                    </Card.Header>
                    <Card.Content className="flex flex-col items-start gap-8 pb-4">
                        <Checkbox id="newSubmission" label="New submissions">
                            <span className="mt-2 text-sm text-brandtext-700">
                                An email every time there is a new submission on
                                a posted bounty.
                            </span>
                        </Checkbox>
                        <Checkbox
                            id="submissionAccepted"
                            label="Submission accepted"
                        >
                            <span className="mt-2 text-sm text-brandtext-700">
                                An email when your bounty submission is accepted
                                by a project owner.
                            </span>
                        </Checkbox>
                    </Card.Content>
                    <Card.Footer className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
                        <Button
                            disabled={saveNotificationPreferences.isLoading}
                        >
                            {saveNotificationPreferences.isLoading ? (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            ) : null}
                            Save
                        </Button>
                    </Card.Footer>
                </Card>
            </form>
        </FormProvider>
    )
}
