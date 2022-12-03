import { Button } from "@/ui/button"
import Link from "next/link"
import { GithubRepository } from "types"
import { preloadRepo } from "@/lib/github"

export type TOnSelectRepo = React.Dispatch<
    React.SetStateAction<GithubRepository>
>

type TGithubRepoSelect = {
    repo: GithubRepository
}

export default function GithubRepoSelect({ repo }: TGithubRepoSelect) {
    preloadRepo(repo.id)

    return (
        <Link href={`/new/import/${repo.id}`}>
            <Button intent="secondary" size="small">
                Select
            </Button>
        </Link>
    )
}
