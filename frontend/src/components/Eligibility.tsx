import { motion } from 'framer-motion';
import uwgbStemImg from '../assets/images/background/uwgb-stem.png';
import { CheckCircle, AlertCircle, FileText, Settings } from 'lucide-react';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30, filter: 'blur(6px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.8, delay, ease: spring },
});

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

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    {...fadeUp(0)}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-google font-bold mb-4 text-[#0C3C34]">
                        Travel & Eligibility
                    </h2>
                </motion.div>

                {/* Integrated IDE Eligibility Card */}
                <motion.div
                    {...fadeUp(0.1)}
                    className="bg-white/45 backdrop-blur-xl rounded-2xl border border-white/25 shadow-xl overflow-hidden flex flex-col min-h-[440px] relative"
                >
                    {/* IDE Top Window Bar */}
                    <div className="flex items-center justify-between px-4 py-2 border-b border-black/5 bg-white/30">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                            <span className="text-[10px] font-google-mono text-slate-500 ml-3">Who Can Join</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-google-mono text-[9px] text-slate-450 bg-slate-200/50 px-2 py-0.5 rounded border border-black/5">
                            <Settings className="w-3 h-3 text-[#61A644]" />
                            <span>rules.cfg</span>
                        </div>
                    </div>

                    {/* Editor Tab Bar */}
                    <div className="flex border-b border-black/5 bg-white/20 overflow-x-auto scrollbar-none">
                        <div className="flex items-center gap-2 px-5 py-3 border-r border-black/5 font-google-mono text-xs font-medium bg-white/60 text-[#0C3C34] border-t-2 border-t-[#61A644] flex-1 justify-center">
                            <FileText className="w-3.5 h-3.5 text-[#61A644]" />
                            rules.cfg
                        </div>
                    </div>

                    {/* Split Card Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 flex-1">
                        {/* Left Column: Config list */}
                        <div className="p-8 md:p-10 bg-transparent flex flex-col justify-center">
                            <h3 className="text-xl font-google font-bold mb-6 text-[#0C3C34] flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#61A644]" />
                                Travel & Eligibility
                            </h3>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="bg-[#61A644]/15 p-2.5 rounded-xl h-fit shrink-0 border border-[#61A644]/20">
                                        <CheckCircle className="w-5 h-5 text-[#61A644]" />
                                    </div>
                                    <div>
                                        <h4 className="font-google font-bold text-base mb-1 text-[#0C3C34]">Who can join?</h4>
                                        <p className="text-slate-700 font-google-text text-sm leading-relaxed font-semibold">Open to all university students and recent graduates (within 12 months).</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="bg-[#E37100]/15 p-2.5 rounded-xl h-fit shrink-0 border border-[#E37100]/20">
                                        <AlertCircle className="w-5 h-5 text-[#E37100]" />
                                    </div>
                                    <div>
                                        <h4 className="font-google font-bold text-base mb-1 text-[#0C3C34]">Travel Reimbursement</h4>
                                        <p className="text-slate-700 font-google-text text-sm leading-relaxed mb-2 font-semibold">
                                            To receive travel stipends, hackers must:
                                        </p>
                                        <ul className="list-none text-slate-700 font-google-text text-sm flex flex-col gap-2 font-semibold">
                                            <li className="flex items-start gap-2">
                                                <span className="w-1.5 h-1.5 mt-2 rounded-full bg-[#E37100] shrink-0" />
                                                Check-in physically at the event
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="w-1.5 h-1.5 mt-2 rounded-full bg-[#E37100] shrink-0" />
                                                Submit a functional project to the official Devpost gallery by Sunday morning
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Code block layout with orange sidebar */}
                        <div className="p-8 md:p-10 bg-black/5 lg:border-l border-t lg:border-t-0 border-black/5 flex flex-col justify-center relative">
                            {/* Orange vertical sidebar highlight */}
                            <div className="hidden lg:block absolute left-0 top-8 bottom-8 w-[3px] bg-gradient-to-b from-[#E37100] to-[#ffcc00] rounded-full" />
                            
                            <h3 className="text-xl font-google font-bold mb-4 text-[#0C3C34] flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#E37100]" />
                                Important Notice
                            </h3>
                            <p className="text-slate-700 font-google-text leading-relaxed text-sm mb-6 font-semibold">
                                We are committed to making HackGB accessible to everyone. If you have any specific travel needs or accessibility requirements, please let us know in your registration form.
                            </p>
                            <div className="bg-white/80 border border-black/5 rounded-2xl p-5 shadow-sm">
                                <span className="inline-block font-google-mono text-[9px] font-bold text-[#E37100] tracking-wider mb-2 bg-[#E37100]/10 px-2 py-0.5 rounded">
                                    DID_YOU_KNOW.log
                                </span>
                                <p className="text-slate-700 font-google-text text-xs leading-relaxed font-semibold">
                                    Green Bay is known as "Titletown" and we're excited to show you why during our first-ever collegiate hackathon — where the Phoenix rises!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* IDE Bottom Status Bar */}
                    <div className="flex justify-between items-center px-4 py-1.5 bg-[#ffcc00] text-slate-800 font-google-mono text-[10px] select-none">
                        <div className="flex items-center gap-3">
                            <span className="font-bold">CONFIG: checked</span>
                            <span className="opacity-80">Rules verified</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="opacity-80">INI/CFG</span>
                            <span className="opacity-80">UTF-8</span>
                            <span className="opacity-80">Ln 42, Col 8</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Eligibility;
