import { default as SubmissionReceived } from "../SubmissionReceived"

export function NewSubmission() {
    return (
        <SubmissionReceived
            bountyTitle="Light mode help"
            bountyId="123123"
            projectName="Vamp"
        />
    )
}
