import { getRepos } from "@/lib/github"
import { dateToNow } from "@/lib/utils"
import GithubRepoSelect, { TOnSelectRepo } from "./github-repo-select"

type TGithubRepoList = {
    onSelect: TOnSelectRepo
}
export default async function GithubRepoList({ onSelect }: TGithubRepoList) {
    const repositories = await getRepos()

    return (
        <div className="flex flex-col relative divide-y divide-slate-800">
            {repositories?.map((repo) => (
                <div
                    className="p-4 flex justify-between items-center"
                    key={repo.id}
                >
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
                        <GithubRepoSelect repo={repo} onSelect={onSelect} />
                    </div>
                </div>
            ))}
        </div>
    )
}
