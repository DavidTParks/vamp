import { VGLD__factory } from "@/contracts/types"
import { ethers } from "ethers"
import { formatEther } from "ethers/lib/utils.js"
import { Forwarder__factory } from "@/contracts/types"

const VGLD_CONTRACT = "0x31539a675De86fd616403e6dad52539F8D5a8F8E"
const FORWARDER_CONTRACT = "0x1E95F2b4739e6BB7376Ac584748EB4984C7665B0"

const ForwardRequest = [
    { name: "from", type: "address" },
    { name: "to", type: "address" },
    { name: "value", type: "uint256" },
    { name: "gas", type: "uint256" },
    { name: "nonce", type: "uint256" },
    { name: "data", type: "bytes" },
]

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

export async function mintVGLD() {
    const iface = new ethers.utils.Interface([
        "function mint(address to, uint256 amount)",
    ])
    const data = iface.encodeFunctionData("mint", [
        "0x02Ed30865C7e66cC6CeaeB9C3B6aA8643B98Ac9A",
        "1000000000000000000000",
    ])

    const tx = {
        to: "0x5923b451c5a61097B9Ad89dE2C409d50c3feF7Ac",
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

export async function getVGLDBalance(address: string) {
    const vgld = VGLD__factory.connect(VGLD_CONTRACT, signer)
    const balance = await vgld.balanceOf(address)
    return formatEther(balance?.toString())
}

export async function mintVgldWithForwarder() {
    const forwarder = Forwarder__factory.connect(FORWARDER_CONTRACT, signer)

    const iface = new ethers.utils.Interface([
        "function mint(address to, uint256 amount)",
    ])
    const data = iface.encodeFunctionData("mint", [
        "0x02Ed30865C7e66cC6CeaeB9C3B6aA8643B98Ac9A",
        "1000000000000000000001",
    ])

    const nonce = await forwarder
        .getNonce("0x02Ed30865C7e66cC6CeaeB9C3B6aA8643B98Ac9A")
        .then((nonce) => nonce.toString())

    const mintRequest = {
        from: "0x02Ed30865C7e66cC6CeaeB9C3B6aA8643B98Ac9A",
        to: "0x5923b451c5a61097B9Ad89dE2C409d50c3feF7Ac",
        data,
    }

    const domain = {
        name: "VGLD_Forwarder_Polygon",
        version: "1.0.0",
        chainId: 5,
        verifyingContract: "0x1E95F2b4739e6BB7376Ac584748EB4984C7665B0",
    }

    const forwardData = {
        ...mintRequest,
        gas: "100000000",
        nonce,
        value: "0",
    }

    const types = {
        ForwardRequest,
    }

    const typedSignature = await signer._signTypedData(
        domain,
        types,
        forwardData
    )

    const executeData = forwarder.interface.encodeFunctionData("execute", [
        forwardData,
        typedSignature,
    ])

    const forwardRequest = {
        gas: "100002",
        from: "0x02Ed30865C7e66cC6CeaeB9C3B6aA8643B98Ac9A",
        to: "0x1E95F2b4739e6BB7376Ac584748EB4984C7665B0",
        data: executeData,
        schedule: "fast",
        nonce,
    }

    const signature = await signRequest(forwardRequest)

    const relayTransactionHash = await itx.send("relay_sendTransaction", [
        forwardRequest,
        signature,
    ])
    console.log(`ITX relay hash: ${relayTransactionHash}`)
    return relayTransactionHash
}
