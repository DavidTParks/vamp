import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { cache } from "react"

export const getSession = cache(async () => {
    return await unstable_getServerSession(authOptions)
})

export const getCurrentUser = cache(async () => {
    const session = await getSession()

    return session?.user
})
