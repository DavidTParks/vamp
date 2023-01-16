import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface KeyValueProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string
    value: string | ReactNode
}

export function KeyValue({ className, label, value, ...props }: KeyValueProps) {
    return (
        <div className="flex w-full items-center justify-between text-sm">
            <span className="font-bold text-brandtext-600">{label}</span>
            <span className="font-medium text-brandtext-500">{value}</span>
        </div>
    )
}
