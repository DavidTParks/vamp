// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

import sendMail, { sendMarketingMail } from "@/emails/index"
import WelcomeEmail from "@/emails/WelcomeEmail"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await sendMail({
        subject: "Welcome to Vamp!",
        to: "david@vamp.sh",
        component: <WelcomeEmail name="David" />,
    })
    res.status(200).json({ message: "Email sent" })
}
