import { getOrgRepos } from "@/lib/github"
import { dateToNow } from "@/lib/utils"
import GithubRepoSelect from "./github-repo-select"

interface TGithbOrgRepoList {
    orgId: number
}
export default async function GithubOrgRepoList({ orgId }: TGithbOrgRepoList) {
    const orgRepos = await getOrgRepos(orgId)

    return (
        <>
            <div className="relative flex flex-col divide-y divide-palette-300">
                {orgRepos?.map((repo) => (
                    <div
                        className="flex items-center justify-between p-4 pr-0"
                        key={repo.id}
                    >
                        <div className="flex items-center gap-2">
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href={repo.html_url}
                                className="max-w-[128px] truncate text-sm font-medium text-white hover:underline md:max-w-[256px]"
                            >
                                {repo.name}
                            </a>
                            <div className="text-2xl text-slate-500">
                                &middot;
                            </div>
                            {repo?.pushed_at && (
                                <div className="text-xs text-slate-500">
                                    {dateToNow(new Date(repo.pushed_at))}
                                </div>
                            )}
                        </div>
                        <GithubRepoSelect repo={repo} />
                    </div>
                ))}
            </div>
        </>
    )
}
