import { useQuery } from "@tanstack/react-query"

export default function useAuthSession() {
    const session = useQuery([`session`], async () => {
        return await fetch(`/api/auth/session`).then((res) => res.json())
    })

    return session
}
