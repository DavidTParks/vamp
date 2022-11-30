import { DashboardShell } from "@/components/dashboard/shell"
import { redirect } from "next/navigation"
import { cache } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { User } from "@prisma/client"
import { authOptions } from "@/lib/auth"
import { Button } from "@/ui/button"

export default async function DashboardPage() {
    return (
        <DashboardShell>
            <DashboardHeader heading="Posts" text="Create and manage posts.">
                <Button>New project</Button>
            </DashboardHeader>
        </DashboardShell>
    )
}
