import { Octokit } from "octokit"
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { cache } from "react"
import { type } from "os"

export const getSession = cache(async () => {
    return await unstable_getServerSession(authOptions)
})

export const getCurrentUser = cache(async () => {
    const session = await getSession()

    return session?.user
})

// Backup Octokit client
export const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN })

// Attempt to see if we can use the authed users access key, otherwise fallback to our personal access token octokit client
export const getOctokitClient = async () => {
    const user = await getCurrentUser()

    if (user) {
        return user.octokit
    } else {
        return octokit
    }
}
