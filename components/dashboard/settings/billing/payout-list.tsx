import { getCurrentUser } from "@/lib/session"
import { getStripePayouts } from "@/lib/stripe"
import { formatDate, formatDollars } from "@/lib/utils"
import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"

export async function PayoutList() {
    const user = await getCurrentUser()

    if (!user) {
        return null
    }

    const { data } = await getStripePayouts(user.id)

    return (
        <div>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-brandtext-500">
                        Payouts
                    </h1>
                    <p className="mt-2 text-sm text-brandtext-600">
                        Track money moving from Stripe into your bank account
                    </p>
                </div>
            </div>
            {data?.length ? (
                <div className="mt-4 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full divide-y divide-raised-border">
                                    <thead className="bg-raised">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-brandtext-500 sm:pl-6"
                                            >
                                                Amount
                                            </th>
                                            <th
                                                scope="col"
                                                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-brandtext-500"
                                            >
                                                Description
                                            </th>
                                            <th
                                                scope="col"
                                                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-brandtext-500"
                                            >
                                                Initiated
                                            </th>
                                            <th
                                                scope="col"
                                                className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-brandtext-500"
                                            >
                                                Est. Arrival
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-raised-border bg-raised">
                                        {data.map((transaction) => (
                                            <tr key={transaction.id}>
                                                <td className="inline-flex items-center gap-2 whitespace-nowrap py-2 pl-4 pr-3 text-sm text-brandtext-600 sm:pl-6">
                                                    <span className="font-mono">
                                                        {formatDollars(
                                                            transaction.amount /
                                                                100
                                                        )}{" "}
                                                        USD
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-brandtext-600">
                                                    {transaction.description}
                                                </td>
                                                <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-brandtext-600">
                                                    {formatDate(
                                                        transaction.created *
                                                            1000
                                                    )}
                                                </td>
                                                <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-brandtext-600">
                                                    {formatDate(
                                                        transaction.arrival_date *
                                                            1000
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <EmptyPlaceholder className="mt-4 min-h-[200px]">
                        <EmptyPlaceholder.Icon name="arrowUpDown" />
                        <EmptyPlaceholder.Title>
                            No payouts
                        </EmptyPlaceholder.Title>
                        <EmptyPlaceholder.Description className="mb-0">
                            There are no payouts associated with this account.
                        </EmptyPlaceholder.Description>
                    </EmptyPlaceholder>
                </>
            )}
        </div>
    )
}
