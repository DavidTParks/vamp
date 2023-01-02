/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ["@prisma/client"],
    },
    images: {
        domains: [
            "avatars.githubusercontent.com",
            "avatar.vercel.sh",
            "jpxwqgklwwytoznbpbmn.supabase.co",
            "contrib.rocks",
        ],
    },
}

module.exports = nextConfig
