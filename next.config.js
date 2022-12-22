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
        ],
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
