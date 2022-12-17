import { fetchBounties } from "@/lib/bounties"
import { BrowseSearch } from "@/components/browse/browse-search"

export default async function SettingsPage() {
    const bounties = await fetchBounties({
        take: 10,
        skip: 0,
    })

    return (
        <div className="max-w-4xl mx-auto w-full">
            <div className="my-8">
                <div className="mx-auto  px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-lg font-semibold text-rose-600">
                            Browse
                        </h2>
                        <p className="mt-1 text-4xl font-bold tracking-tight text-brandtext-500 sm:text-5xl lg:text-6xl">
                            Start solving bounties
                        </p>
                        <p className="mx-auto mt-5 max-w-xl text-xl text-brandtext-600">
                            If your bounty resolution is accepted by an Open
                            Source project, you get paid!
                        </p>
                    </div>
                </div>
            </div>
            <BrowseSearch />
            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8">
                {bounties.map((bounty) => (
                    <div
                        key={bounty.id}
                        className="group relative p-4 border border-raised-border rounded-lg"
                    >
                        <span className="text-brandtext-500">
                            {bounty.title}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
