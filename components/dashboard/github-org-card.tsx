import { Button } from "@/ui/button"
import Link from "next/link"
import { GithubOrg, GithubRepository } from "types"
import { preloadOrgRepos } from "@/lib/github"
import { TGetUserOrgElement } from "@/lib/github"

export type TOnSelectRepo = React.Dispatch<
    React.SetStateAction<GithubRepository>
>

type TGithubOrgCard = {
    org: TGetUserOrgElement
}

export async function GithubOrgCard({ org }: TGithubOrgCard) {
    preloadOrgRepos(org.id)

    return (
        <Link href={`/new/org/${org.id}}`}>
            <Button
                aria-label={`Select from ${org.login} repositories`}
                intent="tertiary"
                className="w-full rounded-md border border-raised-border p-4"
                key={org.id}
            >
                <span className="font-bold text-brandtext-500">
                    {org.login}
                </span>
            </Button>
        </Link>
    )
}
