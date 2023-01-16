import { Skeleton } from "@/ui/skeleton"

const RepoLoadingItem = () => {
    return (
        <div className="flex items-center justify-between p-4 pr-0 pl-0">
            <Skeleton className="flex h-8 w-full" />
        </div>
    )
}
export default async function LoadingIssues({}) {
    return (
        <div>
            <div className="my-8 flex w-full flex-col items-center justify-center gap-2 rounded-md border border-raised-border p-4">
                <p className="text-lg font-medium text-brandtext-500">
                    Import an existing Github issue
                </p>
                <p className="text-sm text-brandtext-600">
                    Reference an open issue on your repository in a new bounty
                </p>
            </div>
            <div className="relative flex flex-col divide-y divide-palette-300">
                <RepoLoadingItem />
                <RepoLoadingItem />
                <RepoLoadingItem />
                <RepoLoadingItem />
                <RepoLoadingItem />
                <RepoLoadingItem />
                <RepoLoadingItem />
                <RepoLoadingItem />
                <RepoLoadingItem />
            </div>
        </div>
    )
}
