import { getBountyById } from "@/lib/bounties"
import { Button } from "@/ui/button"
import Image from "next/image"
import Link from "next/link"

interface TBountyInfoBox {
    bountyId: string
}

export async function BountyProjectInfo({ bountyId }: TBountyInfoBox) {
    const bounty = await getBountyById(bountyId)

    if (!bounty) return null

    return (
        <div className="border border-raised-border rounded-lg col-span-4 p-4 py-6">
            <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full overflow-hidden inline-flex items-center justify-center relative">
                    {bounty.project.image ? (
                        <Image
                            fill={true}
                            alt="Project avatar"
                            src={bounty.project.image}
                        />
                    ) : (
                        <Image
                            fill={true}
                            alt="Project avatar"
                            src={`https://avatar.vercel.sh/${bounty.project.id}`}
                        />
                    )}
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
                <Link href={`/p/${bounty.project.id}`}>
                    <Button
                        size="small"
                        className="mt-4"
                        borderRadius="full"
                        intent="secondary"
                    >
                        View Project Profile
                    </Button>
                </Link>
            </div>
        </div>
    )
}
