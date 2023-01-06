import { Button } from "@/ui/button"
import Link from "next/link"
export function Cta() {
    return (
        <div className="bg-palette-400/50">
            <div className="mx-auto max-w-2xl py-16 px-6 text-center sm:py-20 lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    <span className="block">Make your mark.</span>
                    <span className="block">Start using Vamp today.</span>
                </h2>
                <Link href="/register">
                    <Button className="mt-8 inline-flex w-full items-center justify-center sm:w-auto">
                        Sign up for free
                    </Button>
                </Link>
            </div>
        </div>
    )
}
