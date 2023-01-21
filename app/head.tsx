import DefaultTags from "@/app/DefaultTags"

export default function Head() {
    return (
        <>
            <title>Vamp | Open Source Bounties</title>
            <DefaultTags />
            <meta
                name="description"
                content="Vamp is an open-source bounty platform designed to empower project maintainers, and the contributors that make them great."
            />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Vamp | Open Source Bounties" />
            <meta
                property="og:description"
                content="Vamp is an open-source bounty platform designed to empower project maintainers, and the contributors that make them great."
            />
            <meta
                property="og:image"
                content="https://jpxwqgklwwytoznbpbmn.supabase.co/storage/v1/object/public/vamp/vamp-og.png"
            />
            <meta name="twitter:title" content="Vamp | Open Source Bounties" />
            <meta
                name="twitter:description"
                content="Vamp is an open-source bounty platform designed to empower project maintainers, and the contributors that make them great."
            />
            <meta name="twitter:card" content="summary_large_image" />
            <meta
                name="twitter:image"
                content="https://jpxwqgklwwytoznbpbmn.supabase.co/storage/v1/object/public/vamp/vamp-og.png"
            />
        </>
    )
}
