/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ["@prisma/client"],
    },
    images: {
        domains: ["avatars.githubusercontent.com"],
    },
}

module.exports = nextConfig
