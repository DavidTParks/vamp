import Link from "next/link"

import { Icons } from "@/components/icons"
import { UserAuthForm } from "@/components/dashboard/user-auth-form"
import { Button } from "@/ui/button"
export default function LoginPage() {
    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <div className="absolute top-4 left-4 focus:z-10 focus:outline-none md:top-8 md:left-8">
                <Button intent="tertiary" href="/">
                    <>
                        <Icons.chevronLeft className="mr-2 h-4 w-4" />
                        Back
                    </>
                </Button>
            </div>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <Icons.logo color="white" className="mx-auto h-12 w-12" />
                    <h1 className="text-2xl font-bold text-white">
                        Create an account
                    </h1>
                    <p className="text-sm text-slate-200">
                        Continue with Github to create your account
                    </p>
                </div>
                <UserAuthForm />
                <p className="px-8 text-center text-sm text-slate-600">
                    By clicking continue, you agree to our{" "}
                    <Link href="/terms" className="underline hover:text-brand">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                        href="/privacy"
                        className="underline hover:text-brand"
                    >
                        Privacy Policy
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}
