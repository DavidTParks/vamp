import { LeaderBoard } from "@/components/marketing/leaderboard"

interface LeaderboardPageProps {
    searchParams?: { page: string; search: string; sort: string }
}

export default async function LeaderboardPage({
    searchParams,
}: LeaderboardPageProps) {
    return (
        <div className="max-w-4xl mx-auto w-full">
            <div className="my-8">
                <div className="mx-auto  px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-lg font-semibold text-rose-600">
                            Make your mark
                        </h1>
                        <h1 className="mt-1 text-4xl font-bold tracking-tight text-brandtext-500 sm:text-5xl lg:text-6xl flex gap-8 justify-center w-full items-center">
                            Leaderboard
                        </h1>
                        <p className="mx-auto mt-5 max-w-xl text-xl text-brandtext-600">
                            Collect Blood and rise to the top of the Vamps!
                        </p>
                    </div>
                </div>
            </div>

            {/* @ts-expect-error Server Component */}
            <LeaderBoard
                showPagination={true}
                sortQuery={searchParams?.sort}
                pageSize={10}
                search={searchParams?.search}
                page={searchParams?.page ? parseInt(searchParams.page) : 1}
            />
        </div>
    )
}
