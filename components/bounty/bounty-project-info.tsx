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
        <div className="col-span-4 rounded-lg border border-raised-border p-4 py-6">
            <div className="flex flex-col items-center">
                <div className="relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full">
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
                    <span className="inline-flex items-center gap-2 text-xl font-bold text-brandtext-500">
                        {bounty.project.name}{" "}
                    </span>
                </div>
                <div className="mt-2">
                    <span className="inline-flex items-center gap-2 text-brandtext-600">
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
