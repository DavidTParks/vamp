import { cn } from "@/lib/utils"

interface KeyValueProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string
    value: string
}

export function KeyValue({ className, label, value, ...props }: KeyValueProps) {
    return (
        <div className="flex justify-between items-center text-sm w-full">
            <span className="text-brandtext-600 font-bold">{label}</span>
            <span className="text-brandtext-500 font-medium">{value}</span>
        </div>
    )
}
