import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export interface User {
    id?: string | null
    name?: string | null
    email?: string | null
    image?: string | null
}
export async function getSession() {
    return await unstable_getServerSession(authOptions)
}

export async function getCurrentUser(): Promise<User> {
    const session = await getSession()

    return session?.user
}
