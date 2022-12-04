import { Headline } from "@/ui/headline"
import { Skeleton } from "@/ui/skeleton"
import Link from "next/link"
import { Button } from "@/ui/button"
import { Icons } from "@/components/icons"

const RepoLoadingItem = () => {
    return (
        <div className="p-4 pr-0 flex justify-between items-center">
            <Skeleton className="w-full h-8" />
        </div>
    )
}

export default function NewLoading() {
    return (
        <div className="max-w-lg mx-auto w-full">
            <div className="my-8">
                <Link href={`/dashboard`}>
                    <Button
                        intent="tertiary"
                        className="inline-flex items-center justify-start gap-2 mb-8"
                        size="small"
                    >
                        <Icons.chevronLeft size={16} />
                        Back
                    </Button>
                </Link>
                <Headline
                    heading="Select a Github repository"
                    text="To create a new Project, import an existing Git Repository."
                />
            </div>
            <div className="flex flex-col relative divide-y divide-palette-300">
                <RepoLoadingItem />
                <RepoLoadingItem />
                <RepoLoadingItem />
                <RepoLoadingItem />
                <RepoLoadingItem />
            </div>
        </div>
    )
}
