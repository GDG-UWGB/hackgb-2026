import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '../../data/faqsData';
import cheeseHeritageImg from '../../assets/images/background/cheese-heritage.png';
import { HelpCircle, ChevronRight, FileQuestion } from 'lucide-react';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24, filter: 'blur(4px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.7, delay, ease: spring },
});

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
                {/* Integrated IDE FAQ Card */}
                <motion.div
                    {...fadeUp(0.1)}
                    className="bg-white/45 backdrop-blur-xl rounded-2xl border border-white/25 shadow-xl overflow-hidden flex flex-col min-h-[460px] relative text-left"
                >
                    {/* IDE Top Window Bar */}
                    <div className="flex items-center justify-between px-4 py-2 border-b border-black/5 bg-white/30">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                            <span className="text-[10px] font-google-mono text-slate-500 ml-3">Frequently Asked Questions</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-google-mono text-[9px] text-slate-450 bg-slate-200/50 px-2 py-0.5 rounded border border-black/5">
                            <FileQuestion className="w-3.5 h-3.5 text-[#61A644]" />
                            <span>faq.md</span>
                        </div>
                    </div>

                    {/* Editor Tab Bar */}
                    <div className="flex border-b border-black/5 bg-white/20 overflow-x-auto scrollbar-none">
                        <div className="flex items-center gap-2 px-5 py-3 border-r border-black/5 font-google-mono text-xs font-medium bg-white/60 text-[#0C3C34] border-t-2 border-t-[#61A644] flex-1 justify-center">
                            <HelpCircle className="w-3.5 h-3.5 text-[#61A644]" />
                            faq.md
                        </div>
                    </div>

                    {/* Workspace Editor Body */}
                    <div className="p-6 md:p-8 bg-transparent space-y-3">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndices.includes(index);
                            return (
                                <motion.div
                                    key={index}
                                    {...fadeUp(index * 0.04)}
                                    className={`overflow-hidden rounded-xl border transition-all duration-300 ${isOpen
                                        ? 'bg-[#61A644]/5 border-[#61A644]/30 border-l-[3px] border-l-[#61A644] shadow-sm'
                                        : 'bg-white/60 border-black/5 hover:bg-white'
                                        }`}
                                >
                                    <button
                                        onClick={() => toggleIndex(index)}
                                        className="w-full text-left py-4 px-5 flex items-center gap-3 text-slate-700 hover:text-[#0C3C34] transition-colors cursor-pointer"
                                    >
                                        <span className="font-google-mono text-xs text-slate-400 select-none">
                                            ## {index + 1}
                                        </span>
                                        <span className="font-google font-bold text-sm md:text-base flex-1">{faq.question}</span>
                                        <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-90 text-[#61A644]' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <p className="pb-5 px-5 pl-[3.25rem] text-xs md:text-sm text-slate-700 font-google-text leading-relaxed border-t border-black/5 pt-3 bg-white/40 font-semibold">
                                                    {faq.answer}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* IDE Bottom Status Bar */}
                    <div className="flex justify-between items-center px-4 py-1.5 bg-[#0C3C34] text-white font-google-mono text-[10px] select-none">
                        <div className="flex items-center gap-3">
                            <span className="font-bold">FAQ: readable</span>
                            <span className="opacity-80">All items validated</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="opacity-80">Markdown</span>
                            <span className="opacity-80">UTF-8</span>
                            <span className="opacity-80">Ln {faqs.length * 4}, Col 1</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;
