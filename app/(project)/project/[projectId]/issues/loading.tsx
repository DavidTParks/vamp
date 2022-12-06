import { Skeleton } from "@/ui/skeleton"

const RepoLoadingItem = () => {
    return (
        <div className="p-4 pr-0 pl-0 flex justify-between items-center">
            <Skeleton className="w-full flex h-8" />
        </div>
    )
}
export default async function LoadingIssues({}) {
    return (
        <div>
            <div className="w-full border border-raised-border rounded-md flex justify-center items-center p-4 flex-col gap-2 my-8">
                <p className="text-brandtext-500 font-medium text-lg">
                    Import an existing Github issue
                </p>
                <p className="text-brandtext-600 text-sm">
                    Reference an open issue on your repository in a new bounty
                </p>
            </div>
            <div className="flex flex-col relative divide-y divide-palette-300">
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
