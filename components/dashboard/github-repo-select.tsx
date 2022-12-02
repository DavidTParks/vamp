"use client"

import { Button } from "@/ui/button"
import { GithubRepository } from "types"

export type TOnSelectRepo = React.Dispatch<
    React.SetStateAction<GithubRepository>
>

type TGithubRepoSelect = {
    repo: GithubRepository
    onSelect: TOnSelectRepo
}

export default function GithubRepoSelect({
    repo,
    onSelect,
}: TGithubRepoSelect) {
    return (
        <Button onClick={() => onSelect(repo)} intent="secondary" size="small">
            Select
        </Button>
    )
}
