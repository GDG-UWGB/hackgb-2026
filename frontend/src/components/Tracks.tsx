import React from 'react';
import { motion } from 'framer-motion';

// Custom Packers/Titletown/Phoenix SVG shapes
const PhoenixShape = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M50,60 C35,50 15,40 10,25 C15,35 30,45 50,50 C70,45 85,35 90,25 C85,40 65,50 50,60 Z" fill="currentColor" fillOpacity="0.04" />
        <path d="M50,15 C52,20 54,25 50,35 C48,25 48,20 50,15 Z" fill="currentColor" />
        <path d="M50,60 L50,90 M45,65 L40,85 M55,65 L60,85" />
    </svg>
);

const CrownShape = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M15,75 L20,35 L40,55 L50,25 L60,55 L80,35 L85,75 Z" fill="currentColor" fillOpacity="0.04" />
        <line x1="15" y1="75" x2="85" y2="75" />
        <circle cx="20" cy="30" r="3" fill="currentColor" />
        <circle cx="50" cy="20" r="3" fill="currentColor" />
        <circle cx="80" cy="30" r="3" fill="currentColor" />
    </svg>
);

const StadiumShape = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <ellipse cx="50" cy="50" rx="45" ry="30" fill="currentColor" fillOpacity="0.04" />
        <ellipse cx="50" cy="50" rx="35" ry="20" />
        <path d="M15,50 L15,65 M85,50 L85,65 M50,20 L50,10 M50,80 L50,90" />
        <path d="M20,50 L35,50 M65,50 L80,50" />
        <path d="M50,30 L50,20 M50,70 L50,80" />
        <path d="M35,15 C45,10 55,10 65,15" />
    </svg>
);

const HelmetShape = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M30,75 C20,70 15,55 15,40 C15,20 35,12 55,12 C75,12 85,25 85,45 C85,60 80,72 70,77 L65,67" fill="currentColor" fillOpacity="0.04" />
        <circle cx="50" cy="50" r="8" />
        <path d="M70,45 L90,45 L90,65 L70,60" />
        <path d="M75,52 L90,52" />
        <path d="M72,60 L80,75 L65,75" />
        <path d="M47,12 L47,22 M53,12 L53,22" />
    </svg>
);

const tracks = [
    {
        title: "Environment & Sustainability",
        description: "This track challenges teams to develop software and hardware solutions aimed at resource conservation, clean energy, and climate action. Projects will tackle real-world ecological issues by combining environmental data with modern digital tools.",
        color: "bg-[#61A644]/10 border border-[#61A644]/25 text-[#61A644]",
        icon: <PhoenixShape className="w-8 h-8" />
    },
    {
        title: "Education",
        description: "Participants will design platforms and tools aimed at making learning more accessible, personalized, and engaging for students of all ages. This track focuses on shaping the future of digital literacy and empowering educators through modern EdTech solutions.",
        color: "bg-[#ffcc00]/10 border border-[#ffcc00]/25 text-[#ffcc00]",
        icon: <CrownShape className="w-8 h-8" />
    },
    {
        title: "Industrial",
        description: "Teams will engineer solutions to modernize supply chains, optimize manufacturing, and improve workplace safety through automation and data analysis. By deploying predictive models or data processing frameworks, participants will create prototypes that streamline operations and ensure safer environments.",
        color: "bg-[#E37100]/10 border border-[#E37100]/25 text-[#E37100]",
        icon: <StadiumShape className="w-8 h-8" />
    },
    {
        title: "Healthcare & Wellness",
        description: "Developers will build applications and systems focused on improving patient care, mental wellness, and secure health data management. These projects address real-world clinical and lifestyle challenges to promote better public health outcomes. Hackers can design secure clinic workflows, minimalist mobile apps for wellness tracking, or tools that assist in medical data analysis.",
        color: "bg-[#ffcc00]/10 border border-[#ffcc00]/25 text-[#ffcc00]",
        icon: <HelmetShape className="w-8 h-8" />
    }
];

const Tracks = () => {
    return (
        <section className="py-24 px-4 bg-transparent relative overflow-hidden">
            {/* Connected background elements framing the section */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div
                    className="absolute text-[#61A644] opacity-20 left-[4%] top-[15%] w-24 h-24"
                    animate={{ y: [0, -15, 0], rotate: [0, 90, 180] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                >
                    <StadiumShape width="100%" height="100%" />
                </motion.div>
                <motion.div
                    className="absolute text-[#E37100] opacity-20 right-[4%] top-[60%] w-28 h-28"
                    animate={{ y: [0, 20, 0], rotate: [0, -120, -240] }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                >
                    <CrownShape width="100%" height="100%" />
                </motion.div>
                <motion.div
                    className="absolute text-[#ffcc00] opacity-20 left-[6%] top-[70%] w-24 h-24"
                    animate={{ y: [0, -20, 0], rotate: [0, 45, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                >
                    <HelmetShape width="100%" height="100%" />
                </motion.div>
                <motion.div
                    className="absolute text-[#61A644] opacity-25 right-[6%] top-[10%] w-28 h-28"
                    animate={{ y: [0, 15, 0], rotate: [0, 180, 360] }}
                    transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                >
                    <PhoenixShape width="100%" height="100%" />
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <span className="text-sm font-google font-bold uppercase tracking-widest text-[#E37100] mb-4 block">Choose Your Path</span>
                    <h2 className="text-4xl md:text-5xl font-google font-bold mb-4 text-slate-900">
                        Hacking <span className="text-gradient-phoenix">Tracks</span>
                    </h2>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-google-text">
                        Four paths, four challenges. Pick the one that inspires you and build something that matters.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tracks.map((track, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-3xl bg-white/70 backdrop-blur-md border border-black/5 hover:bg-white hover:border-black/10 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center shadow-md hover:shadow-xl"
                        >
                            <div className={`${track.color} p-4 rounded-2xl mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                                {track.icon}
                            </div>
                            <h3 className="text-xl font-google font-bold mb-4 text-slate-800 leading-tight">
                                {track.title}
                            </h3>
                            <p className="text-slate-500 font-google-text leading-relaxed text-sm">
                                {track.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Tracks;

