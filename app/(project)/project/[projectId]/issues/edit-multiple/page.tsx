import BountyList from "@/components/project/bounty-list"
import { BountyMultiEditForm } from "@/components/project/bounty-multi-edit-form"
import { getBountiesForProject } from "@/lib/bounties"
import { Headline } from "@/ui/headline"
import { isArray } from "util"

interface EditMultipleProps {
    params: { projectId: string }
    searchParams?: any
}

export default async function EditMultiplePage({
    params,
    searchParams,
}: EditMultipleProps) {
    const bountyPromise = getBountiesForProject({
        whereQuery: {
            id: {
                in: searchParams.bountyId,
            },
        },
    })

    const bountyIds = isArray(searchParams.bountyId)
        ? [...searchParams.bountyId]
        : [searchParams.bountyId]

    return (
        <div>
            <div className="my-8">
                <Headline
                    heading="Edit Multiple Bounties"
                    text="Batch edit your bounties and bulk publish based on a price range you are comfortable with."
                />
            </div>
            {bountyIds && (
                <div className="w-full ">
                    <BountyMultiEditForm
                        projectId={params.projectId}
                        // @ts-ignore
                        bounties={bountyIds}
                    />
                </div>
            )}

            <div className="mt-8 sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h3 className="text-xl font-semibold text-brandtext-500">
                        Bounties
                    </h3>
                </div>
            </div>
            <div className="mt-4">
                {/* @ts-expect-error Server Component */}
                <BountyList
                    showToolbar={false}
                    showControls={false}
                    bountyPromise={bountyPromise}
                    project={{
                        id: params.projectId,
                    }}
                ></BountyList>
            </div>
        </div>
    )
}
