import { motion } from 'framer-motion';
import foxRiverImg from '../assets/images/fox-river.png';
import CanvasParticles from './common/CanvasParticles';
import { Leaf, BookOpen, Settings, HeartPulse } from 'lucide-react';

const tracks = [
    {
        title: "Environment & Sustainability",
        description: "Develop solutions aimed at resource conservation, clean energy, and climate action. Tackle real-world ecological issues with modern digital tools.",
        color: '#61A644',
        icon: Leaf,
    },
    {
        title: "Education",
        description: "Design platforms and tools to make learning more accessible, personalized, and engaging. Shape the future of digital literacy through EdTech.",
        color: '#ffcc00',
        icon: BookOpen,
    },
    {
        title: "Industrial",
        description: "Engineer solutions to modernize supply chains, optimize manufacturing, and improve workplace safety through automation and data analysis.",
        color: '#E37100',
        icon: Settings,
    },
    {
        title: "Healthcare & Wellness",
        description: "Build applications focused on improving patient care, mental wellness, and secure health data management for better public health outcomes.",
        color: '#ffcc00',
        icon: HeartPulse,
    },
];

const phoenixRise = {
    initial: { opacity: 0, y: 50, scale: 0.96, filter: "blur(4px)" },
    whileInView: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
};

const Tracks = () => {
    return (
        <section className="relative pt-28 pb-48 px-4 overflow-hidden" id="tracks">
            {/* Background landmark image */}
            <div className="absolute inset-0 z-0">
                <img src={foxRiverImg} alt="" className="w-full h-full object-cover opacity-[0.45]" />
                <div className="absolute inset-0 bg-[#61A644]/[0.01]" />
            </div>

            {/* Canvas Animated Constellation Background */}
            <CanvasParticles
                color1="rgba(227, 113, 0, 0.22)"
                color2="rgba(97, 166, 68, 0.22)"
                lineColor="rgba(227, 113, 0, 0.08)"
                particleCount={40}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    {...phoenixRise}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-google font-bold mb-4 text-[#0C3C34]">
                        Choose Your Path
                    </h2>
                    <p className="text-xl text-slate-850 max-w-2xl mx-auto font-google-text">
                        Four paths, four challenges. Pick the one that inspires you and build something that matters.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tracks.map((track, index) => (
                        <motion.div
                            key={index}
                            {...phoenixRise}
                            transition={{ ...phoenixRise.transition, delay: index * 0.1 }}
                            className="glass-card glass-card-hover p-8 md:p-10 group bg-white/94 border border-black/5 shadow-sm"
                            style={{
                                borderTop: `3px solid ${track.color}`,
                            }}
                        >
                            <div className="flex items-start gap-5">
                                <div
                                    className="p-3 rounded-2xl shrink-0 transition-transform duration-500 group-hover:scale-110 flex items-center justify-center"
                                    style={{ background: `${track.color}15`, color: track.color }}
                                >
                                    <track.icon className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-google font-bold mb-3 text-slate-900 leading-tight">
                                        {track.title}
                                    </h3>
                                    <p className="text-slate-700 font-google-text leading-relaxed text-sm">
                                        {track.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Tracks;
