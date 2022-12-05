interface CreateProps {
    children?: React.ReactNode
}

export default function CreateLayout({ children }: CreateProps) {
    return (
        <div className="container mx-auto grid items-start gap-10 py-8">
            {children}
        </div>
    )
}
