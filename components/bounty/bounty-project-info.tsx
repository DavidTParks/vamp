import { getBountyById } from "@/lib/bounties"
import { getRepo } from "@/lib/github"
import { formatDate, formatDollars } from "@/lib/utils"
import { ExternalLink } from "@/ui/external-link"
import { KeyValue } from "@/ui/keyvalue"
import { Icons } from "../icons"
import Image from "next/image"
import { Button } from "@/ui/button"

interface TBountyInfoBox {
    bountyId: string
}

export async function BountyProjectInfo({ bountyId }: TBountyInfoBox) {
    const bounty = await getBountyById(bountyId)

    return (
        <div className="border border-raised-border rounded-lg col-span-4 p-4 py-6">
            <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full overflow-hidden inline-flex items-center justify-center relative">
                    <Image
                        fill={true}
                        alt="Project avatar"
                        src={`https://avatar.vercel.sh/${bounty.project.name}${bounty.project.id}`}
                    />
                </div>
                <div className="mt-8">
                    <span className="text-brandtext-500 font-bold text-xl inline-flex gap-2 items-center">
                        {bounty.project.name}{" "}
                    </span>
                </div>
                <div className="mt-2">
                    <span className="text-brandtext-600 inline-flex gap-2 items-center">
                        {bounty.project.bounties.length} Bounties
                    </span>
                </div>
                <Button className="mt-4" borderRadius="full" intent="secondary">
                    View Project Profile
                </Button>
            </div>
        </div>
    )
}
