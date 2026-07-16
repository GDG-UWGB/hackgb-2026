import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';
import titletownImg from '../assets/images/background/titletown-district.png';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30, filter: 'blur(6px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.8, delay, ease: spring },
});

const Speakers = () => {
    // Generate 6 placeholder skeleton speaker cards
    const skeletons = Array.from({ length: 6 });

    return (
        <section className="relative pt-20 pb-32 px-4 overflow-hidden" id="speakers">
            {/* Background landmark image with parallax drift */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img src={titletownImg} alt="" className="w-full h-full object-cover opacity-[0.35] parallax-bg" />
                <div className="absolute inset-0 bg-[#61A644]/[0.01]" />
            </div>

            {/* Ambient glows */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#61A644]/5 rounded-full blur-[150px] pointer-events-none animate-ambient-glow" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#0c3c34]/5 rounded-full blur-[150px] pointer-events-none animate-ambient-glow" />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    {...fadeUp(0)}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-google font-bold mb-4 text-[#0C3C34]">
                        Meet Our Speakers
                    </h2>
                </motion.div>

                {/* Integrated IDE Speakers Card */}
                <motion.div
                    {...fadeUp(0.1)}
                    className="bg-white/45 backdrop-blur-xl rounded-2xl border border-white/25 shadow-xl overflow-hidden flex flex-col min-h-[460px] relative"
                >
                    {/* IDE Top Window Bar */}
                    <div className="flex items-center justify-between px-4 py-2 border-b border-black/5 bg-white/30 select-none">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                            <span className="text-[10px] font-google-mono text-slate-550 ml-3">Speaker Manifest</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-google-mono text-[9px] text-slate-450 bg-slate-200/50 px-2 py-0.5 rounded border border-black/5">
                            <Mic className="w-3 h-3 text-[#61A644]" />
                            <span>speakers.env</span>
                        </div>
                    </div>

                    {/* Editor Tab Bar */}
                    <div className="flex border-b border-black/5 bg-white/20 overflow-x-auto scrollbar-none select-none">
                        <div className="flex items-center gap-2 px-5 py-3 border-r border-black/5 font-google-mono text-xs font-medium bg-white/60 text-[#0C3C34] border-t-2 border-t-[#61A644] flex-1 justify-center">
                            <Mic className="w-3.5 h-3.5 text-[#61A644]" />
                            speakers.env
                        </div>
                    </div>

                    {/* Workspace Editor Body (Skeletons Grid) */}
                    <div className="p-8 bg-transparent grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative min-h-[380px] items-center">
                        {skeletons.map((_, idx) => (
                            <div key={idx} className="bg-white/60 border border-black/5 rounded-2xl p-6 flex flex-col items-center select-none opacity-40">
                                {/* Profile circle skeleton */}
                                <div className="w-20 h-20 rounded-full bg-slate-200/80 animate-pulse mb-4" />
                                {/* Name bar skeleton */}
                                <div className="h-4 w-32 bg-slate-200/80 rounded animate-pulse mb-2" />
                                {/* Title bar skeleton */}
                                <div className="h-3 w-24 bg-slate-200/80 rounded animate-pulse" />
                            </div>
                        ))}

                        {/* Central Glassmorphic Overlay Card */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/[0.03] backdrop-blur-[4px] z-20">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, ease: spring }}
                                viewport={{ once: true }}
                                className="bg-white/95 border border-white/50 shadow-2xl rounded-2xl p-8 max-w-sm text-center mx-4 relative"
                            >
                                <div className="w-12 h-12 bg-[#61A644]/15 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Mic className="w-5 h-5 text-[#61A644] animate-pulse" />
                                </div>
                                <h3 className="font-google font-bold text-2xl text-[#0C3C34] mb-2.5">Speakers & Mentors</h3>
                                <p className="text-slate-650 font-google-text text-sm font-semibold leading-relaxed mb-5">
                                    We are gathering top engineers, founders, and local leaders to host keynotes, workshops, and mentor projects.
                                </p>
                                <div className="inline-block bg-[#E37100]/10 text-[#E37100] border border-[#E37100]/20 px-5 py-1.5 rounded-full text-xs font-google-mono font-bold tracking-wider uppercase">
                                    Coming Soon
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* IDE Bottom Status Bar */}
                    <div className="flex justify-between items-center px-4 py-1.5 bg-[#0c3c34] text-white font-google-mono text-[10px] select-none">
                        <div className="flex items-center gap-3">
                            <span className="font-bold">SPEAKERS: loading</span>
                            <span className="opacity-80">Manifest active</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span>ENV</span>
                            <span>UTF-8</span>
                            <span>Ln 1, Col 1</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Speakers;
