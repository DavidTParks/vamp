const faqs = [
    {
        id: 1,
        question: "Who is this platform for?",
        answer: "Vamp is useful for both open-source maintainers and open-source contributors. If you are a project maintainer, or somebody looking to dip your toes into open-source and make money while doing it, Vamp is for you!",
    },
    {
        id: 2,
        question: "How is this different from other bounty platforms?",
        answer: "Vamp is open-source, so there is full transparency how the platform operates. Also, Vamp offers extremely low fees, and does not impose withdrawal fees or inactivity fees like other bounty platforms.",
    },
    {
        id: 3,
        question: "How do I get paid out?",
        answer: "Once your bounty submission is accepted and paid out by a project owner, payouts are handled through Stripe on a rolling daily basis. You will need to link a debit card or bank account via Stripe to handle receiving payments.",
    },
    {
        id: 4,
        question: "Is there a fee?",
        answer: "Vamp will charge a 5% fee + 50c for each payment made through our platform. If this is a deal-breaker for your project please get in touch.",
    },
    {
        id: 5,
        question: "How can I contribute?",
        answer: "Vamp is open-source! To contribute feel free to open an issue if you believe you've encountered a bug or make a pull request to add new features/make quality-of-life improvements/fix bugs.",
    },
    // More questions...
]

export function FAQSection() {
    return (
        <div className="bg-transparent">
            <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
                <div className="lg:mx-auto lg:max-w-2xl lg:text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Frequently asked questions
                    </h2>
                    <p className="mt-4 text-gray-400">
                        If you have any other questions please get in touch.
                    </p>
                </div>
                <div className="mt-20">
                    <dl className="space-y-10 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-10 lg:space-y-0">
                        {faqs.map((faq) => (
                            <div key={faq.id}>
                                <dt className="font-semibold text-white">
                                    {faq.question}
                                </dt>
                                <dd className="mt-3 text-gray-400">
                                    {faq.answer}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
