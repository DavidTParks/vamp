import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"
import { sendMarketingMail } from "@/emails/index"
import WelcomeEmail from "@/emails/WelcomeEmail"

let authOptionsWithEvents = { ...authOptions }

authOptionsWithEvents.events = {
    async signIn(message) {
        if (message.isNewUser) {
            const email = message.user.email
            const name = message.user.name

            if (email && name) {
                await Promise.all([
                    sendMarketingMail({
                        subject: "✨ Welcome to Vamp",
                        to: email,
                        component: <WelcomeEmail />,
                    }),
                ])
            }
        }
    },
}

// @see ./lib/auth
export default NextAuth(authOptionsWithEvents)
