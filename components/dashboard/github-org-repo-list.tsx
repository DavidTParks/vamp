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
            <div className="flex flex-col relative divide-y divide-palette-300">
                {orgRepos?.map((repo) => (
                    <div
                        className="p-4 pr-0 flex justify-between items-center"
                        key={repo.id}
                    >
                        <div className="flex items-center gap-2">
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href={repo.html_url}
                                className="text-white text-sm font-medium hover:underline max-w-[128px] md:max-w-[256px] truncate"
                            >
                                {repo.name}
                            </a>
                            <div className="text-slate-500 text-2xl">
                                &middot;
                            </div>
                            <div className="text-xs text-slate-500">
                                {dateToNow(new Date(repo.pushed_at))}
                            </div>
                        </div>
                        <GithubRepoSelect repo={repo} />
                    </div>
                ))}
            </div>
        </>
    )
}
