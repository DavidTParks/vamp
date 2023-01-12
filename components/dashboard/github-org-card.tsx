import { Button } from "@/ui/button"
import Link from "next/link"
import { GithubOrg, GithubRepository } from "types"
import { preloadOrgRepos } from "@/lib/github"
import { TGetOrgElement } from "@/lib/github"

export type TOnSelectRepo = React.Dispatch<
    React.SetStateAction<GithubRepository>
>

type TGithubOrgCard = {
    org: TGetOrgElement
}

export async function GithubOrgCard({ org }: TGithubOrgCard) {
    preloadOrgRepos(org.id)

    return (
        <Link href={`/new/org/${org.id}}`}>
            <Button
                aria-label={`Select from ${org.name} repositories`}
                intent="tertiary"
                className="w-full p-4 border-raised-border border rounded-md"
                key={org.id}
            >
                <span className="text-brandtext-500 font-bold">{org.name}</span>
            </Button>
        </Link>
    )
}
