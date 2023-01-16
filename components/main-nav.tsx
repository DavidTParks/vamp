import Link from "next/link"

import { Icons } from "@/components/icons"

export function MainNav() {
    return (
        <div className="flex gap-6 text-red-50 md:gap-10">
            <Link href="/" className="flex items-center space-x-2 text-2xl">
                <Icons.logo size={32} color="white" />
                <span className="hidden font-bold sm:inline-block">Vamp</span>
            </Link>
        </div>
    )
}
