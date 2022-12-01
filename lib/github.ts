import "server-only"

import { getCurrentUser } from "@/lib/session"
import { db } from "./db"
import { GithubRepository } from "types"

export async function getRepos() {
    const user = await getCurrentUser()
    const userRecord = await db.account.findFirst({
        where: {
            userId: user.id,
        },
    })

    return (await fetch(`https://api.github.com/user/repos`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userRecord.access_token}`,
        },
    }).then((res) => res.json())) as GithubRepository[]
}
