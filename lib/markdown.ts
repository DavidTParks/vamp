export const getRenderedMarkdown = async (markdownBody: string, user: any) => {
    const baseUrl = "https://api.github.com/markdown"

    const body = {
        text: markdownBody,
    }

    return await fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
        },
    }).then((res) => res.text())
}
