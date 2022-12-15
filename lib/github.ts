import "server-only"

import { getCurrentUser } from "@/lib/session"
import { cache } from "react"
import { GithubIssueSearch, GithubRepository, GithubUser } from "types"
import urlcat from "urlcat"

const BASEURL: string = "https://api.github.com"

const FALLBACK_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN

export const getGithubUser = cache(async (): Promise<GithubUser> => {
    const url = `${BASEURL}/user`

    const user = await getCurrentUser()

    return await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
                user?.accessToken ?? FALLBACK_ACCESS_TOKEN
            }`,
        },
    }).then((res) => res.json())
})

export const preloadRepos = () => {
    void getRepos()
}

export const getRepos = cache(async (): Promise<GithubRepository[]> => {
    const url = urlcat(`${BASEURL}/user/repos`, {
        type: "all",
        sort: "pushed",
        direction: "desc",
    })

    const user = await getCurrentUser()

    return await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
                user?.accessToken ?? FALLBACK_ACCESS_TOKEN
            }`,
        },
    }).then((res) => res.json())
})

export const preloadRepo = (repoId: number) => {
    void getRepo(repoId)
}

export const getRepo = cache(
    async (repoId: number): Promise<GithubRepository> => {
        const url = `${BASEURL}/repositories/${repoId}`

        const user = await getCurrentUser()

        return await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${
                    user?.accessToken ?? FALLBACK_ACCESS_TOKEN
                }`,
            },
        }).then((res) => res.json())
    }
)

export const preloadRepoIssues = (
    repoId: number,
    page: string | number,
    search: string | null
) => {
    void getRepoIssues(repoId, page, search)
}

export const getRepoIssues = cache(
    async (
        repoId: number,
        page: string | number,
        search: string | null
    ): Promise<GithubIssueSearch> => {
        const repo = await getRepo(repoId)

        const queryString = encodeURIComponent(
            `repo:${repo.full_name} is:open is:issue ${search ?? ""} in:body`
        )

        const url = `${BASEURL}/search/issues?q=${queryString}&page=${page}`

        const user = await getCurrentUser()

        return await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${
                    user?.accessToken ?? FALLBACK_ACCESS_TOKEN
                }`,
            },
        }).then((res) => res.json())
    }
)
