import { db } from "@/lib/db"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import { Octokit } from "octokit"
import { ethers } from "ethers"

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
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async session({ token, session }) {
            const octokit = new Octokit({ auth: token.accessToken })

            if (token) {
                session.user.accessToken = token.accessToken
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.picture
                session.user.stripeCustomerId = token.stripeCustomerId
                session.user.octokit = octokit
            }

            return session
        },
        //@ts-ignore
        async jwt({ token, user }) {
            const dbUser = await db.user.findFirst({
                where: {
                    email: token.email,
                },
                include: {
                    accounts: true,
                },
            })

            if (!dbUser && user) {
                token.id = user.id
                return token
            }

            const accessToken = dbUser?.accounts.find(
                (account) => account.access_token
            )?.access_token

            return {
                id: dbUser?.id,
                name: dbUser?.name,
                email: dbUser?.email,
                picture: dbUser?.image,
                accessToken,
                stripeCustomerId: dbUser?.stripeCustomerId,
            }
        },
    },
}
