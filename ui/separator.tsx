import { cn } from "@/lib/utils"

type TSeparator = {
    className?: string
}
export function Separator({ className }: TSeparator) {
    return <div className={cn("h-px w-full bg-palette-300", className)} />
}
