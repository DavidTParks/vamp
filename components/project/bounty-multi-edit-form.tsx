"use client"

import { trpc } from "@/client/trpcClient"
import { bountyPatchSchema } from "@/lib/validations/bounty"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { RadioGroup } from "@/ui/radio-group"
import { toast } from "@/ui/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { Icons } from "../icons"

interface BountyMultiEdit {
    bounties: string[]
    projectId: string
}

const bountyMultiEditSchema = z.object({
    bountyPrice: z.coerce.number().min(1).positive().optional(),
    bountyRange: z.boolean().default(false),
    bountyPriceMin: z.coerce.number().min(1).positive().optional(),
    bountyPriceMax: z.coerce.number().min(1).positive().optional(),
})

type FormData = z.infer<typeof bountyMultiEditSchema>

export const BountyMultiEditForm = ({
    bounties,
    projectId,
}: BountyMultiEdit) => {
    const editMultipleBounties = trpc.bounty.editMultipleBounties.useMutation()

    const router = useRouter()

    const methods = useForm<FormData>({
        resolver: zodResolver(bountyPatchSchema),
        defaultValues: {
            bountyRange: false,
        },
    })

    const bountyRangeEnabled = methods.watch("bountyRange")

    async function onSubmit(data: FormData) {
        if (
            data.bountyRange &&
            (!data.bountyPriceMax || !data.bountyPriceMin)
        ) {
            return toast({
                title: "Bounty price required",
                message:
                    "Your bounty was not saved. Please adjust the form fields and try again.",
                type: "error",
            })
        } else if (!data.bountyRange && !data.bountyPrice) {
            return toast({
                title: "Bounty price required",
                message:
                    "Your bounty was not saved. Please adjust the form fields and try again.",
                type: "error",
            })
        }
        try {
            await editMultipleBounties.mutateAsync({
                bountyIds: bounties,
                projectId,
                bountyPrice: data.bountyPrice,
                bountyRange: data.bountyRange,
                bountyPriceMin: data.bountyPriceMin,
                bountyPriceMax: data.bountyPriceMax,
            })
            toast({
                title: "Bounties updated and published!",
                message: "Your bounties have been published. Good luck!",
                type: "success",
            })
            router.refresh()
            router.push(`/project/${projectId}`)
        } catch (e) {
            console.log(e)
            toast({
                title: "Something went wrong.",
                message: "Your project was not deleted. Please try again.",
                type: "error",
            })
        }
    }

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="rounded-lg border border-raised-border bg-palette-400"
            >
                <div className="p-4">
                    <Label>Price type*</Label>
                    <div className="mt-2">
                        <RadioGroup
                            defaultValue={"fixed"}
                            onValueChange={(e) => {
                                console.log("Value changed", e)
                                if (e === "fixed") {
                                    methods.setValue("bountyRange", false)
                                } else {
                                    methods.setValue("bountyRange", true)
                                }
                            }}
                        >
                            <RadioGroup.Item id="fixed" value="fixed">
                                Fixed Price
                                <small className="text-sm text-brandtext-700">
                                    A fixed, unchanging price for this bounty.
                                </small>
                            </RadioGroup.Item>
                            <RadioGroup.Item id="range" value="range">
                                Range
                                <small className="text-sm text-brandtext-700">
                                    A price range for this bounty, based on the
                                    quality of the submission you receive.
                                </small>
                            </RadioGroup.Item>
                        </RadioGroup>
                    </div>

                    {!bountyRangeEnabled && (
                        <div className="mt-4 mb-4 grid grid-cols-2 gap-4">
                            <Input
                                isUSD
                                step="0.01"
                                label="Bounty price *"
                                id="bountyPrice"
                                type="number"
                                placeholder="10.00"
                                className="bg-appbg"
                                aria-describedby="bountyPrice"
                            ></Input>
                        </div>
                    )}
                    {bountyRangeEnabled && (
                        <div className="mt-4 mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <Input
                                isUSD
                                step="0.01"
                                label="Bounty price minimum *"
                                id="bountyPriceMin"
                                type="number"
                                placeholder="1.00"
                                className="bg-appbg"
                                aria-describedby="bountyPriceMin"
                            ></Input>
                            <Input
                                isUSD
                                step="0.01"
                                label="Bounty price maximum *"
                                id="bountyPriceMax"
                                type="number"
                                placeholder="100.00"
                                className="bg-appbg"
                                aria-describedby="bountyPriceMax"
                            ></Input>
                        </div>
                    )}
                </div>
                <div className="mt-0 flex w-full justify-end gap-4 border-t border-raised-border p-4">
                    <Button
                        type="submit"
                        disabled={
                            editMultipleBounties.isLoading ||
                            editMultipleBounties.isSuccess
                        }
                    >
                        {editMultipleBounties.isLoading ? (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Icons.edit className="mr-2 h-4 w-4" />
                        )}
                        Save and publish all
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}

export default BountyMultiEditForm
