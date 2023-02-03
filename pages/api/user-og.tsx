import { ImageResponse } from "@vercel/og"
import { NextRequest } from "next/server"
import { z } from "zod"

export const config = {
    runtime: "edge",
}

const userOgImageSchema = z.object({
    blood: z.string(),
    gold: z.string(),
    userId: z.string().cuid(),
    githubUsername: z.string(),
    heading: z.string(),
})

const interRegular = fetch(
    new URL("../../assets/fonts/Inter-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

const interBold = fetch(
    new URL("../../assets/fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

export default async function handler(req: NextRequest) {
    try {
        const fontRegular = await interRegular
        const fontBold = await interBold

        const url = new URL(req.url)

        const values = userOgImageSchema.parse(
            Object.fromEntries(url.searchParams)
        )

        const heading =
            values.heading.length > 140
                ? `${values.heading.substring(0, 120)}...`
                : values.heading

        const paint = "#eaebfc"

        const fontSize = heading.length > 100 ? "70px" : "70px"

        return new ImageResponse(
            (
                <div
                    tw="flex relative flex-col p-12 w-full h-full items-start"
                    style={{
                        color: paint,
                        background: "#14141b",
                    }}
                >
                    <div tw="flex flex-1 py-10">
                        <div tw="rounded-full overflow-hidden flex items-center justify-center border border-zinc-700/50 bg-zinc-800 shadow-md  shadow-zinc-800/5 ring-0 ring-zinc-900/5 h-64 w-64 relative">
                            <div tw="rounded-full overflow-hidden flex items-center justify-center">
                                <img
                                    height={224}
                                    width={224}
                                    src={`https://www.vamp.sh/api/avatar/${values.userId}`}
                                />
                            </div>
                        </div>
                        <div tw="flex flex-col items-start pl-16">
                            <div
                                tw="flex leading-[1.1] text-[80px] font-bold tracking-tighter text-[#eaebfc] mt-8 "
                                style={{
                                    fontFamily: "Inter",
                                    fontWeight: "bolder",
                                    marginLeft: "-3px",
                                    fontSize,
                                }}
                            >
                                {heading}
                            </div>
                            <div tw="flex w-full items-center gap-2 text-sm font-medium text-[#a6aec7] text-3xl mt-4">
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 48 48"
                                    fill="none"
                                >
                                    <path
                                        d="M30 44v-8a9.6 9.6 0 0 0-2-7c6 0 12-4 12-11 .16-2.5-.54-4.96-2-7 .56-2.3.56-4.7 0-7 0 0-2 0-6 3-5.28-1-10.72-1-16 0-4-3-6-3-6-3-.6 2.3-.6 4.7 0 7a10.806 10.806 0 0 0-2 7c0 7 6 11 12 11a9.43 9.43 0 0 0-1.7 3.3c-.34 1.2-.44 2.46-.3 3.7v8"
                                        stroke={"#a6aec7"}
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M18 36c-9.02 4-10-4-14-4"
                                        stroke={"#a6aec7"}
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                                <span tw="ml-2">{values.githubUsername}</span>
                            </div>
                            <div tw="flex items-center mt-10">
                                <div tw="flex items-center">
                                    <div
                                        tw="flex leading-[1.1] font-bold tracking-tighter text-[#eaebfc] mr-2"
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: "bolder",
                                            fontSize: "32px",
                                        }}
                                    >
                                        {values.blood}
                                    </div>
                                    <img
                                        height={48}
                                        width={48}
                                        src="https://jpxwqgklwwytoznbpbmn.supabase.co/storage/v1/object/public/vamp/achievements/blood.png"
                                    />
                                </div>
                                <div tw="flex items-center ml-8">
                                    <div
                                        tw="flex leading-[1.1] font-bold tracking-tighter text-[#eaebfc] mr-2"
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: "bolder",
                                            fontSize: "32px",
                                        }}
                                    >
                                        {Math.floor(
                                            parseFloat(values.gold)
                                        ).toLocaleString()}
                                    </div>
                                    <img
                                        height={48}
                                        width={48}
                                        src="https://jpxwqgklwwytoznbpbmn.supabase.co/storage/v1/object/public/vamp/achievements/coin.png"
                                    />
                                </div>
                                <div tw="flex items-center ml-8">
                                    <div
                                        tw="flex leading-[1.1] font-bold tracking-tighter text-[#eaebfc] mr-2"
                                        style={{
                                            fontFamily: "Inter",
                                            fontWeight: "bolder",
                                            fontSize: "32px",
                                        }}
                                    >
                                        {(
                                            (parseFloat(values.gold) % 1) *
                                            100
                                        ).toLocaleString()}
                                    </div>
                                    <img
                                        height={48}
                                        width={48}
                                        src="https://jpxwqgklwwytoznbpbmn.supabase.co/storage/v1/object/public/vamp/achievements/silver-coin.png"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div tw="flex items-center w-full justify-between">
                        <div
                            tw="flex text-4xl items-center"
                            style={{
                                fontFamily: "Inter",
                                fontWeight: "normal",
                            }}
                        >
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 512 512"
                                color="white"
                                height="48"
                                width="48"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M196.14 78.192c-11.98 26.54-14.398 45.97-11.355 59.664 3.357 15.106 12.85 24.708 27.24 31.903l11.168 5.583-8.83 8.828c-.94.942-2.235 4.514-1.224 10.9 1.01 6.39 4.1 14.61 8.626 22.335 5.75 9.82 13.835 18.326 21.62 23.235L256 221.77l12.52 18.926c7.814-4.9 15.94-13.433 21.714-23.29 4.526-7.727 7.617-15.947 8.627-22.335 1.012-6.386-.282-9.958-1.223-10.9l-8.83-8.827 11.168-5.584c14.39-7.196 23.883-16.798 27.24-31.904 3.043-13.694.626-33.125-11.354-59.664-25.09 13.792-37.177 28.03-51.32 70.46L256 174.27l-8.54-25.617c-14.143-42.43-26.23-56.67-51.32-70.46zM96 97.808c-3.376 19.912-5.288 41.53 10.314 58.623C53.46 233.354 16 377.273 16 433.81c5.024-10.05 13.206-23.25 23.055-35.647 1.14-66.82 33.374-161.227 81.228-240.983l4.63-7.717 7.718 4.63c20.08 12.047 41.164 20.96 62.73 26.745-7.74-5.074-14.54-11.42-19.673-19.15-17.93-7.796-34.227-18.417-47.687-31.877-18.968-1.448-25.344-16.872-32-32zm320 0c-6.656 15.128-13.032 30.552-32 32-13.46 13.46-29.756 24.08-47.688 31.877-5.133 7.73-11.93 14.076-19.673 19.15 21.566-5.785 42.65-14.698 62.73-26.744l7.718-4.63 4.63 7.717c47.853 79.756 80.088 174.163 81.227 240.984 9.85 12.397 18.03 25.6 23.055 35.648 0-56.536-37.46-200.455-90.314-277.377 15.602-17.093 13.69-38.71 10.314-58.622zm-192 80c11.588 8.65 18.698 11.698 32 16 13.302-4.302 20.412-7.35 32-16 2.458 4.566 0 16 0 16-11.948 5.447-21.853 2.208-32 0-10.147 2.208-20.052 5.447-32 0 0 0-2.458-11.434 0-16zm-71.854 6.525c1.817 4.383 3.522 9.017 5.143 13.88 5.98 17.942 10.558 38.886 13.62 60.32 5.243 36.7 6.394 74.3.945 101.388 8.74-.234 17.477 2.767 26.21 8.274L166.41 392.56l20.268-4.795-8.55 33.595L208 403.77l1.057 20.8 13.615-34.794c.632.695 1.264 1.432 1.896 2.145-4.088-5.556-7.65-12.068-10.78-19.37-9.34-21.792-14.788-50.772-14.788-82.742 0-22.842 2.793-44.14 7.787-62.397-.18-.302-.375-.603-.553-.907-5.21-8.898-9-18.256-10.636-27.26-14.738-3.625-29.273-8.592-43.452-14.91zm207.708 0c-14.18 6.318-28.714 11.285-43.452 14.91-1.637 9.004-5.425 18.362-10.636 27.26-.178.304-.372.605-.553.908C310.207 245.67 313 266.967 313 289.81c0 31.97-5.448 60.95-14.787 82.742-2.734 6.378-5.807 12.136-9.262 17.2.085-.095.17-.198.253-.292l13.74 35.11L304 403.772l29.87 17.59-8.548-33.595 20.268 4.795-32.195-24.782c8.94-5.75 17.842-8.698 26.73-7.957-5.425-27.08-4.27-64.633.965-101.286 3.062-21.435 7.64-42.38 13.62-60.322 1.622-4.862 3.327-9.496 5.144-13.88zm-227.268.64c-12.714 64.79-23.21 127.977-15.46 180.256 12.15-9.62 24.292-10.477 36.362-5.83 4.968-22.784 4.842-61.64-.398-98.32-2.938-20.563-7.36-40.62-12.88-57.177-2.344-7.035-4.942-13.425-7.624-18.93zm246.828 0c-2.682 5.505-5.28 11.895-7.625 18.93-5.52 16.557-9.942 36.614-12.88 57.178-5.19 36.34-5.364 74.816-.537 97.683 12.897-3.96 24.765-2.81 36.5 6.468 7.75-52.28-2.745-115.467-15.46-180.256zm-271.6 33.74c-26.35 55.316-44.32 113.17-49.365 158.712 13.07-11.5 27.16-18.727 39.995-15.59-5.553-44.21.388-93.13 9.368-143.123zm296.374 0c8.98 49.993 14.92 98.912 9.367 143.122 12.835-3.137 26.925 4.09 39.996 15.59-5.044-45.542-23.014-103.396-49.363-158.713zm-183.22 27.466c-2.517 13.256-3.968 28.045-3.968 43.628 0 6.126.233 12.123.656 17.963 1.642 22.645 6.29 42.786 12.676 57.688 4.017 9.372 8.73 16.627 13.307 21.143 4.575 4.517 8.57 6.208 12.36 6.208 3.79 0 7.785-1.69 12.36-6.207 4.577-4.515 9.29-11.77 13.308-21.142 6.386-14.902 11.034-35.043 12.676-57.687.423-5.84.656-11.836.656-17.962 0-15.583-1.45-30.372-3.97-43.63-9.624 9.87-21.444 16.92-35.03 16.92-13.586 0-25.406-7.05-35.03-16.92zm9.805 153.007c8.413 10.265 16.82 22.012 25.227 34.62 8.136-12.204 16.2-23.596 24.207-33.636-6.772 6.394-15.1 10.638-24.207 10.638-9.465 0-18.096-4.578-25.006-11.397-.074-.072-.147-.15-.22-.223z"></path>
                            </svg>
                            <span tw="ml-2 font-bold">Vamp</span>
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: "Inter",
                        data: fontRegular,
                        weight: 400,
                        style: "normal",
                    },
                    {
                        name: "Inter",
                        data: fontBold,
                        weight: 700,
                        style: "normal",
                    },
                ],
            }
        )
    } catch (error) {
        return new Response(`Failed to generate image`, {
            status: 500,
        })
    }
}