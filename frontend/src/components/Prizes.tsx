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

import vultrLogo from '../assets/images/sponsors/mlh/vultr.png';
import geminiLogo from '../assets/images/sponsors/mlh/gemini.png';
import solanaLogo from '../assets/images/sponsors/mlh/solana.png';
import tigerDataLogo from '../assets/images/sponsors/mlh/tiger-data.png';
import presageLogo from '../assets/images/sponsors/mlh/presage.png';
import digitalOceanLogo from '../assets/images/sponsors/mlh/digitalocean.png';
import goDaddyRegistryLogo from '../assets/images/sponsors/mlh/godaddy-registry.png';

// Raffle prize image assets
import raffleLegoWalleImg from '../assets/images/prizes/raffle/lego_walle.jpg';
import raffleInsigniaStandImg from '../assets/images/prizes/raffle/insignia_stand.jpg';
import raffle8bitdoImg from '../assets/images/prizes/raffle/8bitdo_controller.jpg';
import raffleLogitechG305WhiteImg from '../assets/images/prizes/raffle/logitech_g305_white.jpg';
import raffleLogitechG305BlackImg from '../assets/images/prizes/raffle/logitech_g305_black.jpg';
import raffleHyperxEveImg from '../assets/images/prizes/raffle/hyperx_eve.jpg';
import raffleLogitechG502Img from '../assets/images/prizes/raffle/logitech_g502.jpg';
import raffleLegoBugattiImg from '../assets/images/prizes/raffle/lego_bugatti.jpg';
import raffleJblTune730btImg from '../assets/images/prizes/raffle/jbl_tune730bt.jpg';
import raffleLegoGameboyImg from '../assets/images/prizes/raffle/lego_gameboy.jpg';
import raffleJblFlip7Img from '../assets/images/prizes/raffle/jbl_flip7.jpg';
import raffleAocMonitorImg from '../assets/images/prizes/raffle/aoc_monitor.jpg';

export interface RaffleItem {
    name: string;
    tag: string;
    quantity?: number;
    desc: string;
    image: string;
    link?: string;
}

export interface PrizeItem {
    name: string;
    prize: string;
    desc: string;
    image?: string;
    darkBg?: boolean;
    link?: string;
    itemsCount?: number;
    previewChips?: string[];
    items?: RaffleItem[];
}

export interface PrizeCategory {
    title: string;
    icon: any;
    color: string;
    link?: string;
    prizes: PrizeItem[];
}

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30, filter: 'blur(6px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.8, delay, ease: spring },
});

