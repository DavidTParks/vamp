import {
    Mjml,
    MjmlBody,
    MjmlColumn,
    MjmlImage,
    MjmlSection,
    MjmlText,
    MjmlWrapper,
} from "mjml-react"
import Divider from "./components/Divider"
import Footer from "./components/Footer"
import Head from "./components/Head"
import Header from "./components/Header"
import { grayDark } from "./components/theme"

export default function SubmissionReceived({
    bountyId,
    bountyTitle,
    projectName,
}: {
    bountyId?: string
    bountyTitle: string
    projectName: string
}) {
    return (
        <Mjml>
            <Head />
            <MjmlBody width={500}>
                <MjmlWrapper cssClass="container">
                    <Header title="You've got a submission" />
                    <MjmlSection cssClass="smooth">
                        <MjmlColumn>
                            <MjmlText cssClass="paragraph">
                                You've received a new submission on{" "}
                                <a
                                    href={`https://vamp.sh/bounty/${bountyId}`}
                                    target="_blank"
                                >
                                    {bountyTitle}
                                </a>{" "}
                                for your project {projectName}.
                            </MjmlText>
                            <MjmlText cssClass="paragraph">
                                If it looks good, be sure to accept the
                                submission and pay the contributor! Thanks for
                                making open-source a better, more rewarding
                                place.
                            </MjmlText>
                            <MjmlText cssClass="paragraph" color={grayDark}>
                                David from Vamp
                            </MjmlText>
                            <Divider />
                        </MjmlColumn>
                    </MjmlSection>
                    <Footer unsubscribe />
                </MjmlWrapper>
            </MjmlBody>
        </Mjml>
    )
}
