import { Icons } from "@/components/icons"
import { Button } from "@/ui/button"
export default async function IndexPage() {
    return (
        <>
            <div className="mx-auto mt-32 mb-10 max-w-md px-2.5 text-center sm:max-w-lg sm:px-0">
                <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.15] text-white sm:text-7xl sm:leading-[1.15]">
                    Contribute to Open Source
                    <br />
                    <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent red-glow">
                        Get Paid
                    </span>
                </h1>
                <h2 className="mt-5 text-lg text-slate-400 sm:text-xl">
                    Vamp is an open-source platform for projects to post issue
                    bounties and feature requests for money, and for open-source
                    contributors to feed on them.
                </h2>
                <div className="mx-auto mt-10 flex max-w-fit space-x-4">
                    <Button href="/register">Start For Free</Button>
                    <Button
                        intent="secondary"
                        href="https://dub.sh/github"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <p className="text-sm mr-2">Star on GitHub</p>
                        <Icons.star size={12} />
                    </Button>
                </div>
            </div>
        </>
    )
}
