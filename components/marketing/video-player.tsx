"use client"

import MuxPlayer from "@mux/mux-player-react"

export default function VideoPlayer() {
    return (
        <MuxPlayer
            style={{
                width: "100%",
            }}
            autoPlay
            muted
            loop
            streamType="on-demand"
            playbackId="SdcfSjNWbZRQknd01EXCtHua7gDEFz1Y1RHfWZR00SbKg"
        />
    )
}
