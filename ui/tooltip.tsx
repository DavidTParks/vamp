"use client"

import { ReactNode, useState } from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { AnimatePresence } from "framer-motion"
import useWindowSize from "@/hooks/use-window-size"
import Leaflet from "./leaflet"

export function Tooltip({
    children,
    content,
    fullWidth,
}: {
    children: ReactNode
    content: ReactNode | string
    fullWidth?: boolean
}) {
    const [openTooltip, setOpenTooltip] = useState(false)

    const { isMobile, isDesktop } = useWindowSize()

    return (
        <>
            {isMobile && (
                <button
                    type="button"
                    className={`${
                        fullWidth ? "w-full" : "inline-flex"
                    } sm:hidden`}
                    onClick={() => setOpenTooltip(true)}
                >
                    {children}
                </button>
            )}
            {openTooltip && isMobile && (
                <Leaflet setShow={setOpenTooltip}>
                    {typeof content === "string" ? (
                        <span className="flex min-h-[150px] w-full items-center justify-center bg-appbg px-10 text-center text-sm text-brandtext-500">
                            {content}
                        </span>
                    ) : (
                        content
                    )}
                </Leaflet>
            )}
            {isDesktop && (
                <TooltipPrimitive.Provider delayDuration={100}>
                    <TooltipPrimitive.Root>
                        <TooltipPrimitive.Trigger
                            className="hidden sm:inline-flex"
                            asChild
                        >
                            {children}
                        </TooltipPrimitive.Trigger>
                        <TooltipPrimitive.Content
                            sideOffset={4}
                            side="top"
                            className="z-30 hidden animate-slide-up-fade items-center overflow-hidden rounded-md border border-raised-border bg-appbg drop-shadow-lg sm:block"
                        >
                            <TooltipPrimitive.Arrow className="fill-current text-brandtext-500" />
                            {typeof content === "string" ? (
                                <div className="p-5">
                                    <span className="block max-w-xs text-center text-sm text-brandtext-500">
                                        {content}
                                    </span>
                                </div>
                            ) : (
                                content
                            )}
                            <TooltipPrimitive.Arrow className="fill-current text-white" />
                        </TooltipPrimitive.Content>
                    </TooltipPrimitive.Root>
                </TooltipPrimitive.Provider>
            )}
        </>
    )
}
