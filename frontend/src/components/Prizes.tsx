import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Target, Heart, Ticket, ChevronRight, Image as ImageIcon, Award, ExternalLink } from 'lucide-react';
import gbTrailImg from '../assets/images/background/jpg/gb-trail.jpg';

import ipadImg from '../assets/images/prizes/ipad.jpg';
import jblCharge6Img from '../assets/images/prizes/jbl_charge_6.jpg';
import dellMonitorImg from '../assets/images/prizes/dell_monitor.jpg';
import ankerSpace2Img from '../assets/images/prizes/anker_space2.jpg';
import amazfitActive3Img from '../assets/images/prizes/amazfit_active3.jpg';
import steelseriesApex3Img from '../assets/images/prizes/steelseries_apex3.jpg';
import logitechMx3sImg from '../assets/images/prizes/logitech_mx3s.jpg';
import elgatoStreamdeckImg from '../assets/images/prizes/elgato_streamdeck.jpg';
import raspberryPi5Img from '../assets/images/prizes/raspberry_pi_5.jpg';
import modalLogo from '../assets/images/sponsors/phoenix/modal.png';
import lovableLogo from '../assets/images/sponsors/flame/lovable.png';
import photonLogo from '../assets/images/sponsors/ember/photon.png';

import elevenLabsLogo from '../assets/images/sponsors/mlh/elevenlabs.png';
import geminiLogo from '../assets/images/sponsors/mlh/gemini.png';
import solanaLogo from '../assets/images/sponsors/mlh/solana.png';
import tigerDataLogo from '../assets/images/sponsors/mlh/tiger-data.png';
import presageLogo from '../assets/images/sponsors/mlh/presage.png';
import digitalOceanLogo from '../assets/images/sponsors/mlh/digitalocean.png';
import goDaddyRegistryLogo from '../assets/images/sponsors/mlh/godaddy-registry.png';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30, filter: 'blur(6px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.8, delay, ease: spring },
});

