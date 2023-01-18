import { TStripeBalance, TStripeDetails, TStripePayouts } from "@/lib/stripe"
import { Stripe } from "stripe"
import { formatDollars } from "@/lib/utils"

interface TStats {
    balance: Stripe.Balance
    payouts: Stripe.ApiList<Stripe.Payout>
}

export default function Stats({ balance, payouts }: TStats) {
    const totalPaidOut = payouts.data.reduce((accumulator, payout) => {
        return accumulator + payout.amount
    }, 0)
    const stats = [
        {
            name: "Available balance",
            stat: (balance.available[0].amount / 100).toFixed(2),
        },
        {
            name: "Pending balance",
            stat: (balance.pending[0].amount / 100).toFixed(2),
        },
        { name: "Total paid out", stat: totalPaidOut / 100 },
    ]

    return (
        <div>
            <h3 className="text-lg font-medium leading-6 text-brandtext-500">
                Payout info
            </h3>
            <p className="mt-2 text-sm text-brandtext-600">
                Payments are collected in your Stripe account balance and paid
                out on a daily rolling basis.
            </p>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {stats.map((item) => (
                    <div
                        key={item.name}
                        className="overflow-hidden rounded-lg border-raised bg-palette-400 px-4 py-5 shadow sm:p-6"
                    >
                        <dt className="truncate text-sm font-medium text-brandtext-400">
                            {item.name}
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">
                            {formatDollars(parseFloat(item.stat.toString()))}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}
