"use client"

import { useQuery } from "@tanstack/react-query"

const fetchNonce = async () => {
    return await fetch(`/api/nonce`).then((res) => res.text())
}

export function useFetchNonce() {
    const nonceQuery = useQuery({
        queryKey: ["nonce"],
        queryFn: fetchNonce,
        refetchInterval: 0,
    })

    return nonceQuery
}
