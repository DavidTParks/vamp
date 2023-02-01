import { DashboardShell } from "@/components/dashboard/shell"
import { AddWalletForm } from "@/components/dashboard/settings/wallet/add-wallet-form"
import { notFound } from "next/navigation"
import { getCurrentUser } from "@/lib/session"
import { db } from "@/lib/db"
import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"
import { WalletOperations } from "@/components/dashboard/settings/wallet/wallet-operations"

export default async function NotificationsPage() {
    const user = await getCurrentUser()

    if (!user) {
        return notFound()
    }

    const dbUser = await db.user.findUnique({
        where: {
            id: user.id,
        },
        include: {
            wallets: true,
        },
    })

    if (!dbUser) return null

    return (
        <DashboardShell>
            <div>
                <AddWalletForm
                    user={{
                        id: dbUser.id,
                    }}
                />
                <div className="mt-12 sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h3 className="text-xl font-semibold text-brandtext-500">
                            Wallets
                        </h3>
                        <p className="mt-2 text-sm text-brandtext-600">
                            You can add up to 10 wallets to your account. Set a
                            default wallet to be used to receive ERC-20 utility
                            token rewards for platform activity.
                        </p>
                        {dbUser.wallets?.length ? (
                            <div className="mt-4 flex flex-col">
                                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className=" min-w-full py-2 align-middle md:px-6 lg:px-8">
                                        <div className="overflow-hidden shadow ring-1 ring-raised ring-opacity-5 md:rounded-lg">
                                            <table className="min-w-full divide-y divide-raised-border">
                                                <thead className="bg-raised">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-brandtext-500 sm:pl-6"
                                                        >
                                                            Default
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-brandtext-500"
                                                        >
                                                            Wallet
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-brandtext-500"
                                                        ></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-raised-border bg-raised">
                                                    {dbUser?.wallets?.map(
                                                        (wallet) => (
                                                            <tr key={wallet.id}>
                                                                <td className="inline-flex items-center gap-2 whitespace-nowrap py-3 pl-4 pr-3 text-sm text-brandtext-600 sm:pl-6">
                                                                    {wallet.default
                                                                        ? "True"
                                                                        : "False"}
                                                                </td>
                                                                <td className="whitespace-nowrap px-2 py-3 text-sm font-medium text-brandtext-600">
                                                                    {
                                                                        wallet.address
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <WalletOperations
                                                                        user={{
                                                                            id: user.id,
                                                                        }}
                                                                        userWallet={{
                                                                            id: wallet.id,
                                                                            default:
                                                                                wallet.default,
                                                                        }}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <EmptyPlaceholder className="mt-4 min-h-[200px]">
                                    <EmptyPlaceholder.Icon name="eth" />
                                    <EmptyPlaceholder.Title>
                                        No wallets added
                                    </EmptyPlaceholder.Title>
                                    <EmptyPlaceholder.Description className="mb-0">
                                        There are no wallets associated with
                                        this account.
                                    </EmptyPlaceholder.Description>
                                </EmptyPlaceholder>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </DashboardShell>
    )
}
