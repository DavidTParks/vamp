import { Button } from "@/ui/button"
import Link from "next/link"
import { GithubRepository } from "types"

export type TOnSelectRepo = React.Dispatch<
    React.SetStateAction<GithubRepository>
>

type TGithubRepoSelect = {
    repo: GithubRepository
}

export default function GithubRepoSelect({ repo }: TGithubRepoSelect) {
    return (
        <Link href={`/new/import/${repo.id}`}>
            <Button intent="secondary" size="small">
                Select
            </Button>
        </Link>
    )
}
