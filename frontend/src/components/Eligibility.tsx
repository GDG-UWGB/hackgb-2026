import { motion } from 'framer-motion';
import uwgbStemImg from '../assets/images/uwgb-stem.png';
import CanvasParticles from './common/CanvasParticles';

const Eligibility = () => {
    return (
        <section className="relative pt-28 pb-48 px-4 overflow-hidden" id="eligibility">
            {/* Background landmark image */}
            <div className="absolute inset-0 z-0">
                <img src={uwgbStemImg} alt="" className="w-full h-full object-cover opacity-[0.45]" />
                <div className="absolute inset-0 bg-[#61A644]/[0.01]" />
            </div>

            {/* Canvas Animated Constellation Background */}
            <CanvasParticles
                color1="rgba(255, 204, 0, 0.2)"
                color2="rgba(97, 166, 68, 0.18)"
                lineColor="rgba(255, 204, 0, 0.08)"
                particleCount={35}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-google font-bold mb-4 text-[#0C3C34]">
                        Who Can Join
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="glass-card p-10 bg-white/94 border border-black/5 shadow-sm"
                        style={{ background: 'linear-gradient(170deg, rgba(97,166,68,0.06) 0%, rgba(255,255,255,0.96) 100%)' }}
                    >
                        <h3 className="text-2xl font-google font-bold mb-8 text-slate-900">Travel & Eligibility</h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="bg-[#61A644]/12 p-2.5 rounded-xl h-fit border border-[#61A644]/20 shrink-0 animate-pulse-glow">
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
                                <div>
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

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="glass-card p-10 flex flex-col justify-center bg-white/94 border border-black/5 shadow-sm"
                    >
                        <h3 className="text-2xl font-google font-bold mb-6 text-slate-900">Important Notice</h3>
                        <p className="text-slate-700 font-google-text leading-relaxed mb-8">
                            We are committed to making HackGB accessible to everyone. If you have any specific travel needs or accessibility requirements, please let us know in your registration form.
                        </p>
                        <div className="p-6 rounded-2xl bg-[#E37100]/10 border border-[#E37100]/15">
                            <span className="block text-sm font-google font-bold text-[#E37100] uppercase tracking-widest mb-2">Did you know?</span>
                            <p className="text-slate-800 font-google-text">
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
