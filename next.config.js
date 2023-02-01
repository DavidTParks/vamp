const { withAxiom } = require("next-axiom")

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: [
            "@prisma/client",
            "@rainbow-me/rainbowkit",
            "@rainbow-me/rainbowkit/wallets",
        ],
    },
    images: {
        domains: [
            "avatars.githubusercontent.com",
            "avatar.vercel.sh",
            "jpxwqgklwwytoznbpbmn.supabase.co",
            "contrib.rocks",
            "localhost",
            "vamp.sh",
            "vamp-git-submission-email-notification-davidtparks.vercel.app",
            "vamp-git-main-davidtparks.vercel.app",
        ],
    },
}

module.exports = withAxiom(nextConfig)
