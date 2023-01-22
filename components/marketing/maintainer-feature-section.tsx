import { BoltIcon, GlobeAltIcon, ScaleIcon } from "@heroicons/react/24/outline"
import { Icons } from "../icons"

const features = [
    {
        name: "Realtime issue syncing",
        description:
            "Easily reference open Github Issues in a bounty directly from your dashboard.",
        icon: Icons.gitHub,
    },
    {
        name: "Flexible bounty pricing",
        description:
            "Select a fixed price for your bounty, or a price range depending on the quality of the submissions you receive.",
        icon: Icons.billing,
    },
    {
        name: "Add multiple Bounties at once",
        description:
            "Bulk-add bounties by selecting multiple Github issues. Preserve your issue content from Github to save time.",
        icon: BoltIcon,
    },
]

export function MaintainerFeatureSection() {
    return (
        <div className=" py-20 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">A better way to send money.</h2>
                <dl className="grid grid-cols-1 gap-16 lg:grid lg:grid-cols-3">
                    {features.map((feature) => (
                        <div key={feature.name}>
                            <dt>
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500 text-white">
                                    <feature.icon
                                        className="h-8 w-8"
                                        aria-hidden="true"
                                    />
                                </div>
                                <p className="mt-6 text-lg font-semibold leading-8 tracking-tight text-brandtext-500">
                                    {feature.name}
                                </p>
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-brandtext-600">
                                {feature.description}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    )
}
