"use client"

import { Bounty } from "@prisma/client"

import { Icons } from "@/components/icons"
import { getBaseUrl } from "@/lib/utils"
import { Button } from "@/ui/button"
import { DropdownMenu } from "@/ui/dropdown"
import { toast } from "@/ui/toast"

interface BountyShareProps {
    bounty: Pick<Bounty, "id" | "title">
}

export function BountyShare({ bounty }: BountyShareProps) {
    const bountyLink = `${getBaseUrl()}/bounty/${bounty.id}`

    const copyBountyLink = () => {
        navigator.clipboard.writeText(bountyLink)
        toast({
            title: "Link copied",
            message: "Share this bounty on social media!",
            type: "success",
        })
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenu.Trigger asChild>
                    <div>
                        <Button className="inline-flex gap-2" intent="text">
                            <Icons.share size={16} />
                            <span className="hidden sm:block">Share</span>
                        </Button>
                    </div>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content className="mt-2 z-50 dropdown">
                        <DropdownMenu.Item>
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href={`https://twitter.com/intent/tweet?text=${bounty.title} on Vamp&url=${bountyLink}&via=vampdotsh`}
                                className="flex w-full items-center gap-2"
                            >
                                <Icons.twitter size={16} />
                                Twitter
                            </a>
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item onSelect={() => copyBountyLink()}>
                            <div className="flex w-full items-center gap-2">
                                <Icons.link size={16} />
                                Copy link
                            </div>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu>
        </>
    )
}
