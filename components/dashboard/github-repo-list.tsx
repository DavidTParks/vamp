"use client"

import useGithubRepos from "@/hooks/use-github-repos"
import { ScrollArea } from "@/ui/scroll-area"
import { Button } from "@/ui/button"
import { dateToNow } from "@/lib/utils"
import { GithubRepository } from "types"
import { Skeleton } from "@/ui/skeleton"

type TGithubRepoItem = {
    repo: GithubRepository
}
const GithubRepoItem = ({ repo }: TGithubRepoItem) => {
    return (
        <div className="p-4 flex justify-between items-center" key={repo.id}>
            <div className="flex items-center gap-2">
                <a
                    target="_blank"
                    rel="noreferrer"
                    href={repo.html_url}
                    className="text-white text-sm font-medium hover:underline"
                >
                    {repo.name}
                </a>
                <div className="text-slate-500 text-2xl">&middot;</div>
                <div className="text-xs text-slate-500">
                    {dateToNow(new Date(repo.pushed_at))}
                </div>
            </div>
            <div className="pr-4">
                <Button intent="secondary" size="small">
                    Select
                </Button>
            </div>
        </div>
    )
}

GithubRepoItem.Skeleton = function PostItemSkeleton() {
    return (
        <div className="p-4 flex justify-between items-center">
            <Skeleton className="h-8 w-full" />
            <div className="pr-4" />
        </div>
    )
}

export function GithubRepoList() {
    const {
        data: repos,
        isLoading: reposLoading,
        error: reposError,
    } = useGithubRepos()

    if (reposError) return null

    return (
        <ScrollArea
            type="auto"
            className="h-72 w-full rounded-md overflow-hidden border border-slate-700"
        >
            <ScrollArea.Viewport>
                <div className="flex flex-col relative divide-y divide-slate-800">
                    {reposLoading ? (
                        <>
                            <GithubRepoItem.Skeleton />
                            <GithubRepoItem.Skeleton />
                            <GithubRepoItem.Skeleton />
                            <GithubRepoItem.Skeleton />
                            <GithubRepoItem.Skeleton />
                            <GithubRepoItem.Skeleton />
                        </>
                    ) : (
                        <>
                            {repos?.map((repo) => (
                                <GithubRepoItem repo={repo} />
                            ))}
                        </>
                    )}
                </div>
            </ScrollArea.Viewport>
            <ScrollArea.ScrollBar orientation="vertical">
                <ScrollArea.Thumb />
            </ScrollArea.ScrollBar>
        </ScrollArea>
    )
}
