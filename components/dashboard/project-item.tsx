import { Project, ProjectUsers, User, Account } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { ProjectOperations } from "./project-operations"
import { Button } from "@/ui/button"
import { Skeleton } from "@/ui/skeleton"

interface DashboardHeaderProps {
    projectUser: ProjectUsers & {
        project: Project & {
            users: ProjectUsers[]
        }
        user: User & {
            accounts: Account[]
        }
    }
}

export function ProjectItem({ projectUser }: DashboardHeaderProps) {
    return (
        <div key={projectUser.id} className="relative ">
            <div className="block bg-palette-400 border border-palette-300 shadow-lg rounded-lg overflow-hidden h-full transition-all duration-150 ease hover:border-brandtext-500 hover:shadow-xl">
                <div className="p-4 h-full flex flex-col">
                    <div className="flex items-center w-full justify-between h-full">
                        <div className="flex items-center gap-4">
                            <div className="h-8 w-8 rounded-full overflow-hidden inline-flex items-center justify-center relative">
                                <Image
                                    fill={true}
                                    alt="Avatar"
                                    src={`https://avatar.vercel.sh/${projectUser.project.id}`}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Link
                                    href={`/project/${projectUser.project.id}`}
                                    className="hover:underline"
                                >
                                    <span className="text-white font-medium hover:underline">
                                        {projectUser.project.name}
                                    </span>
                                </Link>
                                <span className="text-brandtext-600 text-sm">
                                    {projectUser.project.users.length} Team{" "}
                                    {projectUser.project.users.length === 1
                                        ? "Member"
                                        : "Members"}
                                </span>
                            </div>
                        </div>

                        <ProjectOperations
                            project={{
                                id: projectUser.project.id,
                                name: projectUser.project.name,
                            }}
                        />
                    </div>
                    <Link
                        href={`/project/${projectUser.project.id}`}
                        className="mt-6 w-full"
                    >
                        <Button
                            fullWidth={true}
                            intent="secondary"
                            size="small"
                        >
                            <p className="text-brandtext-400 font-medium text-sm inline-flex items-center gap-2">
                                Dashboard
                            </p>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

ProjectItem.Skeleton = function ProjectItemSkeleton() {
    return (
        <div className="space-y-3">
            <div className="block bg-palette-400 border border-palette-300 shadow-lg rounded-lg overflow-hidden h-full transition-all duration-150 ease hover:border-brandtext-500 hover:shadow-xl p-4 space-y-4">
                <Skeleton className="h-5 w-2/5" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
    )
}
