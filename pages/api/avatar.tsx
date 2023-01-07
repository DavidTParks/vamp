import { ImageResponse } from "@vercel/og"
import { NextRequest } from "next/server"

export const config = {
    runtime: "edge",
    externalResolver: true,
}

const stringToColour = function (str: string) {
    var hash = 0
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    var colour = "#"
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xff
        colour += ("00" + value.toString(16)).substr(-2)
    }
    return colour
}

export default async function handler(req: NextRequest) {
    const { searchParams } = new URL(req.url)

    const hasSeed = searchParams.has("seed")
    const seed = hasSeed ? searchParams.get("seed") : "vamp"

    return new ImageResponse(
        (
            <svg
                width="256"
                height="256"
                viewBox="0 0 256 256"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    width="256"
                    height="256"
                    fill={stringToColour(seed ?? "vamp")}
                />
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
