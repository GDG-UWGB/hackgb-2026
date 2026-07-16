import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import titletownImg from '../assets/images/background/titletown-district.png';
import { APPLICATIONS_OPEN } from '../data/constants';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30, filter: 'blur(6px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.8, delay, ease: spring },
});

const Registration = () => {
    const navigate = useNavigate();

    return (
        <section className="relative pt-20 pb-32 px-4 overflow-hidden" id="register">
            {/* Background landmark image with parallax drift */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img src={titletownImg} alt="" className="w-full h-full object-cover opacity-[0.35] parallax-bg" />
                <div className="absolute inset-0 bg-[#61A644]/[0.01]" />
            </div>

            {/* Ambient glow */}
            <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#61A644]/5 rounded-full blur-[150px] pointer-events-none animate-ambient-glow" />

            <div className="max-w-3xl mx-auto text-center relative z-10 pt-8">
                {/* Header */}
                <motion.div
                    {...fadeUp(0)}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-6xl font-google font-bold mb-4 text-[#0C3C34]">
                        Join the Journey
                    </h2>
                </motion.div>

                {/* Integrated IDE Terminal Registration Card */}
                <motion.div
                    {...fadeUp()}
                    className="bg-[#0f0f16] border border-white/5 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-left font-google-mono text-xs text-slate-350 min-h-[380px]"
                >
                    {/* Top window bar */}
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-white/5 select-none">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                            <span className="text-[10px] text-slate-500 ml-3">bash - apply.sh</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] text-[#61A644] font-bold bg-[#61A644]/10 px-2 py-0.5 rounded border border-[#61A644]/25">
                            <Terminal className="w-3.5 h-3.5" />
                            <span>tty1</span>
                        </div>
                    </div>

                    {/* Terminal body */}
                    <div className="p-6 md:p-8 flex flex-col justify-between flex-1 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="text-[#61A644] font-bold">sachin@uwgb:~$</span>
                                <span className="text-slate-200">./apply.sh --now</span>
                            </div>
                            <div className="text-slate-400 space-y-1 bg-black/30 p-4 rounded-xl border border-white/5">
                                <div>[INFO] Loading HackGB registration parameters...</div>
                                <div>[INFO] Target: UW-Green Bay STEM Innovation Center</div>
                                <div>[INFO] Date: October 17 - 18, 2026</div>
                                {APPLICATIONS_OPEN ? (
                                    <div className="text-[#61A644] font-bold">[SUCCESS] Registration pipelines active. 200+ slots available.</div>
                                ) : (
                                    <div className="text-[#E37100] font-bold">[PENDING] Registration pipeline offline. Launching soon!</div>
                                )}
                            </div>
                            <div className="text-slate-300 font-google text-sm font-bold pt-4 text-center border-t border-white/5">
                                Ready to join UWGB's premier collegiate hackathon?
                            </div>
                        </div>

                        {/* Interactive triggers in editor layout */}
                        <div className="flex flex-wrap justify-center items-center gap-4">
                            <button
                                onClick={() => navigate('/apply')}
                                className="bg-[#61A644] hover:bg-[#61A644]/90 text-white font-google font-bold text-sm px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all"
                            >
                                <span>{APPLICATIONS_OPEN ? 'Apply Now' : 'Opening Soon'}</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => {
                                    const el = document.getElementById('about');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-google font-bold text-sm px-5 py-3 rounded-xl cursor-pointer transition-all bg-white/5"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* Bottom Status bar */}
                    <div className="flex justify-between items-center px-4 py-1.5 bg-[#61A644] text-white text-[9px] select-none">
                        <div className="flex items-center gap-2 font-bold">
                            <span>APPLY: active</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span>Bash</span>
                            <span>UTF-8</span>
                            <span>tty1</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Registration;
