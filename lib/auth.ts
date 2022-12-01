import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"

import { db } from "@/lib/db"

// const postmarkClient = new Client(process.env.POSTMARK_API_TOKEN)

// const POSTMARK_SIGN_IN_TEMPLATE = 29559329
// const POSTMARK_ACTIVATION_TEMPLATE = 29559329

export const authOptions: NextAuthOptions = {
    // huh any! I know.
    // This is a temporary fix for prisma client.
    // @see https://github.com/prisma/prisma/issues/16117
    adapter: PrismaAdapter(db as any),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            const [dbUser, account] = await Promise.all([
                db.user.findFirst({
                    where: {
                        email: token.email,
                    },
                }),
                db.account.findFirst({
                    where: {
                        user: {
                            email: token.email,
                        },
                    },
                }),
            ])
            if (!dbUser) {
                token.id = user.id
                return token
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
                accessToken: account.access_token,
                refreshToken: account.refresh_token,
            }
        },
        async session({ token, session }) {
            if (token) {
                // @ts-ignore
                session.user.accessToken = token.accessToken
                // @ts-ignore
                session.user.refreshToken = token.refreshToken
                // @ts-ignore
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.picture
            }

            return session
        },
    },
}
