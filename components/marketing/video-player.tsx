"use client"

import MuxPlayer from "@mux/mux-player-react/lazy"

export default function VideoPlayer() {
    return (
        <MuxPlayer
            autoPlay
            muted
            loop
            streamType="on-demand"
            playbackId="SdcfSjNWbZRQknd01EXCtHua7gDEFz1Y1RHfWZR00SbKg"
        />
    )
}
