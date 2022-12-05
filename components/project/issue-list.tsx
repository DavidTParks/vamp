import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"
import { dateToNow } from "@/lib/utils"
import { Button } from "@/ui/button"
import { GithubIssueSearch } from "types"
import { Icons } from "../icons"
import { BountyCreateButton } from "./bounty-create-button"
import IssueListPagination from "./issue-list-pagination"
import { TProject } from "./secondary-nav"

type TIssueList = {
    issues: GithubIssueSearch
    project: TProject
    page: number | string
}

export default function IssueList({ issues, project, page }: TIssueList) {
    return (
        <div className="flex flex-col relative divide-y divide-palette-300">
            {issues?.items?.length ? (
                <>
                    {issues?.items?.map((issue) => (
                        <div
                            className="p-4 pr-0 pl-0 flex flex-col sm:flex-row items-start justify-between sm:items-center gap-4 sm:gap-0"
                            key={issue.id}
                        >
                            <div className="flex items-center gap-2">
                                <Icons.circleDot
                                    size={16}
                                    className="text-green-400"
                                />
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href={issue.html_url}
                                    className="text-white font-medium text-sm hover:underline max-w-[128px] md:max-w-[256px] truncate"
                                >
                                    {issue.title}
                                </a>
                                <div className="text-brandtext-600 text-2xl">
                                    &middot;
                                </div>
                                <div className="text-sm text-slate-500">
                                    Last updated{" "}
                                    {dateToNow(new Date(issue.updated_at))} ago
                                </div>
                            </div>

                            <BountyCreateButton
                                size="small"
                                project={{
                                    id: project.id,
                                }}
                                issue={issue}
                                intent="secondary"
                            >
                                New bounty
                            </BountyCreateButton>
                        </div>
                    ))}
                </>
            ) : (
                <EmptyPlaceholder>
                    <EmptyPlaceholder.Icon name="gitHub" />
                    <EmptyPlaceholder.Title>No issues</EmptyPlaceholder.Title>
                    <EmptyPlaceholder.Description>
                        This Github repository does not have any issues, or any
                        issues that match this search query.
                    </EmptyPlaceholder.Description>
                </EmptyPlaceholder>
            )}
            {issues?.total_count > 30 && (
                <div className="mb-16 mt-8">
                    <IssueListPagination
                        totalCount={issues.total_count}
                        project={{
                            id: project.id,
                        }}
                    />
                </div>
            )}
        </div>
    )
}
