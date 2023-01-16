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
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {projects.map((project) => (
                        <Link href={`/p/${project.id}`} key={project.id}>
                            <div className="overflow-hidden rounded-lg border border-raised-border p-4 py-6 transition-all duration-150 hover:brightness-150">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full">
                                        <Image
                                            fill={true}
                                            alt="Project avatar"
                                            src={`https://avatar.vercel.sh/${project.id}`}
                                        />
                                    </div>
                                    <div className="mt-4 max-w-[128px] truncate">
                                        <p className="block truncate text-center text-lg font-bold text-brandtext-500">
                                            {project.name}
                                        </p>
                                        <p className="block text-center text-sm text-brandtext-700">
                                            {project.bounties.length} Bounties
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <EmptyPlaceholder className="mt-4 min-h-[100px]">
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
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="overflow-hidden rounded-lg border border-raised-border p-4 py-6 transition-all duration-150 hover:brightness-150">
                <div className="flex flex-col items-center justify-center">
                    <div className="relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full">
                        <Skeleton className="h-16 w-16" />
                    </div>
                    <div className="mt-4 flex w-full flex-col items-center justify-center">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="mt-2 h-4 w-24"></Skeleton>
                    </div>
                </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-raised-border p-4 py-6 transition-all duration-150 hover:brightness-150">
                <div className="flex flex-col items-center justify-center">
                    <div className="relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full">
                        <Skeleton className="h-16 w-16" />
                    </div>
                    <div className="mt-4 flex w-full flex-col items-center justify-center">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="mt-2 h-4 w-24"></Skeleton>
                    </div>
                </div>
            </div>
        </div>
    )
}
