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

export default function SubmissionAccepted({
    bountyId,
    bountyTitle,
}: {
    bountyId?: string
    bountyTitle: string
}) {
    return (
        <Mjml>
            <Head />
            <MjmlBody width={500}>
                <MjmlWrapper cssClass="container">
                    <Header title="Your solution has been accepted!" />
                    <MjmlSection cssClass="smooth">
                        <MjmlColumn>
                            <MjmlText cssClass="paragraph">
                                Your solution for{" "}
                                <a
                                    href={`https://vamp.sh/bounty/${bountyId}`}
                                    target="_blank"
                                >
                                    {bountyTitle}
                                </a>{" "}
                                has been accepted!
                            </MjmlText>
                            <MjmlText cssClass="paragraph">
                                What happens now?
                            </MjmlText>
                            <MjmlText cssClass="paragraph">
                                The Project owner has paid out your bounty
                                solution. You will be paid out via Stripe on a
                                rolling daily basis. Payouts are delayed by 2
                                days after the bounty resolution payment.
                            </MjmlText>
                            <MjmlText cssClass="paragraph">
                                Congrats! Keep it going and{" "}
                                <a
                                    href={`https://vamp.sh/browse`}
                                    target="_blank"
                                >
                                    see what else you can achieve
                                </a>{" "}
                                with some open Bounties.
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
