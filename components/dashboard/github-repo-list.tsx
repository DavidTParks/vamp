import { getRepos, getUserGithubOrgs } from "@/lib/github"
import { dateToNow } from "@/lib/utils"
import GithubRepoSelect from "./github-repo-select"
import { Skeleton } from "@/ui/skeleton"
import { GithubOrgCard } from "./github-org-card"

export default async function GithubRepoList() {
    const repositories = getRepos()
    const orgs = getUserGithubOrgs()

    const [repos, organizations] = await Promise.all([repositories, orgs])

    return (
        <>
            {organizations?.length ? (
                <div className="mb-8">
                    <h4 className="text-brandtext-500 font-medium text-lg">
                        Your organizations
                    </h4>
                    <div className="flex flex-col space-y-4 mt-4">
                        {organizations.map((org) => (
                            <>
                                {/* @ts-expect-error Server Component */}
                                <GithubOrgCard key={org.id} org={org} />
                            </>
                        ))}
                    </div>
                </div>
            ) : null}
            <h4 className="text-brandtext-500 font-medium text-lg">
                Your repositories
            </h4>
            <div className="flex flex-col relative divide-y divide-palette-300">
                {repos?.map((repo) => (
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