const prizeCategories = [
    {
        title: "Overall Prizes",
        icon: Trophy,
        color: "#ffbd2e",
        prizes: [
            { 
                name: "Best Overall Hack", 
                prize: "Apple 11-inch iPad-A16 128GB - Silver", 
                desc: "Awarded to the overall best project at HackGB, excelling in innovation, technical complexity, design, and impact.",
                image: ipadImg
            },
            { 
                name: "Best Solo Hack", 
                prize: "Logitech - MX Master 3S Mouse", 
                desc: "Awarded to the most outstanding project built entirely by an individual hacker.",
                image: logitechMx3sImg
            },
            { 
                name: "Best Beginner Hack", 
                prize: "SteelSeries - Apex 3 Gaming Keyboard", 
                desc: "Awarded to the best project submitted by a team consisting entirely of first-time hackers.",
                image: steelseriesApex3Img
            },
            { 
                name: "Best UI/UX Hack", 
                prize: "Elgato - Stream Deck Mini", 
                desc: "Awarded to the project demonstrating exceptional user interface design, user experience, and accessibility.",
                image: elgatoStreamdeckImg
            }
        ]
    },
    {
        title: "Track Prizes",
        icon: Target,
        color: "#61A644",
        prizes: [
            { 
                name: "Best Environment & Sustainability", 
                prize: 'Dell - 27" IPS FHD 144Hz Monitor', 
                desc: "Challenges teams to develop software and hardware solutions aimed at resource conservation, clean energy, and climate action.",
                image: dellMonitorImg
            },
            { 
                name: "Best Education Hack", 
                prize: "Anker - Soundcore Space 2 Headphones", 
                desc: "Design platforms and tools aimed at making learning more accessible, personalized, and engaging for students of all ages.",
                image: ankerSpace2Img
            },
            { 
                name: "Best Industrial Hack", 
                prize: "JBL - Charge 6 Portable Speaker", 
                desc: "Engineer solutions to modernize supply chains, optimize manufacturing, and improve workplace safety through automation and data analysis.",
                image: jblCharge6Img
            },
            { 
                name: "Best Healthcare & Wellness", 
                prize: "Amazfit - Active 3 Premium Smartwatch", 
                desc: "Build applications and systems focused on improving patient care, mental wellness, and secure health data management.",
                image: amazfitActive3Img
            },
            { 
                name: "Best Hardware Hack", 
                prize: "Raspberry Pi 5 - Vilros Essentials Kit",
                desc: "Awarded to the best integration of physical hardware and software.",
                image: raspberryPi5Img
            }
        ]
    },
    {
        title: "Sponsor Prizes",
        icon: Heart,
        color: "#E37100",
        prizes: [
            { 
                name: "Best Use of Modal", 
                prize: "$1,000 in Modal credits", 
                desc: "Awarded to the project that demonstrates the most innovative and effective use of Modal. Each participant receives $100 in Modal credits, valid for one year.",
                image: modalLogo
            },
            { 
                name: "Best Use of Lovable", 
                prize: "1-Year Lovable Pro Subscription", 
                desc: "Awarded to the project that demonstrates the most creative and impactful use of Lovable. Each participant receives $100 worth of Lovable credits.",
                image: lovableLogo
            },
            { 
                name: "Best Use of Photon", 
                prize: "TBD", 
                desc: "Awarded to the project that demonstrates the strongest use of Photon's API. Participants receive access to Photon's API for use during HackGB.",
                image: photonLogo,
                darkBg: true
            }
        ]
    },
    {
        title: "MLH Sponsored Tracks",
        icon: Award,
        color: "#E73356",
        link: "https://www.mlh.com/events/hackgb/prizes",
        prizes: [
            { 
                name: "Best Use of ElevenLabs", 
                prize: "Wireless Earbuds", 
                desc: "Deploy natural, human-sounding audio with ElevenLabs. Create realistic, dynamic, and emotionally expressive voices for any project, from interactive AI companions to narrated stories and voice-enabled apps.",
                image: elevenLabsLogo,
                link: "https://www.mlh.com/events/hackgb/prizes"
            },
            { 
                name: "Best Use of Gemini API", 
                prize: "MLH Swag Kits", 
                desc: "Push the boundaries of what's possible with AI using Google Gemini. Build AI-powered apps with language understanding, research summarization, and multimodal creative generation.",
                image: geminiLogo,
                link: "https://www.mlh.com/events/hackgb/prizes"
            },
            { 
                name: "Best Use of Solana", 
                prize: "Ledger Nano S Plus", 
                desc: "Build fast, scalable, and decentralized applications harnessing Solana's high-speed execution and near-zero transaction costs.",
                image: solanaLogo,
                link: "https://www.mlh.com/events/hackgb/prizes"
            },
            { 
                name: "Best Use of Tiger Data", 
                prize: "Stream Deck Mini", 
                desc: "Leverage Tiger Data's extension of PostgreSQL for ultra-fast real-time data, time-series metrics, complex analytics, and pre-computed continuous aggregates.",
                image: tigerDataLogo,
                link: "https://www.mlh.com/events/hackgb/prizes"
            },
            { 
                name: "Best Use of Presage", 
                prize: "Fitbit Inspire & Presage Perks", 
                desc: "Build with Presage's Human Sensing Layer to track clinically-proven vital signs, movement, emotion, or focus in real time with contactless cameras. Winners also receive free credit refills and 30% off first-year usage.",
                image: presageLogo,
                link: "https://www.mlh.com/events/hackgb/prizes"
            },
            { 
                name: "Best Use of DigitalOcean", 
                prize: "Retro Wireless Mouse", 
                desc: "Deploy on DigitalOcean's reliable cloud platform using Droplets, Managed Databases, App Platform, or Gradient AI for model training and GPU inference.",
                image: digitalOceanLogo,
                link: "https://www.mlh.com/events/hackgb/prizes"
            },
            { 
                name: "Best Domain Name from GoDaddy Registry", 
                prize: "Digital Gift Card", 
                desc: "Register a creative and memorable domain name with GoDaddy Registry for your hackathon project.",
                image: goDaddyRegistryLogo,
                link: "https://www.mlh.com/events/hackgb/prizes"
            }
        ]
    },
    {
        title: "Raffle Items",
        icon: Ticket,
        color: "#4A90D9",
        prizes: [
            { name: "Raffle Prizes", prize: "TBD", desc: "More information about our exciting raffle prizes will be announced soon!" }
        ]
    }
];

