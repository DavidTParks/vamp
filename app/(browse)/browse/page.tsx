import { BrowseBountyList } from "@/components/browse/bounty-list"
import { BrowseSearch } from "@/components/browse/browse-search"
import { Icons } from "@/components/icons"

interface BrowsePageProps {
    searchParams: { page: string; search: string }
}

export default async function BrowsePage({ searchParams }: BrowsePageProps) {
    return (
        <div className="max-w-4xl mx-auto w-full">
            <div className="my-8">
                <div className="mx-auto  px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-lg font-semibold text-rose-600">
                            Browse
                        </h2>
                        <p className="mt-1 text-4xl font-bold tracking-tight text-brandtext-500 sm:text-5xl lg:text-6xl flex gap-8 justify-center w-full items-center">
                            Make your mark
                        </p>
                        <p className="mx-auto mt-5 max-w-xl text-xl text-brandtext-600">
                            If your bounty resolution is accepted by an Open
                            Source project, you get paid! Plus, the street (web)
                            cred.
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-12 w-full">
                <BrowseSearch />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8">
                {/* @ts-expect-error Server Component */}
                <BrowseBountyList
                    pageSize={25}
                    search={searchParams.search}
                    page={searchParams?.page ? parseInt(searchParams.page) : 0}
                />
            </div>
        </div>
    )
}
