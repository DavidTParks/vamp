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
            playbackId="1gNOGV02e5orWZYplavv008hEfg00VMwSzVYo7rHVjxtx8"
        />
    )
}
