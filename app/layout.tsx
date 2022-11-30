import { Inter as FontSans } from "@next/font/google"
import localFont from "@next/font/local"

import "./globals.css"

import { cn } from "@/lib/utils"

const satoshi = localFont({
    src: "./Satoshi-Variable.woff2",
    variable: "--font-satoshi",
    weight: "300 900",
    display: "swap",
    style: "normal",
})

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-inter",
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html
            lang="en"
            className={cn(
                "bg-appbg font-sans text-slate-900 antialiased",
                satoshi.variable,
                fontSans.variable
            )}
        >
            {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <head />
            <body className="min-h-screen">{children}</body>
        </html>
    )
}
