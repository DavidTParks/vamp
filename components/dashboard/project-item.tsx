import { preloadProject, TProjectForUser } from "@/lib/projects"
import { Skeleton } from "@/ui/skeleton"
import Image from "next/image"
import Link from "next/link"
import { Icons } from "../icons"
import { ProjectOperations } from "./project-operations"
import {
    Account,
    GithubRepository,
    Project,
    ProjectUsers,
    User,
} from "@prisma/client"
interface TProjectItem {
    projectUser: TProjectForUser
}

export function ProjectItem({ projectUser }: TProjectItem) {
    preloadProject(projectUser.project.id)

    return (
        <div key={projectUser.id} className="relative ">
            <div className="block bg-palette-400 border border-palette-300 shadow-lg rounded-lg overflow-hidden h-full transition-all duration-150 ease  hover:shadow-xl">
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
                            <div className="flex flex-col gap-2">
                                <Link
                                    href={`/project/${projectUser.project.id}`}
                                    className="hover:underline inline-flex"
                                >
                                    <span className="text-white font-medium hover:underline max-w-[216px] truncate">
                                        {projectUser.project.name}
                                    </span>
                                </Link>
                                <span className="items-center text-sm inline-flex gap-2 text-brandtext-600">
                                    <Icons.gitHub size={16} />
                                    <span className="max-w-[216px] truncate">
                                        {projectUser?.project?.githubRepo?.name}
                                    </span>
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
            </div>
        </div>
    )
}
