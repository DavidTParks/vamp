interface HeadlineProps {
    heading: string
    text?: string
    children?: React.ReactNode
}

export function Headline({ heading, text, children }: HeadlineProps) {
    return (
        <div className="flex justify-between px-2">
            <div className="grid gap-1">
                <h1 className="text-2xl font-bold tracking-wide text-brandtext-500">
                    {heading}
                </h1>
                {text && <p className="text-brandtext-600">{text}</p>}
            </div>
        </div>
    )
}
