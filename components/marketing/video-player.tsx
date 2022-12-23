"use client"

import { useRef, useEffect } from "react"

export default function VideoPlayer() {
    const videoRef = useRef(null)

    useEffect(() => {
        if (videoRef && videoRef.current) {
            videoRef.current.play()
        }
    }, [videoRef])

    return (
        <video
            src="/videos/vamp-demo.mp4"
            playsInline
            loop
            muted
            ref={videoRef}
        />
    )
}
