import { motion } from 'framer-motion';
import lambeauImg from '../assets/images/background/lambeau-field.png';
import gdgLogo from '../assets/images/gdg/GDG On Campus - Horizontal - Light.png';
import { Users, Clock, Compass, Trophy, MapPin, Calendar } from 'lucide-react';

const stats = [
    { number: '200+', label: 'Hackers', icon: Users, color: '#61A644' },
    { number: '24', label: 'Hours', icon: Clock, color: '#E37100' },
    { number: '4', label: 'Tracks', icon: Compass, color: '#0C3C34' },
    { number: '$5K+', label: 'In Prizes', icon: Trophy, color: '#ffcc00' },
];

/* Premium spring easing — Apple-style curve */
const spring = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30, filter: 'blur(6px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.8, delay, ease: spring },
});

const About = () => {
    return (
        <section className="relative pt-20 pb-32 px-4 overflow-hidden" id="about">
            {/* Background landmark image with parallax drift */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img src={lambeauImg} alt="" className="w-full h-full object-cover opacity-[0.45] parallax-bg" />
                <div className="absolute inset-0 bg-[#61A644]/[0.01]" />
            </div>

            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#61A644]/5 rounded-full blur-[150px] pointer-events-none animate-ambient-glow" />

            <div className="max-w-7xl mx-auto z-10 relative">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
                    {/* Left: welcome.md editor card */}
                    <motion.div
                        {...fadeUp()}
                        className="lg:col-span-3 bg-white/45 backdrop-blur-xl rounded-2xl border border-white/25 shadow-lg overflow-hidden flex flex-col"
                    >
                        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-black/5 bg-white/30">
                            <div className="flex gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                            </div>
                            <span className="text-[10px] font-google-mono text-slate-500 ml-3">welcome.md</span>
                        </div>
                        <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-google font-bold mb-4 text-[#0C3C34] leading-tight">
                                    Welcome to HackGB
                                </h2>
                                <p className="text-base text-slate-805 max-w-2xl font-google-text leading-relaxed mb-6 font-medium">
                                    Organized by GDG on Campus at UW-Green Bay in partnership with MLH, HackGB is a historic 24-hour hackathon experience. We invite 200+ students to embark on a mythical coding journey at the STEM Innovation Center — where the Phoenix rises.
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-black/5">
                                <span className="text-slate-600 font-google font-bold text-xs">Organized by</span>
                                <a href="https://gdg.uwgb.edu/" target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-90 transition-opacity bg-white/80 p-1 rounded-lg">
                                    <img src={gdgLogo} alt="GDG on Campus Logo" className="h-9 w-auto object-contain" />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Quick info badges */}
                    <motion.div {...fadeUp(0.15)} className="lg:col-span-2 flex flex-col gap-4 justify-center">
                        {/* location.cfg */}
                        <div className="bg-white/45 backdrop-blur-xl rounded-2xl border border-white/25 shadow-lg overflow-hidden flex flex-col">
                            <div className="flex items-center gap-1.5 px-4 py-1.5 border-b border-black/5 bg-white/30">
                                <div className="flex gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                                </div>
                                <span className="text-[9px] font-google-mono text-slate-500 ml-3">location.cfg</span>
                            </div>
                            <div className="p-4 flex items-center gap-4">
                                <div className="bg-[#61A644]/15 p-2.5 rounded-xl shrink-0 border border-[#61A644]/20">
                                    <MapPin className="w-5 h-5 text-[#61A644]" />
                                </div>
                                <div>
                                    <span className="font-google font-bold text-xs text-[#0C3C34] block">Location</span>
                                    <span className="text-slate-700 font-google-text text-sm font-semibold">UW-Green Bay STEM Innovation Center</span>
                                </div>
                            </div>
                        </div>

                        {/* date.env */}
                        <div className="bg-white/45 backdrop-blur-xl rounded-2xl border border-white/25 shadow-lg overflow-hidden flex flex-col">
                            <div className="flex items-center gap-1.5 px-4 py-1.5 border-b border-black/5 bg-white/30">
                                <div className="flex gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                                </div>
                                <span className="text-[9px] font-google-mono text-slate-500 ml-3">date.env</span>
                            </div>
                            <div className="p-4 flex items-center gap-4">
                                <div className="bg-[#E37100]/15 p-2.5 rounded-xl shrink-0 border border-[#E37100]/20">
                                    <Calendar className="w-5 h-5 text-[#E37100]" />
                                </div>
                                <div>
                                    <span className="font-google font-bold text-xs text-[#0C3C34] block">Date</span>
                                    <span className="text-slate-700 font-google-text text-sm font-semibold">Oct 17 – 18, 2026 · 24 Hours</span>
                                </div>
                            </div>
                        </div>

                        {/* mission.txt */}
                        <div className="bg-white/45 backdrop-blur-xl rounded-2xl border border-white/25 shadow-lg overflow-hidden flex flex-col">
                            <div className="flex items-center gap-1.5 px-4 py-1.5 border-b border-black/5 bg-white/30">
                                <div className="flex gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                                </div>
                                <span className="text-[9px] font-google-mono text-slate-500 ml-3">mission.txt</span>
                            </div>
                            <div className="p-4">
                                <p className="text-[#0C3C34] italic font-google-text text-sm leading-relaxed font-semibold">
                                    "Our mission is to foster innovation and community in Green Bay — where every hacker can rise like the Phoenix."
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Stats row — styled as metrics.json editor card (squeezed width) */}
                <motion.div
                    {...fadeUp(0.2)}
                    className="max-w-3xl mx-auto w-full bg-white/45 backdrop-blur-xl rounded-2xl border border-white/25 shadow-lg overflow-hidden flex flex-col"
                >
                    <div className="flex items-center gap-1.5 px-4 py-1.5 border-b border-black/5 bg-white/30">
                        <div className="flex gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                            <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                            <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                        </div>
                        <span className="text-[10px] font-google-mono text-slate-500 ml-3">metrics.json</span>
                    </div>
                    <div className="p-4 md:p-5">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 divide-y lg:divide-y-0 lg:divide-x divide-black/5">
                            {stats.map((stat, i) => {
                                const IconComponent = stat.icon;
                                return (
                                    <div key={i} className="flex flex-col sm:flex-row items-center gap-3 p-2 lg:p-0 lg:pl-4 first:pl-0 pt-3 first:pt-2 lg:pt-0">
                                        <div
                                            className="p-2 rounded-lg flex items-center justify-center border shrink-0 bg-white/60"
                                            style={{
                                                color: stat.color,
                                                borderColor: `${stat.color}30`
                                            }}
                                        >
                                            <IconComponent className="w-4 h-4" />
                                        </div>
                                        <div className="text-center sm:text-left">
                                            <div className="text-xl md:text-2xl font-google font-bold text-[#0C3C34] tracking-tight leading-none mb-1">
                                                {stat.number}
                                            </div>
                                            <span className="text-slate-500 font-google-text text-[9px] font-bold uppercase tracking-wider block">
                                                {stat.label}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
