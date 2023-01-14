import { db } from "@/lib/db"
import { User } from "@prisma/client"
import Link from "next/link"
import Image from "next/image"
import { Skeleton } from "@/ui/skeleton"
import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"

interface IUserProjectList {
    user: Pick<User, "id">
}

export async function UserProjectList({ user }: IUserProjectList) {
    const projects = await db.project.findMany({
        where: {
            users: {
                some: {
                    user: {
                        id: user.id,
                    },
                },
            },
        },
        include: {
            bounties: {
                where: {
                    OR: [
                        {
                            resolved: true,
                        },
                        {
                            published: true,
                        },
                    ],
                    NOT: [
                        {
                            deleted: true,
                        },
                    ],
                },
            },
        },
    })

    return (
        <>
            {projects?.length ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                    {projects.map((project) => (
                        <Link href={`/p/${project.id}`} key={project.id}>
                            <div className="border border-raised-border rounded-lg p-4 py-6 overflow-hidden hover:brightness-150 transition-all duration-150">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="h-16 w-16 rounded-full overflow-hidden inline-flex items-center justify-center relative">
                                        <Image
                                            fill={true}
                                            alt="Project avatar"
                                            src={`https://avatar.vercel.sh/${project.id}`}
                                        />
                                    </div>
                                    <div className="mt-4 max-w-[128px] truncate">
                                        <p className="text-brandtext-500 font-bold text-lg block truncate text-center">
                                            {project.name}
                                        </p>
                                        <p className="text-brandtext-700 text-sm block text-center">
                                            {project.bounties.length} Bounties
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <EmptyPlaceholder className="min-h-[100px] mt-4">
                    <EmptyPlaceholder.Icon name="logo" />
                    <EmptyPlaceholder.Title>No projects</EmptyPlaceholder.Title>
                    <EmptyPlaceholder.Description className="mb-0">
                        This user does not have any projects
                    </EmptyPlaceholder.Description>
                </EmptyPlaceholder>
            )}
        </>
    )
}

UserProjectList.Skeleton = function CardSeleton() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            <div className="border border-raised-border rounded-lg p-4 py-6 overflow-hidden hover:brightness-150 transition-all duration-150">
                <div className="flex flex-col items-center justify-center">
                    <div className="h-16 w-16 rounded-full overflow-hidden inline-flex items-center justify-center relative">
                        <Skeleton className="h-16 w-16" />
                    </div>
                    <div className="mt-4 w-full flex justify-center flex-col items-center">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-24 mt-2"></Skeleton>
                    </div>
                </div>
            </div>
            <div className="border border-raised-border rounded-lg p-4 py-6 overflow-hidden hover:brightness-150 transition-all duration-150">
                <div className="flex flex-col items-center justify-center">
                    <div className="h-16 w-16 rounded-full overflow-hidden inline-flex items-center justify-center relative">
                        <Skeleton className="h-16 w-16" />
                    </div>
                    <div className="mt-4 w-full flex justify-center flex-col items-center">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-24 mt-2"></Skeleton>
                    </div>
                </div>
            </div>
        </div>
    )
}
