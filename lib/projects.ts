import "server-only"

import { db } from "./db"
import { cache } from "react"
import { Project, User } from "@prisma/client"

export const preloadProjects = (userId: User["id"]) => {
    void getProjectsForUser(userId)
}

export const getProjectsForUser = cache(async (userId: User["id"]) => {
    return await db.projectUsers.findMany({
        where: {
            userId,
        },
        include: {
            project: {
                include: {
                    users: true,
                    githubRepo: true,
                },
            },
            user: {
                include: {
                    accounts: true,
                },
            },
        },
        orderBy: {
            updatedAt: "desc",
        },
    })
})

export const preloadProject = (projectId: User["id"]) => {
    void getProject(projectId)
}

export const getProject = cache(async (projectId: Project["id"]) => {
    return await db.project.findUnique({
        where: {
            id: projectId,
        },
        include: {
            users: true,
            githubRepo: true,
            bounties: true,
        },
    })
})
