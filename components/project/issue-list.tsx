import { CalendarIcon, MapPinIcon, UsersIcon } from "@heroicons/react/20/solid"
import { GithubIssue } from "types"
import { dateToNow } from "@/lib/utils"
import { Button } from "@/ui/button"
import { Icons } from "../icons"
import IssueListPagination from "./issue-list-pagination"
import { TProject } from "./secondary-nav"

type TIssueList = {
    issues: GithubIssue[]
    project: TProject
    page: number
}

export default function IssueList({ issues, project, page }: TIssueList) {
    return (
        <div className="flex flex-col relative divide-y divide-palette-300">
            {issues?.map((issue) => (
                <div
                    className="p-4 pr-0 pl-0 flex justify-between items-center"
                    key={issue.id}
                >
                    <div className="flex items-center gap-2">
                        <Icons.circleDot size={16} className="text-green-400" />
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
                            Last updated {dateToNow(new Date(issue.updated_at))}{" "}
                            ago
                        </div>
                    </div>

                    <Button size="small" intent="secondary">
                        New bounty
                    </Button>
                </div>
            ))}
            <div className="my-12">
                <IssueListPagination
                    project={{
                        id: project.id,
                    }}
                />
            </div>
        </div>
    )
}
