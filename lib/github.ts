import "server-only"

import { getCurrentUser } from "@/lib/session"
import { cache } from "react"
import { ArrayElement, Await, GithubIssueSearch, GithubUser } from "types"
import { getOctokitClient } from "./octokit"

const BASEURL: string = "https://api.github.com"

const FALLBACK_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN

export const getGithubUser = cache(async () => {
    const octokit = await getOctokitClient()
    const data = await octokit.rest.users.getAuthenticated()

    return data?.data
})

export const getGithubUserById = cache(
    async (id: string | undefined): Promise<GithubUser> => {
        const octokit = await getOctokitClient()

        const data = await octokit.request("GET /user/{id}", {
            id,
        })

        return data?.data
    }
)

export const preloadUserGithubOrgs = () => {
    void getUserGithubOrgs()
}

export const getUserGithubOrgs = cache(async () => {
    const octokit = await getOctokitClient()
    const user = await getGithubUser()

    const data = await octokit.rest.orgs.listForUser({ username: user.login })

    return data.data
})

type TGetUserOrgsReturnType = Await<ReturnType<typeof getUserGithubOrgs>>
export type TGetUserOrgElement = ArrayElement<TGetUserOrgsReturnType>

export const preloadOrgRepos = (orgId: number) => {
    void getOrgRepos(orgId)
}

export const getOrgRepos = cache(async (orgId: number) => {
    const octokit = await getOctokitClient()

    const data = await octokit.rest.repos.listForOrg({
        org: orgId?.toString(),
    })

    return data?.data
})

type TGetOrgReposReturnType = Await<ReturnType<typeof getOrgRepos>>
export type TGetOrgRepoElement = ArrayElement<TGetOrgReposReturnType>

export const preloadRepos = () => {
    void getRepos()
}

export const getRepos = cache(async () => {
    const octokit = await getOctokitClient()
    const user = await getGithubUser()

    const data = await octokit.rest.repos.listForUser({
        username: user.login,
        type: "all",
        sort: "pushed",
        direction: "desc",
    })

    return data?.data
})

type TGetReposReturnType = Await<ReturnType<typeof getRepos>>
export type TGetReposReturnTypeElement = ArrayElement<TGetReposReturnType>

export const preloadRepo = (repoId: number) => {
    void getRepo(repoId)
}

export const getRepo = cache(async (repoId: number) => {
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
})

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
            `repo:${repo.full_name} is:open is:issue ${
                search ?? ""
            } in:body in:title`
        )

        const url = `${BASEURL}/search/issues?q=${queryString}&page=${page}`

        const user = await getCurrentUser()

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${
                    user?.accessToken ?? FALLBACK_ACCESS_TOKEN
                }`,
            },
        })

        if (!response.ok) {
            return await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${FALLBACK_ACCESS_TOKEN}`,
                },
            }).then((res) => res.json())
        } else {
            return response.json()
        }
    }
)

export const getRepoTopics = async (repo: string) => {
    const octokit = await getOctokitClient()
    const user = await getGithubUser()

    const data = await octokit.rest.repos.getAllTopics({
        owner: user.login,
        repo,
    })

    return data?.data
}
