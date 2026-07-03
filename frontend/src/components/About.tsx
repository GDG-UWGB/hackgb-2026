import { motion } from 'framer-motion';
import lambeauImg from '../assets/images/background/lambeau-field.png';
import gdgLogo from '../assets/images/gdg/GDG On Campus - Horizontal - Dark.png';
import { Users, Clock, Compass, Trophy } from 'lucide-react';

const stats = [
    { number: '200+', label: 'Hackers', icon: Users, color: '#61A644' },
    { number: '24', label: 'Hours', icon: Clock, color: '#E37100' },
    { number: '4', label: 'Tracks', icon: Compass, color: '#0C3C34' },
    { number: '$5K+', label: 'In Prizes', icon: Trophy, color: '#ffcc00' },
];

/* Premium spring easing — Apple-style curve */
const spring = [0.22, 1, 0.36, 1] as const;

const phoenixRise = {
    initial: { opacity: 0, y: 40, scale: 0.97, filter: "blur(8px)" },
    whileInView: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.9, ease: spring }
};

const phoenixLeft = {
    initial: { opacity: 0, x: -40, scale: 0.97, filter: "blur(8px)" },
    whileInView: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.9, delay: 0.1, ease: spring }
};

const phoenixRight = {
    initial: { opacity: 0, x: 40, scale: 0.97, filter: "blur(8px)" },
    whileInView: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.9, delay: 0.2, ease: spring }
};

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
                {/* Section header */}
                <motion.div
                    {...phoenixRise}
                    className="mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-google font-bold mb-6 text-[#0C3C34]">
                        Welcome to HackGB
                    </h2>
                    <p className="text-xl text-slate-900 max-w-3xl font-google-text leading-relaxed">
                        Organized by GDG on Campus at UW-Green Bay in partnership with MLH, HackGB is a historic 24-hour hackathon experience. We invite 200+ students to embark on a mythical coding journey at the STEM Innovation Center — where the Phoenix rises.
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-8">
                        <span className="text-slate-700 font-google font-bold text-sm uppercase tracking-wider">Organized by</span>
                        <a href="https://gdg.uwgb.edu/" target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-90 transition-opacity">
                            <img src={gdgLogo} alt="GDG on Campus Logo" className="h-13 w-auto object-contain" />
                        </a>
                    </div>
                </motion.div>

                {/* Unified stats strip */}
                <motion.div
                    {...phoenixRise}
                    transition={{ ...phoenixRise.transition, delay: 0.15 }}
                    className="glass-card p-6 md:p-8 mb-20 bg-white/94 border border-black/5 shadow-sm max-w-5xl mx-auto"
                >
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-y-2 lg:divide-y-0 lg:divide-x divide-[#61A644]/10 text-center">
                        {stats.map((stat, i) => {
                            const IconComponent = stat.icon;
                            return (
                                <div key={i} className="flex flex-col items-center justify-center p-4 py-6 lg:py-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <IconComponent className="w-5 h-5 animate-gentle-float" style={{ color: stat.color }} />
                                        <span className="text-slate-500 font-google-text text-xs font-semibold uppercase tracking-widest">
                                            {stat.label}
                                        </span>
                                    </div>
                                    <div className="text-3xl md:text-4xl lg:text-5xl font-google font-bold text-[#0C3C34] tracking-tight">
                                        {stat.number}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Info cards row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <motion.div
                        {...phoenixLeft}
                        className="glass-card p-8 md:p-10 bg-white/94 border border-black/5 shadow-sm"
                    >
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-[#61A644]/10 p-3 rounded-xl shrink-0 border border-[#61A644]/15 animate-gentle-float">
                                <svg className="w-6 h-6 text-[#61A644]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-google font-bold text-lg text-slate-900 mb-1">Location</h3>
                                <p className="text-slate-700 font-google-text">UW-Green Bay STEM Innovation Center, Green Bay, WI</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 mb-6">
                            <div className="bg-[#E37100]/10 p-3 rounded-xl shrink-0 border border-[#E37100]/15">
                                <svg className="w-6 h-6 text-[#E37100]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-google font-bold text-lg text-slate-900 mb-1">Date</h3>
                                <p className="text-slate-700 font-google-text">Oct 17 - 18, 2026 — 24 Hours of Innovation</p>
                            </div>
                        </div>
                        <div className="p-6 rounded-2xl bg-[#0C3C34]/5 border border-[#0C3C34]/10">
                            <p className="text-slate-850 italic font-google-text text-sm leading-relaxed">
                                "Our mission is to foster innovation and community in Green Bay by providing a platform for collegiate developers of all levels to build, learn, and grow — where every hacker can rise like the Phoenix."
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        {...phoenixRight}
                        className="glass-card overflow-hidden h-70 sm:h-87.5 lg:h-auto border border-black/5 shadow-sm bg-white"
                    >
                        <iframe
                            title="STEM Innovation Center Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2839.293417937397!2d-87.92552692348545!3d44.53065609559388!2m3!1f0!2f0!3f0!3m2!1i1024!2i1024!4t4.1!3m3!1m2!1s0x8802fb69986b208b%3A0xc6e4b8686705504d!2sSTEM%20Innovation%20Center!5e0!3m2!1sen!2sus!4v1709600000000!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
