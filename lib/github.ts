import "server-only"

import urlcat from "urlcat"
import { getCurrentUser } from "@/lib/session"
import { db } from "./db"
import { GithubRepository, GithubIssue, GithubIssueSearch } from "types"
import { cache } from "react"
import { GithubUser } from "types"

const BASEURL: string = "https://api.github.com"

export const getGithubUser = cache(async (): Promise<GithubUser> => {
    const url = `${BASEURL}/user`

    const user = await getCurrentUser()
    const userRecord = await db.account.findFirst({
        where: {
            userId: user.id,
        },
    })

    return await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userRecord.access_token}`,
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
    const userRecord = await db.account.findFirst({
        where: {
            userId: user.id,
        },
    })

    return await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userRecord.access_token}`,
        },
    }).then((res) => res.json())
})

export const preloadRepo = (repoId: number) => {
    void getRepo(repoId)
}

export const getRepo = cache(
    async (repoId: number): Promise<GithubRepository> => {
        //api.github.com/repos/DavidTParks/aws-crypto-dynamodb-lambda
        const url = `${BASEURL}/repositories/${repoId}`

        const user = await getCurrentUser()
        const userRecord = await db.account.findFirst({
            where: {
                userId: user.id,
            },
        })

        return await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userRecord.access_token}`,
            },
        }).then((res) => res.json())
    }
)

export const preloadRepoIssues = (repoId: number, page: string | number) => {
    void getRepoIssues(repoId, page)
}

export const getRepoIssues = cache(
    async (
        repoId: number,
        page: string | number
    ): Promise<GithubIssueSearch> => {
        const repo = await getRepo(repoId)

        const queryString = encodeURIComponent(
            `repo:${repo.full_name} is:open is:issue`
        )

        const url = `${BASEURL}/search/issues?q=${queryString}&page=${page}`

        const user = await getCurrentUser()
        const userRecord = await db.account.findFirst({
            where: {
                userId: user.id,
            },
        })

        return await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userRecord.access_token}`,
            },
        }).then((res) => res.json())
    }
)
