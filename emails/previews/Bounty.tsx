import { default as SubmissionReceived } from "../SubmissionReceived"
import { default as SubmissionAccepted } from "../SubmissionAccepted"

export function NewSubmission() {
    return (
        <SubmissionReceived
            bountyTitle="Light mode implementation"
            bountyId="123123"
            projectName="Vamp"
        />
    )
}

export function BountySubmissionAccepted() {
    return (
        <SubmissionAccepted
            bountyTitle="Light mode implementation"
            bountyId="123123"
        />
    )
}
