"use client"

import React from "react"
import { Modal } from "@/ui/modal"
import { useState } from "react"
import { Button } from "@/ui/button"
import Link from "next/link"

interface TStripeNotConnectedModal {
    children?: React.ReactNode
}
export function StripeNotConnectedModal({
    children,
    ...props
}: TStripeNotConnectedModal) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Modal open={isOpen} onOpenChange={setIsOpen}>
            <Modal.Trigger asChild>
                <div>{children}</div>
            </Modal.Trigger>
            <Modal.Content>
                <Modal.Title>Your Stripe account is not linked</Modal.Title>
                <p className="text-brandtext-600">
                    In order to post a solution to this bounty, your Stripe
                    account must be linked to accept payments from project
                    owners.
                </p>
                <div className="flex justify-end space-x-2">
                    <Button onClick={() => setIsOpen(false)} intent="secondary">
                        Cancel
                    </Button>
                    <Link href={`/dashboard/settings/billing`}>
                        <Button>Link Stripe</Button>
                    </Link>
                </div>
            </Modal.Content>
        </Modal>
    )
}
