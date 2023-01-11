import { ImageResponse } from "@vercel/og"
import { NextRequest } from "next/server"
import ColorHash from "color-hash"

// Inspired by https://deslucrece.com/ amazing artwork! Give his stuff a look.

export const config = {
    runtime: "edge",
    externalResolver: true,
}

const colorHash = new ColorHash()

export default async function handler(req: NextRequest) {
    const { searchParams } = new URL(req.url)

    const hasSeed = searchParams.has("seed")
    const seed = hasSeed ? searchParams.get("seed") : "vamp"

    const colorHashHsl = colorHash.hsl(seed ?? "vamp")

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

    return new ImageResponse(
        (
            <svg
                width="256"
                height="256"
                viewBox="0 0 256 256"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect width="256" height="256" fill={baseColor} />
                <rect y="0" x="0" width="32" height="32" fill={lighterBase} />
                <rect y="0" x="96" width="32" height="32" fill={lighterBase} />
                <rect y="0" x="192" width="32" height="32" fill={lighterBase} />
                <rect
                    y="32"
                    x="224"
                    width="32"
                    height="32"
                    fill={lighterBase}
                />
                <rect y="224" x="96" width="32" height="32" fill={darkerBase} />
                <rect y="32" width="32" height="32" fill="#DBDEFF" />
                <rect y="32" width="32" height="32" fill="#DBDEFF" />
                <rect x="160" y="64" width="32" height="32" fill="#DBDEFF" />
                <rect x="160" y="96" width="32" height="32" fill="#DBDEFF" />
                <rect x="32" y="192" width="32" height="32" fill="#DBDEFF" />
                <rect x="96" y="192" width="32" height="32" fill="#DBDEFF" />
                <rect x="192" y="96" width="32" height="32" fill="#C8CFFF" />
                <rect x="192" y="64" width="32" height="32" fill="#DBDEFF" />
                <rect x="192" y="32" width="32" height="32" fill="#DBDEFF" />
                <rect x="192" y="32" width="32" height="32" fill="#DBDEFF" />
                <rect x="32" y="64" width="32" height="32" fill="#010411" />
                <rect x="32" y="96" width="32" height="32" fill="#010411" />
                <rect x="64" y="96" width="32" height="32" fill="#010411" />
                <rect x="64" y="128" width="32" height="32" fill="#010411" />
                <rect x="32" y="160" width="32" height="32" fill="#010411" />
                <rect x="64" y="160" width="32" height="32" fill="#010411" />
                <rect x="96" y="160" width="32" height="32" fill="#010411" />
                <rect x="128" y="160" width="32" height="32" fill="#010411" />
                <rect x="128" y="128" width="32" height="32" fill="#010411" />
                <rect x="160" y="128" width="32" height="32" fill="#010411" />
                <rect x="160" y="160" width="32" height="32" fill="#010411" />
                <rect x="192" y="160" width="32" height="32" fill="#010411" />
                <rect x="160" y="192" width="32" height="32" fill="#010411" />
                <rect x="192" y="192" width="32" height="32" fill="#010411" />
                <rect x="224" y="192" width="32" height="32" fill="#010411" />
                <rect x="224" y="224" width="32" height="32" fill="#010411" />
                <rect x="128" y="224" width="32" height="32" fill="#010411" />
                <rect x="160" y="224" width="32" height="32" fill="#010411" />
                <rect x="192" y="224" width="32" height="32" fill="#010411" />
                <rect x="128" y="192" width="32" height="32" fill="#010411" />
                <rect x="64" y="64" width="32" height="32" fill="#010411" />
                <rect x="96" y="64" width="32" height="32" fill="#010411" />
                <rect x="128" y="64" width="32" height="32" fill="#010411" />
                <rect x="96" y="96" width="32" height="32" fill="#010411" />
                <rect x="128" y="96" width="32" height="32" fill="#010411" />
                <rect y="96" width="32" height="32" fill="#DBDEFF" />
                <rect x="32" y="128" width="32" height="32" fill="#DBDEFF" />
                <rect x="96" y="128" width="32" height="32" fill="#DBDEFF" />
                <rect y="64" width="32" height="32" fill="#C8CFFF" />
            </svg>
        ),
        {
            width: 256,
            height: 256,
        }
    )
}