const prizeCategories: PrizeCategory[] = [
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
                name: "Best Hardware Hack", 
                prize: "CanaKit - Raspberry Pi 5 Essentials Starter Kit (4GB)", 
                desc: "Awarded to the best integration of physical hardware and software.",
                image: raspberryPi5Img
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
                name: "Best Use of Vultr", 
                prize: "M5Stack Official Tab5", 
                desc: "Vultr empowers hackers to bring their high-performance projects to life instantly; providing everything from the speed of one-click deployment and scalable cloud compute to specialized Vultr Cloud GPUs that can power AI-driven applications. Push the limits of what can be built when infrastructure is no longer the bottleneck!",
                image: vultrLogo,
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
            { 
                name: "Raffle Draw #1", 
                prize: "5 Tech & Gaming Prizes", 
                desc: "Turn in your raffle tickets during Draw #1 for a chance to win one of 5 awesome gear, gaming, and collectible prizes! All registered hackers are eligible.",
                itemsCount: 5,
                previewChips: [
                    "HyperX Keyboard", 
                    "Insignia Stand", 
                    "8BitDo Controller", 
                    "Logitech G305 (White)", 
                    "LEGO WALL-E & EVE"
                ],
                items: [
                    {
                        name: "HyperX - Eve 1800 Wired Membrane Gaming Keyboard",
                        tag: "Gaming Keyboard",
                        desc: "Compact 1800 membrane gaming keyboard with vibrant multi-zone RGB backlighting, quiet tactile keys, and a durable spill-resistant design.",
                        image: raffleHyperxEveImg
                    },
                    {
                        name: "Insignia™ - Laptop Stand",
                        tag: "Ergonomic Gear",
                        desc: "Sturdy aluminum laptop stand with adjustable height and viewing angle for laptops up to 17\" wide, improving posture and cooling airflow.",
                        image: raffleInsigniaStandImg
                    },
                    {
                        name: "8BitDo - Ultimate 2C Bluetooth Wireless Gaming Controller",
                        tag: "Wireless Controller",
                        desc: "Transparent Black wireless controller featuring smooth Hall effect joysticks, ultra-low latency wireless connectivity, and remappable bumpers.",
                        image: raffle8bitdoImg
                    },
                    {
                        name: "(White) Logitech - G305 LIGHTSPEED Wireless Mouse",
                        tag: "Wireless Mouse",
                        desc: "High-performance LIGHTSPEED wireless mouse in crisp white with a 12,000 DPI HERO sensor and an incredible 250-hour battery life.",
                        image: raffleLogitechG305WhiteImg
                    },
                    {
                        name: "LEGO - Disney and Pixar WALL-E and EVE (43279)",
                        tag: "LEGO Collectible",
                        desc: "Detailed 811-piece Disney and Pixar building set featuring posable WALL-E, EVE, and M-O display figures (Set 43279).",
                        image: raffleLegoWalleImg
                    }
                ]
            },
            { 
                name: "Raffle Draw #2", 
                prize: "7 Tech & Gaming Prizes", 
                desc: "Our largest raffle pool of the weekend with 7 total prizes up for grabs! Featuring multiple chances to win top-tier gaming mice, controllers, keyboards, and a LEGO Technic hypercar.",
                itemsCount: 7,
                previewChips: [
                    "2x Logitech G502", 
                    "HyperX Keyboard", 
                    "2x 8BitDo Controller", 
                    "Logitech G305 (Black)", 
                    "LEGO Bugatti Chiron"
                ],
                items: [
                    {
                        name: "Logitech - G502 HERO Wired Mouse",
                        tag: "Gaming Mouse",
                        quantity: 2,
                        desc: "World-renowned gaming mouse equipped with the advanced HERO 25K sensor, 11 programmable buttons, customizable RGB lighting, and tunable weights.",
                        image: raffleLogitechG502Img
                    },
                    {
                        name: "HyperX - Eve 1800 Wired Membrane Gaming Keyboard",
                        tag: "Gaming Keyboard",
                        desc: "Compact 1800 wired membrane gaming keyboard featuring responsive keystrokes, numeric keypad, and dynamic RGB illumination.",
                        image: raffleHyperxEveImg
                    },
                    {
                        name: "8BitDo - Ultimate 2C Bluetooth Wireless Gaming Controller",
                        tag: "Wireless Controller",
                        quantity: 2,
                        desc: "Transparent Black edition with precision Hall effect thumbsticks, tactile switches, and multi-platform wireless support.",
                        image: raffle8bitdoImg
                    },
                    {
                        name: "(Black) Logitech - G305 LIGHTSPEED Wireless Mouse",
                        tag: "Wireless Mouse",
                        desc: "Classic black ultra-fast LIGHTSPEED wireless gaming mouse with 1ms response rate, 12K HERO sensor, and compact portable build.",
                        image: raffleLogitechG305BlackImg
                    },
                    {
                        name: "LEGO - Technic Bugatti Chiron Pur Sport Hypercar (42222)",
                        tag: "LEGO Technic",
                        desc: "Intricate 771-piece Technic hypercar model featuring authentic aerodynamics, working steering, realistic engine, and opening doors (Set 42222).",
                        image: raffleLegoBugattiImg
                    }
                ]
            },
            { 
                name: "Raffle Draw #3", 
                prize: "5 Tech, Audio & Display Prizes", 
                desc: "The grand finale raffle draw! Featuring high-fidelity wireless headphones, a portable USB-C monitor, waterproof speaker, retro 3D LEGO Game Boy, and Logitech G502.",
                itemsCount: 5,
                previewChips: [
                    "JBL Tune 730BT", 
                    "AOC 15.6\" Monitor", 
                    "JBL FLIP7 Speaker", 
                    "LEGO Game Boy 3D", 
                    "Logitech G502"
                ],
                items: [
                    {
                        name: "JBL - Tune 730BT - Wireless over-the-ear headphones",
                        tag: "Over-Ear Audio",
                        desc: "Comfortable wireless Bluetooth over-ear headphones with signature JBL Pure Bass Sound, lightweight foldable frame, and up to 76 hours of battery.",
                        image: raffleJblTune730btImg
                    },
                    {
                        name: "Logitech - G502 HERO Wired Mouse",
                        tag: "Gaming Mouse",
                        desc: "High-performance wired mouse with 25,600 max DPI HERO sensor, onboard memory profiles, and 11 programmable controls.",
                        image: raffleLogitechG502Img
                    },
                    {
                        name: "LEGO - Game Boy 3D (72046)",
                        tag: "LEGO Collectible",
                        desc: "Nostalgic 421-piece 3D building set replicating the classic retro Nintendo Game Boy console with interchangeable game cartridges (Set 72046).",
                        image: raffleLegoGameboyImg
                    },
                    {
                        name: "JBL - FLIP7 Portable Waterproof Speaker - Black",
                        tag: "Waterproof Audio",
                        desc: "IP67 waterproof and dustproof portable Bluetooth speaker delivering booming JBL Pro Sound with dual pumping bass radiators.",
                        image: raffleJblFlip7Img
                    },
                    {
                        name: 'AOC - 16T35 15.6" IPS Panel Portable Monitor',
                        tag: "Portable Display",
                        desc: "Ultra-slim 15.6\" Full HD (1920x1080) IPS portable monitor with USB-C connectivity, ideal for dual-screen productivity anywhere.",
                        image: raffleAocMonitorImg
                    }
                ]
            }
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
                <img src={gbTrailImg} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover opacity-[0.35] parallax-bg" />
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
                        $12K+ in prizes! Compete in main tracks, sponsor challenges, and raffles to win premium hardware, gear, and software credits.
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
                                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                                        <div className="flex-1 pr-4">
                                                            <div className="flex items-center gap-3">
                                                                <ChevronRight 
                                                                    className={`w-4 h-4 text-slate-400 shrink-0 group-hover:text-[#61A644] transition-transform duration-300 ${isExpanded ? 'rotate-90 text-[#61A644]' : ''}`} 
                                                                />
                                                                <h4 className="font-google font-bold text-lg text-[#0C3C34]">{p.name}</h4>
                                                                {p.itemsCount && (
                                                                    <span className="text-[10px] font-google-mono font-bold px-2 py-0.5 rounded-full bg-[#4A90D9]/10 text-[#4A90D9] border border-[#4A90D9]/20 shrink-0">
                                                                        {p.itemsCount} Prizes
                                                                    </span>
                                                                )}
                                                            </div>
                                                            {p.previewChips && p.previewChips.length > 0 && (
                                                                <div className="hidden sm:flex flex-wrap gap-1.5 mt-2 ml-7">
                                                                    {p.previewChips.map((chip, idx) => (
                                                                        <span key={idx} className="text-[10px] font-google-mono text-slate-500 bg-black/[0.03] px-2 py-0.5 rounded border border-black/5">
                                                                            {chip}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="md:text-right ml-7 md:ml-4 mt-1 md:mt-0 shrink-0">
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
                                                                {p.items && p.items.length > 0 ? (
                                                                    /* Rich Raffle Draw items grid */
                                                                    <div className="mt-5 ml-2 md:ml-7 pt-5 border-t border-black/5">
                                                                        <div className="mb-4">
                                                                            <h5 className="font-google-mono text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                                                                Draw Details & Overview
                                                                            </h5>
                                                                            <p className="font-google-text text-sm text-slate-600 leading-relaxed font-medium">
                                                                                {p.desc}
                                                                            </p>
                                                                        </div>

                                                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-4">
                                                                            {p.items.map((item, itemIdx) => (
                                                                                <div 
                                                                                    key={itemIdx}
                                                                                    className="bg-white/85 rounded-xl p-3.5 border border-black/5 shadow-2xs flex flex-col hover:shadow-md hover:border-[#4A90D9]/30 transition-all group/item"
                                                                                >
                                                                                    <div className="w-full h-32 bg-white rounded-lg border border-black/5 flex items-center justify-center p-2 mb-3 overflow-hidden">
                                                                                        <img 
                                                                                            src={item.image} 
                                                                                            alt={item.name} 
                                                                                            loading="lazy" 
                                                                                            decoding="async" 
                                                                                            className="w-full h-full object-contain group-hover/item:scale-105 transition-transform duration-300" 
                                                                                        />
                                                                                    </div>
                                                                                    <div className="flex items-center justify-between gap-1.5 mb-1.5">
                                                                                        <span className="text-[10px] font-google-mono font-bold uppercase tracking-wider text-[#4A90D9] bg-[#4A90D9]/10 px-2 py-0.5 rounded">
                                                                                            {item.tag}
                                                                                        </span>
                                                                                        {item.quantity && item.quantity > 1 && (
                                                                                            <span className="text-[10px] font-google-mono font-bold text-[#E37100] bg-[#E37100]/10 px-2 py-0.5 rounded border border-[#E37100]/20">
                                                                                                {item.quantity} Available
                                                                                            </span>
                                                                                        )}
                                                                                    </div>
                                                                                    <h5 className="font-google font-bold text-sm text-[#0C3C34] leading-snug mb-1.5 line-clamp-2">
                                                                                        {item.name}
                                                                                    </h5>
                                                                                    <p className="font-google-text text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
                                                                                        {item.desc}
                                                                                    </p>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    /* Standard prize view (Overall, Track, Sponsor, MLH) */
                                                                    <div className="mt-5 ml-7 pt-5 border-t border-black/5 flex flex-col md:flex-row gap-6 items-start">
                                                                        <div className="flex-1">
                                                                            <h5 className="font-google-mono text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                                                                {category.title === "Raffle Items" ? "Prize Details" : "Judging Criteria"}
                                                                            </h5>
                                                                            <p className="font-google-text text-sm text-slate-600 leading-relaxed font-medium mb-3">
                                                                                {p.desc}
                                                                            </p>
                                                                            {p.link && (
                                                                                <a
                                                                                    href={p.link}
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
                                                                        <div className={`w-full md:w-40 h-28 ${p.darkBg ? 'bg-black' : 'bg-white'} rounded-xl border border-black/5 flex flex-col items-center justify-center text-slate-400 shrink-0 shadow-sm overflow-hidden`}>
                                                                            {p.image ? (
                                                                                <img src={p.image} alt={p.name} loading="lazy" decoding="async" className="w-full h-full object-contain p-3" />
                                                                            ) : (
                                                                                <>
                                                                                    <ImageIcon className="w-6 h-6 mb-2 opacity-40" />
                                                                                    <span className="font-google-mono text-[9px] uppercase tracking-wider font-bold">Prize Image</span>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                )}
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
