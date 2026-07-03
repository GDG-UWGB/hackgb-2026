import { useState } from 'react';
import { motion } from 'framer-motion';
import { faqs } from '../../data/faqsData';
import cheeseHeritageImg from '../../assets/images/background/cheese-heritage.png';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

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
        <section className="relative pt-28 pb-48 px-4 overflow-hidden" id="faqs">
            {/* Background landmark image with parallax drift */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img src={cheeseHeritageImg} alt="" className="w-full h-full object-cover opacity-[0.35] parallax-bg" />
                <div className="absolute inset-0 bg-[#61A644]/[0.01]" />
            </div>

            {/* Ambient glow */}
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#E37100]/5 rounded-full blur-[150px] pointer-events-none animate-ambient-glow" />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, ease: spring }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-google font-bold uppercase tracking-widest text-[#E37100] mb-4 block font-google">Got Questions?</span>
                    <h2 className="text-4xl md:text-6xl font-google font-bold mb-4 text-[#0C3C34]">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-slate-700 font-google-text">
                        Everything you need to know about HackGB 2026.
                    </p>
                </motion.div>

                <div className="space-y-3">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndices.includes(index);
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ duration: 0.6, delay: index * 0.05, ease: spring }}
                                viewport={{ once: true }}
                                className={`overflow-hidden rounded-2xl px-5 sm:px-7 md:px-10 transition-all duration-300 ${isOpen
                                    ? 'glass-card bg-white/95 border-black/10 shadow-sm'
                                    : 'bg-white/70 border border-black/5 hover:bg-white'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleIndex(index)}
                                    className="w-full text-left py-6 flex justify-between items-center text-slate-700 hover:text-[#0C3C34] transition-colors"
                                >
                                    <span className="font-google font-medium text-base md:text-lg pr-4">{faq.question}</span>
                                    <span className={`transform transition-transform duration-300 text-[#61A644] shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <p className="pb-6 pr-10 text-slate-500 font-google-text leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
