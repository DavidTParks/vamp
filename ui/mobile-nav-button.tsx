"use client"

import { useSelectedLayoutSegment } from "next/navigation"
import * as React from "react"

import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"
import { mobileNavConfig } from "@/config/site"
import { Button } from "@/ui/button"

export function MobileNavButton() {
    const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

    return (
        <>
            <Button
                intent="tertiary"
                size="small"
                className="flex items-center space-x-2 md:hidden px-2"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
                {showMobileMenu ? (
                    <Icons.close />
                ) : (
                    <Icons.menu size={24} color="white" />
                )}
            </Button>
            {showMobileMenu && <MobileNav items={mobileNavConfig.mainNav} />}
        </>
    )
}
