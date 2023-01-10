import { MjmlColumn, MjmlImage, MjmlSection, MjmlText } from "mjml-react"

export default function Header({ title }: { title: string }): JSX.Element {
    return (
        <MjmlSection>
            <MjmlColumn>
                <MjmlImage
                    padding="12px 0 24px"
                    width="44px"
                    height="44px"
                    align="center"
                    src="https://jpxwqgklwwytoznbpbmn.supabase.co/storage/v1/object/public/vamp/vamp-logo-dark%20(1).png"
                    cssClass="logo"
                />
                <MjmlText cssClass="title" align="center">
                    {title}
                </MjmlText>
            </MjmlColumn>
        </MjmlSection>
    )
}
