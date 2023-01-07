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

export default function WelcomeEmail({ name }: { name?: string }) {
    return (
        <Mjml>
            <Head />
            <MjmlBody width={500}>
                <MjmlWrapper cssClass="container">
                    <Header title="Welcome to Vamp" />
                    <MjmlSection cssClass="smooth">
                        <MjmlColumn>
                            <MjmlText cssClass="paragraph">
                                Thanks for signing up{name && `, ${name}`}!
                            </MjmlText>
                            <MjmlText cssClass="paragraph">
                                My name is David, and I'm the creator of Vamp -
                                the open-source, open-source bounty platform.
                                I'm excited to have you on board!
                            </MjmlText>
                            <MjmlText cssClass="paragraph">
                                Here are a few things you can do:
                            </MjmlText>
                            <MjmlText cssClass="li">
                                •&nbsp;&nbsp;Create a project and{" "}
                                <a
                                    href="https://vamp.sh/dashboard"
                                    target="_blank"
                                >
                                    link a Github repository
                                </a>
                            </MjmlText>
                            <MjmlText cssClass="li">
                                •&nbsp;&nbsp;Reference open Github issues in a
                                new bounty
                            </MjmlText>
                            <MjmlText cssClass="li">
                                •&nbsp;&nbsp;Star the repo on{" "}
                                <a
                                    href="https://github.com/DavidTParks/vamp"
                                    target="_blank"
                                >
                                    GitHub
                                </a>
                            </MjmlText>
                            <MjmlText cssClass="li">
                                •&nbsp;&nbsp;Follow us on{" "}
                                <a
                                    href="https://twitter.com/vampdotsh/"
                                    target="_blank"
                                >
                                    Twitter
                                </a>
                            </MjmlText>
                            <MjmlText cssClass="paragraph">
                                Let me know if you have any questions or
                                feedback. I'm always happy to help!
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
