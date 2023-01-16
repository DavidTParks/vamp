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
            <div className="ease block h-full overflow-hidden rounded-lg border border-palette-300 bg-palette-400 shadow-lg transition-all duration-150  hover:shadow-xl">
                <div className="flex h-full flex-col p-4">
                    <div className="flex h-full w-full items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="relative flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-full border border-zinc-700/50  bg-zinc-800 shadow-md shadow-zinc-800/5 ring-0 ring-zinc-900/5">
                                <div className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
                                    <Image
                                        fill={true}
                                        alt="Avatar"
                                        src={
                                            projectUser.project
                                                .computedProjectImage
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Link
                                    href={`/project/${projectUser.project.id}`}
                                    className="inline-flex hover:underline"
                                >
                                    <span className="max-w-[216px] truncate font-medium text-white hover:underline">
                                        {projectUser.project.name}
                                    </span>
                                </Link>
                                <span className="inline-flex items-center gap-2 text-sm text-brandtext-600">
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
            <div className="ease block h-full space-y-4 overflow-hidden rounded-lg border border-palette-300 bg-palette-400 p-4 shadow-lg transition-all duration-150 hover:border-brandtext-500 hover:shadow-xl">
                <Skeleton className="h-5 w-2/5" />
                <Skeleton className="h-4 w-4/5" />
            </div>
        </div>
    )
}
