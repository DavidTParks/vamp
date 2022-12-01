import "server-only"

import urlcat from "urlcat"
import { getCurrentUser } from "@/lib/session"
import { db } from "./db"
import { GithubRepository } from "types"
import { cache } from "react"

const BASEURL: string = "https://api.github.com"

export const preloadRepos = () => {
    void getRepos()
}

export const getRepos = cache(async () => {
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

    return (await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userRecord.access_token}`,
        },
    }).then((res) => res.json())) as GithubRepository[]
})