const Prizes = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section className="relative pt-20 pb-32 px-4 overflow-hidden" id="prizes">
            {/* Background landmark image with parallax drift */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img src={gbTrailImg} alt="" className="w-full h-full object-cover opacity-[0.35] parallax-bg" />
                <div className="absolute inset-0 bg-[#E37100]/[0.01]" />
            </div>

            {/* Ambient glows */}
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#E37100]/5 rounded-full blur-[150px] pointer-events-none animate-ambient-glow" />
            <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#ffcc00]/5 rounded-full blur-[150px] pointer-events-none animate-ambient-glow" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    {...fadeUp(0)}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-google font-bold mb-4 text-[#0C3C34]">
                        Prizes & Awards
                    </h2>
                    <p className="text-slate-600 font-google-text text-base md:text-lg max-w-2xl mx-auto font-medium">
                        Compete in main tracks or sponsor challenges to win premium hardware, gear, and software credits.
                    </p>
                </motion.div>

                {/* Integrated IDE Prizes Card */}
                <motion.div
                    {...fadeUp(0.1)}
                    className="bg-white/45 backdrop-blur-xl rounded-2xl border border-white/25 shadow-xl overflow-hidden flex flex-col relative"
                >
                    {/* IDE Top Window Bar */}
                    <div className="flex items-center justify-between px-4 py-2 border-b border-black/5 bg-white/30 select-none">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                            <span className="text-[10px] font-google-mono text-slate-550 ml-3">Prize Registry</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-google-mono text-[9px] text-slate-450 bg-slate-200/50 px-2 py-0.5 rounded border border-black/5">
                            <Trophy className="w-3 h-3 text-[#E37100]" />
                            <span>prizes.md</span>
                        </div>
                    </div>

                    {/* Editor Tab Bar */}
                    <div className="flex border-b border-black/5 bg-white/20 overflow-x-auto scrollbar-none select-none">
                        <div className="flex items-center gap-2 px-5 py-3 border-r border-black/5 font-google-mono text-xs font-medium bg-white/60 text-[#0C3C34] border-t-2 border-t-[#E37100] flex-1 justify-center">
                            <Trophy className="w-3.5 h-3.5 text-[#E37100]" />
                            prizes.md
                        </div>
                    </div>

                    {/* Workspace Editor Body */}
                    <div className="p-6 md:p-10 bg-transparent space-y-12">
                        {prizeCategories.map((category, categoryIdx) => {
                            const Icon = category.icon;
                            return (
                                <motion.div key={categoryIdx} {...fadeUp(0.05 * (categoryIdx + 1))}>
                                    <div className="flex items-center justify-between gap-4 mb-6 border-b border-black/10 pb-4">
                                        <div className="flex items-center gap-3">
                                            <div 
                                                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-sm bg-white"
                                                style={{ borderColor: `${category.color}40` }}
                                            >
                                                <Icon className="w-5 h-5" style={{ color: category.color }} />
                                            </div>
                                            <h3 className="font-google font-bold text-2xl text-[#0C3C34]">
                                                {category.title}
                                            </h3>
                                        </div>
                                        {(category as any).link && (
                                            <a 
                                                href={(category as any).link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-google font-bold text-[#E73356] hover:text-white bg-[#E73356]/10 hover:bg-[#E73356] transition-all border border-[#E73356]/20 shadow-xs shrink-0"
                                            >
                                                <span>View on MLH</span>
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        {category.prizes.map((p, prizeIdx) => {
                                            const id = `${categoryIdx}-${prizeIdx}`;
                                            const isExpanded = expandedId === id;
                                            
                                            return (
                                                <div 
                                                    key={prizeIdx} 
                                                    onClick={() => toggleExpand(id)}
                                                    className="flex flex-col p-4 md:p-5 rounded-xl bg-white/50 border border-black/5 hover:bg-white/80 hover:shadow-md transition-all group cursor-pointer"
                                                >
                                                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                                                        <div className="flex-1 pr-4">
                                                            <div className="flex items-center gap-3">
                                                                <ChevronRight 
                                                                    className={`w-4 h-4 text-slate-400 shrink-0 group-hover:text-[#61A644] transition-transform duration-300 ${isExpanded ? 'rotate-90 text-[#61A644]' : ''}`} 
                                                                />
                                                                <h4 className="font-google font-bold text-lg text-[#0C3C34]">{p.name}</h4>
                                                            </div>
                                                        </div>
                                                        <div className="md:text-right ml-7 md:ml-4 mt-2 md:mt-0 shrink-0">
                                                            <span className="font-google font-bold text-[#E37100] md:text-lg tracking-tight">
                                                                {p.prize}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <AnimatePresence>
                                                        {isExpanded && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="overflow-hidden"
                                                            >
                                                                <div className="mt-5 ml-7 pt-5 border-t border-black/5 flex flex-col md:flex-row gap-6 items-start">
                                                                    <div className="flex-1">
                                                                        <h5 className="font-google-mono text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Judging Criteria</h5>
                                                                        <p className="font-google-text text-sm text-slate-600 leading-relaxed font-medium mb-3">
                                                                            {p.desc}
                                                                        </p>
                                                                        {(p as any).link && (
                                                                            <a
                                                                                href={(p as any).link}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                onClick={(e) => e.stopPropagation()}
                                                                                className="inline-flex items-center gap-1.5 text-xs font-google font-bold text-[#E73356] hover:text-[#c42846] transition-colors group/link mt-1"
                                                                            >
                                                                                <span>View challenge on MLH website</span>
                                                                                <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                                                            </a>
                                                                        )}
                                                                    </div>
                                                                    <div className={`w-full md:w-40 h-28 ${(p as any).darkBg ? 'bg-black' : 'bg-white'} rounded-xl border border-black/5 flex flex-col items-center justify-center text-slate-400 shrink-0 shadow-sm overflow-hidden`}>
                                                                        {(p as any).image ? (
                                                                            <img src={(p as any).image} alt={p.name} className="w-full h-full object-contain p-3" />
                                                                        ) : (
                                                                            <>
                                                                                <ImageIcon className="w-6 h-6 mb-2 opacity-40" />
                                                                                <span className="font-google-mono text-[9px] uppercase tracking-wider font-bold">Prize Image</span>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* IDE Bottom Status Bar */}
                    <div className="flex justify-between items-center px-4 py-1.5 bg-[#0c3c34] text-white font-google-mono text-[10px] select-none">
                        <div className="flex items-center gap-3">
                            <span className="font-bold">PRIZES: loaded</span>
                            <span className="opacity-80">Read-only mode</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span>Markdown</span>
                            <span>UTF-8</span>
                            <span>Ln 1, Col 1</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Prizes;
