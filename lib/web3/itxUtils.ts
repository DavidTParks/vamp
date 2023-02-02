import { VGLD__factory } from "@/contracts/types"
import { ethers } from "ethers"
import { formatEther } from "ethers/lib/utils.js"

const VGLD_CONTRACT = "0x31539a675De86fd616403e6dad52539F8D5a8F8E"

export const itx = new ethers.providers.InfuraProvider(
    "goerli", // or 'goerli'
    "3964a09090a649239a4b2ff61128b8b0"
)

const PRIVATE_KEY = process.env.PRIVATE_KEY as string
export const signer = new ethers.Wallet(PRIVATE_KEY, itx)

export type TInfuraTransaction = {
    to: string
    data: string
    gas: string
    schedule: string
}

export async function getRelayBalance() {
    return await itx.send("relay_getBalance", [signer.address])
}

export async function deposit() {
    const tx = await signer.sendTransaction({
        // ITX deposit contract (same address for all public Ethereum networks)
        to: "0x015C7C7A7D65bbdb117C573007219107BD7486f9",
        // Choose how much ether you want to deposit to your ITX gas tank
        value: ethers.utils.parseUnits("0.1", "ether"),
    })
    // Waiting for the transaction to be mined
    await tx.wait()
}

export async function signRequest(tx: TInfuraTransaction) {
    const relayTransactionHash = ethers.utils.keccak256(
        ethers.utils.defaultAbiCoder.encode(
            ["address", "bytes", "uint", "uint", "string"],
            [tx.to, tx.data, tx.gas, 5, tx.schedule] // Goerli chainId is 5
        )
    )
    return await signer.signMessage(ethers.utils.arrayify(relayTransactionHash))
}

export async function mintVGLD() {
    const iface = new ethers.utils.Interface([
        "function mint(address to, uint256 amount)",
    ])
    const data = iface.encodeFunctionData("mint", [
        "0x02Ed30865C7e66cC6CeaeB9C3B6aA8643B98Ac9A",
        "1000000000000000000000",
    ])

    const tx = {
        to: "0x31539a675De86fd616403e6dad52539F8D5a8F8E",
        data: data,
        gas: "100001",
        schedule: "fast",
    }
    const signature = await signRequest(tx)

    const relayTransactionHash = await itx.send("relay_sendTransaction", [
        tx,
        signature,
    ])
    console.log(`ITX relay hash: ${relayTransactionHash}`)
    return relayTransactionHash
}

const wait = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export async function waitTransaction(relayTransactionHash: string) {
    let mined = false

    while (!mined) {
        const statusResponse = await itx.send("relay_getTransactionStatus", [
            relayTransactionHash,
        ])

        if (statusResponse.broadcasts) {
            for (let i = 0; i < statusResponse.broadcasts.length; i++) {
                const bc = statusResponse.broadcasts[i]
                const receipt = await itx.getTransactionReceipt(bc.ethTxHash)
                if (
                    receipt &&
                    receipt.confirmations &&
                    receipt.confirmations > 1
                ) {
                    mined = true
                    return receipt
                }
            }
        }
        await wait(1000)
    }
}

export async function getVGLDBalance(address: string) {
    const vgld = VGLD__factory.connect(VGLD_CONTRACT, signer)
    const balance = await vgld.balanceOf(address)
    return formatEther(balance?.toString())
}
