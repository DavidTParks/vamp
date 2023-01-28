import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"

export const revalidate = 0

export default async function ProjectLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
