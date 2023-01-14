import { cn } from "@/lib/utils"

type TSeparator = {
    className?: string
}
export function Separator({ className }: TSeparator) {
    return <div className={cn("h-px bg-palette-300 w-full", className)} />
}
