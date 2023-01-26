import { ImageResponse } from "@vercel/og"
import { NextRequest } from "next/server"
import ColorHash from "color-hash"
import { renderToReadableStream } from "react-dom/server"

// Inspired by https://deslucrece.com/ amazing artwork! Give his stuff a look.

export const config = {
    runtime: "edge",
}

const colorHash = new ColorHash()

export default async function handler(req: NextRequest) {
    const url = new URL(req.url)

    const seed = url.searchParams.get("seed")

    const [id, type] = seed?.split(".") || []
    const fileType = type?.includes("svg") ? "svg" : "png"
    const size = Number(url.searchParams.get("size") || "256")

    const colorHashHsl = colorHash.hsl(id ?? "vamp")

    const [hue, saturation, luminosity] = colorHashHsl

    const baseColor = `hsl(${hue}, ${saturation}, ${luminosity})`

    // Calculate a brighter base color for background
    let newBrightness = luminosity + 5 / 100
    newBrightness = Math.max(0, Math.min(1, newBrightness))

    // Calculate a darker base color for background
    let newDarkness = luminosity - 5 / 100
    newDarkness = Math.max(0, Math.min(1, newDarkness))

    const lighterBase = `hsl(${hue}, ${saturation}, ${newBrightness})`
    const darkerBase = `hsl(${hue}, ${saturation}, ${newDarkness})`

    // Used for custom sizing
    const twoAndTwoThirds = 2 + 2 / 3
    const oneAndOneThird = 1 + 1 / 3

    const avatar = (
        <svg
            version="1.1"
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width={size} height={size} fill={baseColor} />
            <rect
                y="0"
                x="0"
                width={size / 8}
                height={size / 8}
                fill={lighterBase}
            />
            <rect
                y="0"
                x={size / twoAndTwoThirds}
                width={size / 8}
                height={size / 8}
                fill={lighterBase}
            />
            <rect
                y="0"
                x={size / oneAndOneThird}
                width={size / 8}
                height={size / 8}
                fill={lighterBase}
            />
            <rect
                y={size / 8}
                x={size / 1.14285714286}
                width={size / 8}
                height={size / 8}
                fill={lighterBase}
            />
            <rect
                y={size / 1.14285714286}
                x={size / twoAndTwoThirds}
                width={size / 8}
                height={size / 8}
                fill={darkerBase}
            />
            <rect
                y={size / 8}
                width={size / 8}
                height={size / 8}
                fill="#DBDEFF"
            />
            <rect
                y={size / 8}
                width={size / 8}
                height={size / 8}
                fill="#DBDEFF"
            />
            <rect
                x={size / 1.6}
                y={size / 4}
                width={size / 8}
                height={size / 8}
                fill="#DBDEFF"
            />
            <rect
                x={size / 1.6}
                y={size / twoAndTwoThirds}
                width={size / 8}
                height={size / 8}
                fill="#DBDEFF"
            />
            <rect
                x={size / 8}
                y={size / 1.3333333}
                width={size / 8}
                height={size / 8}
                fill="#DBDEFF"
            />
            <rect
                x={size / twoAndTwoThirds}
                y={size / oneAndOneThird}
                width={size / 8}
                height={size / 8}
                fill="#DBDEFF"
            />
            <rect
                x={size / oneAndOneThird}
                y={size / twoAndTwoThirds}
                width={size / 8}
                height={size / 8}
                fill="#C8CFFF"
            />
            <rect
                x={size / oneAndOneThird}
                y={size / 4}
                width={size / 8}
                height={size / 8}
                fill="#DBDEFF"
            />
            <rect
                x={size / oneAndOneThird}
                y={size / 8}
                width={size / 8}
                height={size / 8}
                fill="#DBDEFF"
            />
            <rect
                x={size / oneAndOneThird}
                y={size / 8}
                width={size / 8}
                height={size / 8}
                fill="#DBDEFF"
            />
            <rect
                x={size / 8}
                y={size / 4}
                width={size / 8}
                height={size / 8}
                fill="#010411"
            />
            <rect
                x={size / 8}
                y={size / twoAndTwoThirds}
                width={size / 8}
                height={size / 8}
                fill="#010411"
            />
            <rect
                x={size / 4}
                y={size / twoAndTwoThirds}
                width={size / 8}
                height={size / 8}
                fill="#010411"
            />
            <rect
                x={size / 4}
                y={size / 2}
                width={size / 8}
                height={size / 8}
                fill="#010411"
            />
            <rect
                x={size / 8}
                y={size / 1.6}
                width={size / 8}
                height={size / 8}
                fill="#010411"
            />
            <rect
                x={size / 4}
                y={size / 1.6}
                width={size / 8}
                height={size / 8}
                fill="#010411"
            />
            <rect
                x={size / twoAndTwoThirds}
                y={size / 1.6}
                width={size / 8}
                height={size / 8}
                fill="#010411"
            />
            <rect
                x={size / 2}
                y={size / 1.6}
                width={size / 8}
                height={size / 8}
                fill="#010411"
            />
            <rect
                x={size / 2}
                y={size / 2}
                width={size / 8}
                height={size / 8}
                fill="#010411"
            />
            <rect
                x={size / 1.6}
                y={size / 2}
                width={size / 8}
                height={size / 8}
                fill="#010411"
            />
            <rect
                x={size / 1.6}
                y={size / 1.6}
                width={size / 8}
                height={size / 8}
                fill="#010411"
            />
            <rect
                x={size / oneAndOneThird}
                y={size / 1.6}
                width={size / 8}
                height={size / 8}
                fill="#010411"
            />
            <rect
                x={size / 1.6}
                y={size / oneAndOneThird}
                width={size / 8}
                height={size / 8}
                fill="#010411"
            />
            <rect
                x={size / oneAndOneThird}
                y={size / oneAndOneThird}
                width={size / 8}
                height={size / 8}
                fill="#010411"
            />
            <rect
                x={size / 1.14285714286}
                y={size / oneAndOneThird}
                width={size / 8}
                height={size / 8}
                fill="#010411"
            />
            <rect
                x={size / 1.14285714286}
                y={size / 1.14285714286}
                width={size / 8}
                height={size / 8}
                fill="#010411"
            />
            <rect
                x={size / 2}
                y={size / 1.14285714286}
                width={size / 8}
                height={size / 8}
                fill="#010411"
            />
            <rect
                x={size / 1.6}
                y={size / 1.14285714286}
                width={size / 8}
                height={size / 8}
                fill="#010411"
            />
            <rect
                x={size / oneAndOneThird}
                y={size / 1.14285714286}
                width={size / 8}
                height={size / 8}
                fill="#010411"
            />
            <rect
                x={size / 2}
                y={size / oneAndOneThird}
                width={size / 8}
                height={size / 8}
                fill="#010411"
            />
            <rect
                x={size / 4}
                y={size / 4}
                width={size / 8}
                height={size / 8}
                fill="#010411"
            />
            <rect
                x={size / twoAndTwoThirds}
                y={size / 4}
                width={size / 8}
                height={size / 8}
                fill="#010411"
            />
            <rect
                x={size / 2}
                y={size / 4}
                width={size / 8}
                height={size / 8}
                fill="#010411"
            />
            <rect
                x={size / twoAndTwoThirds}
                y={size / twoAndTwoThirds}
                width={size / 8}
                height={size / 8}
                fill="#010411"
            />
            <rect
                x={size / 2}
                y={size / twoAndTwoThirds}
                width={size / 8}
                height={size / 8}
                fill="#010411"
            />
            <rect
                y={size / twoAndTwoThirds}
                width={size / 8}
                height={size / 8}
                fill="#DBDEFF"
            />
            <rect
                x={size / 8}
                y={size / 2}
                width={size / 8}
                height={size / 8}
                fill="#DBDEFF"
            />
            <rect
                x={size / twoAndTwoThirds}
                y={size / 2}
                width={size / 8}
                height={size / 8}
                fill="#DBDEFF"
            />
            <rect
                y={size / 4}
                width={size / 8}
                height={size / 8}
                fill="#C8CFFF"
            />
        </svg>
    )

    if (fileType === "svg") {
        const stream = await renderToReadableStream(avatar)
        return new Response(stream, {
            headers: {
                "Content-Type": "image/svg+xml",
                "Cache-Control": "public, max-age=604800, immutable",
            },
        })
    }

    return new ImageResponse(avatar, {
        width: size,
        height: size,
    })
}
