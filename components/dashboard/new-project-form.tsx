"use client"

import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/auth"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { toast } from "@/ui/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import * as React from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
import { GithubRepoList } from "@/components/dashboard/github-repo-list"

type FormData = z.infer<typeof userAuthSchema>

export function NewProjectForm({ className, ...props }: UserAuthFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(userAuthSchema),
    })

    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const searchParams = useSearchParams()

    async function onSubmit(data: FormData) {
        setIsLoading(true)

        const signInResult = await signIn("email", {
            email: data.email.toLowerCase(),
            redirect: false,
            callbackUrl: searchParams.get("from") || "/dashboard",
        })

        setIsLoading(false)

        if (!signInResult?.ok) {
            return toast({
                title: "Something went wrong.",
                message: "Your sign in request failed. Please try again.",
                type: "error",
            })
        }

        return toast({
            title: "Check your email",
            message:
                "We sent you a login link. Be sure to check your spam too.",
            type: "success",
        })
    }

    return (
        <>
            <div className={cn("grid gap-6", className)} {...props}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        <div className="grid gap-1">
                            <Label htmlFor="projectName">Project name *</Label>
                            <Input
                                id="projectName"
                                placeholder="Ex. Next.js "
                                type="text"
                                autoCapitalize="none"
                                autoComplete="projectName"
                                autoCorrect="off"
                                name="projectName"
                                disabled={isLoading}
                                register={register}
                            />
                            {errors?.email && (
                                <p className="px-1 text-xs text-red-600">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                    </div>
                </form>
            </div>
            <p className="text-slate-200 mt-4">Select git repository</p>

            <div className="mt-0">
                <GithubRepoList />
            </div>
        </>
    )
}
