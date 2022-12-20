import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"
import { getCurrentUser } from "@/lib/session"
import { Button } from "@/ui/button"

import Link from "next/link"

export async function BountyEmptyPlaceholder() {
    const user = await getCurrentUser()

    return (
        <>
            <EmptyPlaceholder>
                <EmptyPlaceholder.Icon name="logo" />
                <EmptyPlaceholder.Title>No Bounties</EmptyPlaceholder.Title>
                <EmptyPlaceholder.Description>
                    No bounties match your search query, or are open right now.
                    Be the first to post!
                </EmptyPlaceholder.Description>
                {user ? (
                    <Link href={`/dashboard`}>
                        <Button>New Bounty</Button>
                    </Link>
                ) : (
                    <Link href={`/login`}>
                        <Button>Login to post</Button>
                    </Link>
                )}
            </EmptyPlaceholder>
        </>
    )
}
