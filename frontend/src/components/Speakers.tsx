import { motion } from 'framer-motion';
import { Mic, Sparkles, ArrowDown, Calendar, Users, Award } from 'lucide-react';
import titletownImg from '../assets/images/background/jpg/titletown-district.jpg';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24, filter: 'blur(4px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.7, delay, ease: spring },
});

const Speakers = () => {
    const scrollToJudges = () => {
        const el = document.getElementById('judges');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative pt-20 pb-28 px-4 overflow-hidden" id="speakers">
            {/* Background landmark image with subtle parallax drift */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                    src={titletownImg}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-[0.30] parallax-bg"
                />
                <div className="absolute inset-0 bg-white/75" />
            </div>

            {/* Ambient subtle color glows */}
            <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#61A644]/5 rounded-full blur-[160px] pointer-events-none animate-ambient-glow" />
            <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#0C3C34]/5 rounded-full blur-[160px] pointer-events-none animate-ambient-glow" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div {...fadeUp(0)} className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0C3C34]/5 border border-[#0C3C34]/10 text-[#0C3C34] text-xs font-google-mono font-semibold tracking-wider uppercase mb-4">
                        <Mic className="w-3.5 h-3.5 text-[#61A644]" />
                        <span>Keynotes & Workshops</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-google font-bold mb-4 text-[#0C3C34]">
                        Keynote Speakers
                    </h2>

                    <p className="text-slate-650 font-google-text text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
                        Industry visionaries, engineering executives, and technical pioneers delivering keynote addresses and hands-on workshops throughout HackGB 2026.
                    </p>
                </motion.div>

                {/* Executive Showcase Card */}
                <motion.div
                    {...fadeUp(0.1)}
                    className="bg-white/85 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-lg p-8 md:p-12 relative overflow-hidden text-center"
                >
                    {/* Subtle decorative gradient top line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0C3C34] via-[#61A644] to-[#E37100]" />

                    {/* Center Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0C3C34] to-[#16584c] text-white flex items-center justify-center mx-auto mb-6 shadow-md ring-4 ring-white">
                        <Mic className="w-8 h-8 text-[#61A644]" />
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E37100]/10 text-[#E37100] border border-[#E37100]/25 text-[11px] font-google-mono font-bold tracking-wider uppercase mb-4">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Lineup Announcement In Progress</span>
                    </div>

                    <h3 className="font-google font-bold text-2xl md:text-3xl text-[#0C3C34] mb-3">
                        Keynote Speakers & Workshop Schedule Coming Soon
                    </h3>

                    <p className="text-slate-650 font-google-text text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-8 font-normal">
                        We are currently coordinating with engineering leaders from premier technology companies, research institutions, and regional innovators to finalize our opening keynote, AI workshops, and technical deep dives.
                    </p>

                    {/* Features Strip */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto mb-8">
                        <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-4 text-center">
                            <Calendar className="w-5 h-5 text-[#61A644] mx-auto mb-2" />
                            <div className="font-google font-bold text-sm text-[#0C3C34]">Opening Keynote</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">Kickoff Day 1</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-4 text-center">
                            <Users className="w-5 h-5 text-[#0C3C34] mx-auto mb-2" />
                            <div className="font-google font-bold text-sm text-[#0C3C34]">Tech Workshops</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">AI, Cloud & Security</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-4 text-center">
                            <Award className="w-5 h-5 text-[#E37100] mx-auto mb-2" />
                            <div className="font-google font-bold text-sm text-[#0C3C34]">Fireside Chat</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">Career & Industry</div>
                        </div>
                    </div>

                    {/* Bottom Action: Jump to Mentors */}
                    <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <span className="text-xs text-slate-500 font-medium">
                            Looking to connect with confirmed mentors right now?
                        </span>
                        <button
                            onClick={scrollToJudges}
                            className="inline-flex items-center gap-1.5 text-xs font-google font-bold text-[#0C3C34] hover:text-[#61A644] transition-colors cursor-pointer bg-slate-100 hover:bg-slate-200/70 px-4 py-2 rounded-full border border-slate-200"
                        >
                            <span>Explore 14 Confirmed Judges & Mentors</span>
                            <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Speakers;
