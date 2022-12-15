import { redirect } from "next/navigation"

import GithubRepoList from "@/components/dashboard/github-repo-list"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { Headline } from "@/ui/headline"
import { fetchBounties } from "@/lib/bounties"

export default async function SettingsPage() {
    const bounties = await fetchBounties({
        take: 10,
        skip: 0,
    })

    console.log("Bounties", bounties)

    return (
        <div className="max-w-4xl mx-auto w-full">
            <div className="my-8">
                <Headline
                    heading="Browse Bounties"
                    text="Browse Open-source bounties and feature requests!"
                />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:gap-y-10">
                {bounties.map((bounty) => (
                    <div key={bounty.id} className="group relative">
                        <span className="text-brandtext-500">
                            {bounty.title}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
