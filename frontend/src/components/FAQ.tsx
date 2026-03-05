import { useState } from 'react';

const faqs = [
    {
        question: "Does it cost anything?",
        answer: "No, it is completely free including food, drinks, and swag! We want to make sure everyone has a chance to participate regardless of their financial situation."
    },
    {
        question: "Do I need a team?",
        answer: "No, you can find a team during our team-building session at the start of the event. Many hackers come solo and leave with a group of new friends!"
    },
    {
        question: "Is it beginner-friendly?",
        answer: "Yes! We have mentors and workshops specifically for first-timers. HackGB is a great place to learn new skills and build your first project."
    },
    {
        question: "What should I bring?",
        answer: "Laptop, charger, photo ID, and a sleeping bag for naps. We'll provide the food, caffeine, and vibes!"
    },
    {
        question: "Where do I sleep?",
        answer: "We provide designated quiet zones for naps. Make sure to bring a sleeping bag or a blanket for extra comfort!"
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 px-4 bg-white">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-google font-bold mb-4 text-google-black">
                        Frequently Asked <span className="text-google-green">Questions</span>
                    </h2>
                    <p className="text-xl text-google-black/60">
                        Got questions? We've got answers.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border border-google-off-white rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'shadow-md border-google-green/30' : 'hover:border-google-green/20'
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full text-left p-6 flex justify-between items-center bg-white"
                            >
                                <span className="font-google font-bold text-lg text-google-black">{faq.question}</span>
                                <span className={`transform transition-transform duration-300 text-google-green ${openIndex === index ? 'rotate-180' : ''}`}>
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <p className="p-6 pt-0 text-google-black/60 font-google-text leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
