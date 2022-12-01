import { GithubRepository } from "types"
import { dateToNow } from "@/lib/utils"
import { Button } from "@/ui/button"
import { Skeleton } from "@/ui/skeleton"

type TGithubRepoItem = {
    repo: GithubRepository
}
export const GithubRepoItem = ({ repo }: TGithubRepoItem) => {
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
