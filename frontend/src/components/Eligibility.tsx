import { motion } from 'framer-motion';
import uwgbStemImg from '../assets/images/background/uwgb-stem.png';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

const Eligibility = () => {
    return (
        <section className="relative pt-20 pb-32 px-4 overflow-hidden" id="eligibility">
            {/* Background landmark image with parallax drift */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img src={uwgbStemImg} alt="" className="w-full h-full object-cover opacity-[0.45] parallax-bg" />
                <div className="absolute inset-0 bg-[#61A644]/[0.01]" />
            </div>

            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[400px] h-[400px] bg-[#ffcc00]/5 rounded-full blur-[150px] pointer-events-none animate-ambient-glow" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, ease: spring }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-google font-bold mb-4 text-[#0C3C34]">
                        Who Can Join
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.9, delay: 0.1, ease: spring }}
                        viewport={{ once: true }}
                        className="glass-card p-6 sm:p-8 md:p-10 bg-white/94 border border-black/5 shadow-sm"
                        style={{ background: 'linear-gradient(170deg, rgba(97,166,68,0.06) 0%, rgba(255,255,255,0.96) 100%)' }}
                    >
                        <h3 className="text-2xl font-google font-bold mb-8 text-slate-900">Travel & Eligibility</h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="bg-[#61A644]/12 p-2.5 rounded-xl h-fit border border-[#61A644]/20 shrink-0 animate-gentle-float">
                                    <svg className="w-5 h-5 text-[#61A644]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-google font-bold text-lg mb-2 text-slate-900">Who can join?</h4>
                                    <p className="text-slate-900 font-google-text">Open to all university students and recent graduates (within 12 months).</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="bg-[#E37100]/12 p-2.5 rounded-xl h-fit border border-[#E37100]/20 shrink-0">
                                    <svg className="w-5 h-5 text-[#E37100]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="min-w-0">
                                    <h4 className="font-google font-bold text-lg mb-2 text-slate-900">Travel Reimbursement</h4>
                                    <div className="text-slate-900 leading-relaxed font-google-text">
                                        To receive travel stipends, hackers must:
                                        <ul className="list-disc ml-4 mt-2 text-slate-800">
                                            <li>Check-in physically at the event</li>
                                            <li>Submit a functional project to the official Devpost gallery by Sunday morning</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Fixed: properly animate x back to 0 (was x:30 → y:0, now x:30 → x:0) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.9, delay: 0.2, ease: spring }}
                        viewport={{ once: true }}
                        className="glass-card p-6 sm:p-8 md:p-10 flex flex-col justify-center bg-white/94 border border-black/5 shadow-sm"
                    >
                        <h3 className="text-2xl font-google font-bold mb-6 text-slate-900">Important Notice</h3>
                        <p className="text-slate-700 font-google-text leading-relaxed mb-8">
                            We are committed to making HackGB accessible to everyone. If you have any specific travel needs or accessibility requirements, please let us know in your registration form.
                        </p>
                        <div className="p-5 sm:p-6 rounded-2xl bg-[#E37100]/10 border border-[#E37100]/15">
                            <span className="block text-sm font-google font-bold text-[#E37100] uppercase tracking-widest mb-2">Did you know?</span>
                            <p className="text-slate-800 font-google-text text-sm sm:text-base">
                                Green Bay is known as "Titletown" and we're excited to show you why during our first-ever collegiate hackathon — where the Phoenix rises!
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Eligibility;
