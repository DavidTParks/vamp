import { useQuery } from "@tanstack/react-query"
import useAuthSession from "./use-auth-session"
import { GithubRepository } from "types"
import urlcat from "urlcat"

interface TGithubReposFetch {
    type?: "all" | "private" | "public"
}

const BASEURL: string = "https://api.github.com/user/repos"

export default function useGithubRepos({
    type = "all",
}: TGithubReposFetch = {}) {
    const { data: session, error } = useAuthSession()

    const url = urlcat(BASEURL, {
        type,
        sort: "pushed",
        direction: "desc",
    })

    const repos = useQuery(
        [`githubRepos`],
        async () => {
            return (await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.user.accessToken}`,
                },
            }).then((res) => res.json())) as GithubRepository[]
        },
        {
            enabled: !!session,
        }
    )

    return repos
}
