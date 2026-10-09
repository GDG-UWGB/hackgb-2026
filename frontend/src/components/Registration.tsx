import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import titletownImg from '../assets/images/background/jpg/titletown-district.jpg';
import { ALL_APPLICATIONS_CLOSED, APPLICATIONS_OPEN } from '../data/constants';
import { calculateTimeUntilEvent } from './common/EventCountdown';

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
    const [timeLeft, setTimeLeft] = useState(calculateTimeUntilEvent());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeUntilEvent());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative pt-20 pb-32 px-4 overflow-hidden" id="register">
            {/* Background landmark image with parallax drift */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img src={titletownImg} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover opacity-[0.35] parallax-bg" />
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
                            <span className="text-[10px] text-slate-500 ml-3">bash - apply.sh [CLOSED]</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] text-[#ff5f56] font-bold bg-[#ff5f56]/10 px-2 py-0.5 rounded border border-[#ff5f56]/25">
                            <Terminal className="w-3.5 h-3.5" />
                            <span>tty1 • closed</span>
                        </div>
                    </div>

                    {/* Terminal body */}
                    <div className="p-6 md:p-8 flex flex-col justify-between flex-1 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="text-[#61A644] font-bold">sachin@uwgb:~$</span>
                                <span className="text-slate-200">./apply.sh --status</span>
                            </div>
                            <div className="text-slate-400 space-y-1.5 bg-black/30 p-4 rounded-xl border border-white/5 font-google-mono text-[11px]">
                                <div>[INFO] Loading HackGB registration parameters...</div>
                                <div>[INFO] Target: UW-Green Bay STEM Innovation Center</div>
                                <div>[INFO] Date: October 17 - 18, 2026</div>
                                <div className="text-[#61A644] font-bold font-google">
                                    [EVENT COUNTDOWN] T-{timeLeft.days}d {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s until HackGB 2026
                                </div>
                                <div className="text-[#ff5f56] text-[10px] pt-1 font-semibold">
                                    [NOTICE] All applications for HackGB 2026 are now officially closed.
                                </div>
                                <div className="text-[#ff5f56] font-bold font-google">
                                    [CLOSED] Submissions logged. We look forward to seeing all attendees on Oct 17!
                                </div>
                            </div>
                            <div className="text-slate-300 font-google text-sm font-bold pt-4 text-center border-t border-white/5">
                                Applications are closed • See you at HackGB 2026!
                            </div>
                        </div>

                        {/* Interactive triggers in editor layout */}
                        <div>
                            <div className="flex flex-wrap justify-center items-center gap-4">
                                {!ALL_APPLICATIONS_CLOSED && (
                                    <button
                                        onClick={() => navigate('/apply')}
                                        className="bg-[#61A644] hover:bg-[#61A644]/90 text-white font-google font-bold text-sm px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all"
                                    >
                                        <span>{APPLICATIONS_OPEN ? 'Apply Now' : 'Opening Soon'}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        const el = document.getElementById('about');
                                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className={`${ALL_APPLICATIONS_CLOSED ? 'bg-[#61A644] hover:bg-[#61A644]/90 text-white shadow-lg' : 'border border-white/10 hover:border-white/20 text-slate-300 hover:text-white bg-white/5'} font-google font-bold text-sm px-6 py-3 rounded-xl cursor-pointer transition-all active:scale-95 flex items-center gap-2`}
                                >
                                    <span>Learn More</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="text-[11px] text-slate-400 font-google text-center mt-3 max-w-md mx-auto">
                                Applications for HackGB 2026 are officially closed. Thank you to everyone who registered!
                            </p>
                        </div>
                    </div>

                    {/* Bottom Status bar */}
                    <div className="flex justify-between items-center px-4 py-1.5 bg-slate-800 text-slate-300 text-[9px] select-none border-t border-white/5">
                        <div className="flex items-center gap-2 font-bold font-google">
                            <span className="text-[#ff5f56]">●</span>
                            <span>APPLICATIONS: CLOSED</span>
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
