import { useState } from 'react';
import { faqs } from '../../data/faqsData';

const FAQ = () => {
    const [openIndices, setOpenIndices] = useState<number[]>([0]);

    const toggleIndex = (index: number) => {
        setOpenIndices((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7/8 lg:max-w-6/8 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-google mb-4 text-google-black">
                        Frequently Asked <span className="text-google-green-darktone">Questions</span>
                    </h2>
                    <p className="text-lg text-google-black/60">
                        Got questions? We've got answers.
                    </p>
                </div>

                <div className="space-y-1 2xl:px-10">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndices.includes(index);
                        return (
                            <div
                                key={index}
                                className={`border overflow-hidden rounded-[40px] px-12 transition-transform duration-300 ${isOpen
                                    ? 'bg-white border-google-green-darktone'
                                    : 'bg-google-green/15 border-transparent hover:bg-google-green/20'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleIndex(index)}
                                    className="w-full text-left py-6 flex justify-between items-center text-google-black focus:text-google-green-darktone"
                                >
                                    <span className="font-google font-medium text-base ">{faq.question}</span>
                                    <span className={`transform transition-transform duration-300 text-google-green-darktone ${isOpen ? 'rotate-180' : ''}`}>
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <p className="pb-6 pr-15 text-google-black/70 font-google-text leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
