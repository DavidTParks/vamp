import Image from "next/image"

export function LogoCloud() {
    return (
        <div className="dropdown text-center">
            <p className="mt-8 text-2xl font-bold tracking-tight text-brandtext-500">
                Powered by the best tech on the web
            </p>
            <div className="mx-auto max-w-7xl py-12 px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
                    <div className="col-span-1 flex justify-center saturate-0 md:col-span-2 lg:col-span-1">
                        <Image
                            height={128}
                            width={128}
                            className="h-12 object-contain"
                            src="/_static/logos/trpc.svg"
                            alt="tRPC logo"
                        />
                    </div>
                    <div className="col-span-1 flex justify-center saturate-0 md:col-span-2 lg:col-span-1">
                        <Image
                            height={128}
                            width={128}
                            className="h-12 object-contain"
                            src="/_static/logos/next-dark.png"
                            alt="Nextjs logo"
                        />
                    </div>
                    <div className="col-span-1 flex justify-center saturate-0 md:col-span-2 lg:col-span-1">
                        <Image
                            height={128}
                            width={204}
                            className="h-12 object-contain"
                            src="/_static/logos/tailwind.svg"
                            alt="Tailwind logo"
                        />
                    </div>
                    <div className="col-span-1 flex justify-center md:col-span-3 lg:col-span-1">
                        <Image
                            height={128}
                            width={204}
                            className="h-12 object-contain"
                            src="/_static/logos/planetscale.png"
                            alt="PlanetScale logo"
                        />
                    </div>
                    <div className="col-span-2 flex justify-center  md:col-span-3 lg:col-span-1">
                        <Image
                            height={128}
                            width={128}
                            className="h-12 object-contain"
                            src="/_static/logos/stripe.png"
                            alt="Stripe logo"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
