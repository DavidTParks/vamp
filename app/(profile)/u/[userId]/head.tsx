import { db } from "@/lib/db"
import { getBaseUrl } from "@/lib/utils"
import { notFound } from "next/navigation"
import DefaultTags from "@/app/DefaultTags"
import { getUserById } from "@/lib/users"
import { getGithubUserById } from "@/lib/github"

interface ProfilePageProps {
    params: { userId: string }
    searchParams?: { page: string; search: string; sort: string }
}

export default async function Head({ params }: ProfilePageProps) {
    const user = await getUserById(params.userId)

    if (!user) {
        return notFound()
    }

    const providerAccountId = user?.accounts.find(
        (account) => account.providerAccountId
    )?.providerAccountId

    if (!providerAccountId) return notFound()

    const githubUser = await getGithubUserById(providerAccountId)

    const ogUrl = new URL(`${getBaseUrl()}/api/user-og`)
    ogUrl.searchParams.set("heading", user?.name ?? "Vamp User")
    ogUrl.searchParams.set("blood", user.blood?.toString())
    ogUrl.searchParams.set("gold", user.gold?.toString())
    ogUrl.searchParams.set("userId", user.id)
    ogUrl.searchParams.set("githubUsername", githubUser.login)

    // const bounty = await getPost(params.bountyId)

    return (
        <>
            <DefaultTags />
            <link rel="canonical" href={`/u/${user.id}`} />
            <meta property="og:title" content={user.name ?? "Vamp User"} />
            {/* <meta property="og:url" content={url} /> */}
            <meta property="og:image" content={ogUrl.toString()} />
            <meta name="twitter:title" content={user.name ?? "Vamp User"} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={ogUrl.toString()} />
        </>
    )
}
