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
                    <h4 className="text-lg font-medium text-brandtext-500">
                        Your organizations
                    </h4>
                    <div className="mt-4 flex flex-col space-y-4">
                        {organizations.map((org) => (
                            <>
                                {/* @ts-expect-error Server Component */}
                                <GithubOrgCard key={org.id} org={org} />
                            </>
                        ))}
                    </div>
                </div>
            ) : null}
            <h4 className="text-lg font-medium text-brandtext-500">
                Your repositories
            </h4>
            <div className="relative flex flex-col divide-y divide-palette-300">
                {repos?.map((repo) => (
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
