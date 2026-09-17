import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Linkedin, Globe, Shield, Brain, Code, Server, Database, Lightbulb, Monitor, ChevronLeft, ChevronRight, X } from 'lucide-react';
import gbWaterfrontImg from '../assets/images/background/jpg/gb-waterfront.jpg';

// Judge headshots — import available photos, others will use placeholder
import djayPhoto from '../assets/images/judges/djay-pallavur.jpg';
import ishuPhoto from '../assets/images/judges/ishu-gupta.png';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30, filter: 'blur(6px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.8, delay, ease: spring },
});

interface Judge {
    name: string;
    title: string;
    company: string;
    expertise: string[];
    bio: string;
    photo?: string;
    linkedin?: string;
    website?: string;
    icon: typeof Shield;
    color: string;
}

const judges: Judge[] = [
    {
        name: 'Onkar Mahamuni',
        title: 'Operations Research Engineer',
        company: 'RouteSmart — A FedEx Company',
        expertise: ['Operations Research', 'Algorithms & DS'],
        bio: 'Specializes in routing algorithms, optimization, and logistics software. Develops production C++ algorithms for route planning, sequencing, and network optimization.',
        linkedin: 'https://www.linkedin.com/in/onkarmahamuni',
        icon: Code,
        color: '#61A644',
    },
    {
        name: 'Djay Pallavur Naduvakkat',
        title: 'Software Engineer',
        company: 'Amazon',
        expertise: ['AI/ML', 'Software Engineering', 'UX/UI Design'],
        bio: 'Software Engineer at Amazon and AI graduate researcher at Georgia Tech. Builds intelligent, scalable, and production-ready software systems.',
        photo: djayPhoto,
        linkedin: 'https://www.linkedin.com/dhananjayanpn',
        icon: Brain,
        color: '#E37100',
    },
    {
        name: 'Sreenivasa Rao Basavala',
        title: 'Director',
        company: 'Guidehouse',
        expertise: ['Cybersecurity', 'Cloud Computing', 'AI/ML'],
        bio: 'Hands-on cybersecurity engineering and technology leader with a track record of building successful security programs across industry verticals.',
        linkedin: 'https://www.linkedin.com/in/sreenivasa-rao-b-2739b720/',
        icon: Shield,
        color: '#0C3C34',
    },
    {
        name: 'Azeem Siddiqui',
        title: 'Senior Systems Engineer',
        company: 'Clear Markets',
        expertise: ['Distributed Systems', 'Fintech', 'Cloud & DevOps'],
        bio: 'Specializes in cloud infrastructure, cybersecurity, DevOps, distributed systems, and enterprise AI infrastructure for secure, reliable production platforms.',
        icon: Server,
        color: '#4A90D9',
    },
    {
        name: 'Sandeep Bommisetti',
        title: 'Director, Cybersecurity',
        company: 'NielsenIQ',
        expertise: ['Cybersecurity', 'IAM/PAM', 'Cloud & AI'],
        bio: 'Cybersecurity leader with 14+ years architecting large-scale IAM, PAM, and Identity Security programs across global enterprises.',
        linkedin: 'https://www.linkedin.com/in/sandeep-bommisetti',
        website: 'https://bommisetti.com/',
        icon: Shield,
        color: '#E37100',
    },
    {
        name: 'Sai Prasanth Vadlamudi',
        title: 'Data Engineer',
        company: 'Liviniti',
        expertise: ['Data Engineering', 'Healthcare Tech', 'AI/ML'],
        bio: 'Specializes in building high-performance data pipelines and seamless system integrations. Architects scalable ETL workflows that transform raw data into real-time business intelligence.',
        icon: Database,
        color: '#61A644',
    },
    {
        name: 'Ishu Gupta',
        title: 'Lead — Innovation and Data Strategy',
        company: 'City of Green Bay',
        expertise: ['AI/ML', 'Data Science', 'Product Management'],
        bio: 'Leads the City of Green Bay\'s innovation and data strategy. Drives the City\'s approach to data, technology, and capacity building — moving from technology pilots to trusted, scalable implementation.',
        photo: ishuPhoto,
        linkedin: 'https://www.linkedin.com/in/ishu-gupta-29b51869/',
        website: 'https://city-innovation.net/our-members/ishu-gupta/',
        icon: Lightbulb,
        color: '#E37100',
    },
    {
        name: 'Ryan Appel',
        title: 'Software/Web Development Instructor',
        company: 'Fox Valley Technical College',
        expertise: ['Software Engineering', 'Cloud & DevOps', 'Game Dev'],
        bio: 'Holds a B.S. in Computer Science and Applied Mathematics with a professional background in game development for Nintendo consoles. Currently teaches software and web development, bringing real-world experience into the classroom.',
        linkedin: 'https://www.linkedin.com/in/ryanappel/',
        icon: Monitor,
        color: '#4A90D9',
    },
];

/* ── Judge Card ── */
const JudgeCard = ({ judge, onExpand }: { judge: Judge; onExpand: () => void }) => {
    const IconComponent = judge.icon;
    return (
        <div className="group relative bg-white/70 hover:bg-white/90 border border-black/5 hover:border-black/10 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 min-w-0 w-full h-full">
            {/* Colored accent bar */}
            <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${judge.color}, ${judge.color}80)` }} />

            <div className="p-5 flex flex-col items-center text-center flex-1">
                {/* Photo or Placeholder */}
                <div className="relative mb-4 shrink-0">
                    {judge.photo ? (
                        <img
                            src={judge.photo}
                            alt={judge.name}
                            className="w-24 h-24 rounded-full object-cover border-3 shadow-lg transition-transform duration-300 group-hover:scale-110"
                            style={{ borderColor: `${judge.color}50` }}
                        />
                    ) : (
                        <div
                            className="w-24 h-24 rounded-full flex items-center justify-center border-3 shadow-lg transition-transform duration-300 group-hover:scale-110"
                            style={{
                                background: `linear-gradient(135deg, ${judge.color}18, ${judge.color}08)`,
                                borderColor: `${judge.color}35`,
                            }}
                        >
                            <User className="w-10 h-10" style={{ color: `${judge.color}` }} />
                        </div>
                    )}
                    {/* Expertise icon badge */}
                    <div
                        className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-md"
                        style={{ backgroundColor: judge.color }}
                    >
                        <IconComponent className="w-4 h-4 text-white" />
                    </div>
                </div>

                {/* Name */}
                <h3 className="font-google font-bold text-base text-[#0C3C34] mb-0.5 leading-tight">
                    {judge.name}
                </h3>

                {/* Title & Company */}
                <p className="text-slate-500 font-google-text text-[11px] font-semibold mb-2 leading-snug">
                    {judge.title}
                    <span className="text-slate-400"> @ {judge.company}</span>
                </p>

                {/* Bio — truncated */}
                <p className="text-slate-500 font-google-text text-[11px] leading-relaxed mb-3 line-clamp-2">
                    {judge.bio}
                </p>

                {/* Expertise tags */}
                <div className="flex flex-wrap gap-1.5 justify-center mb-3">
                    {judge.expertise.slice(0, 2).map((tag, tagIdx) => (
                        <span
                            key={tagIdx}
                            className="text-[8px] font-google-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                            style={{
                                color: judge.color,
                                backgroundColor: `${judge.color}10`,
                                borderColor: `${judge.color}20`,
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Bottom row: links + See More */}
                <div className="flex items-center justify-between w-full mt-auto pt-2 border-t border-black/5">
                    <div className="flex items-center gap-2">
                        {judge.linkedin && (
                            <a
                                href={judge.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-[#0077B5] transition-colors"
                                title="LinkedIn"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Linkedin className="w-3.5 h-3.5" />
                            </a>
                        )}
                        {judge.website && (
                            <a
                                href={judge.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-[#61A644] transition-colors"
                                title="Website"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Globe className="w-3.5 h-3.5" />
                            </a>
                        )}
                    </div>
                    <button
                        onClick={onExpand}
                        className="text-[11px] font-google-text font-bold text-slate-500 hover:text-[#61A644] transition-colors cursor-pointer"
                    >
                        Meet the Judge →
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ── Judge Profile Modal ── */
const JudgeModal = ({ judge, onClose }: { judge: Judge; onClose: () => void }) => {
    const IconComponent = judge.icon;
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ duration: 0.35, ease: spring }}
                className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl max-w-lg w-full relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Colored header band */}
                <div className="h-24 relative" style={{ background: `linear-gradient(135deg, ${judge.color}, ${judge.color}90)` }}>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-50" />
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors cursor-pointer"
                    >
                        <X className="w-4 h-4 text-white" />
                    </button>
                </div>

                {/* Avatar overlapping header */}
                <div className="flex justify-center -mt-14 relative z-10">
                    <div className="relative">
                        {judge.photo ? (
                            <img
                                src={judge.photo}
                                alt={judge.name}
                                className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-xl"
                            />
                        ) : (
                            <div
                                className="w-28 h-28 rounded-2xl flex items-center justify-center border-4 border-white shadow-xl"
                                style={{ background: `linear-gradient(135deg, ${judge.color}25, ${judge.color}10)` }}
                            >
                                <User className="w-12 h-12" style={{ color: judge.color }} />
                            </div>
                        )}
                        <div
                            className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl flex items-center justify-center border-3 border-white shadow-md"
                            style={{ backgroundColor: judge.color }}
                        >
                            <IconComponent className="w-5 h-5 text-white" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="px-7 pt-5 pb-7 text-center">
                    <h3 className="font-google font-bold text-2xl text-[#0C3C34] mb-1">{judge.name}</h3>
                    <p className="text-slate-500 font-google-text text-sm font-semibold">
                        {judge.title}
                    </p>
                    <p className="text-slate-400 font-google-text text-sm font-medium mb-4">
                        @ {judge.company}
                    </p>

                    {/* Links */}
                    <div className="flex items-center gap-3 justify-center mb-5">
                        {judge.linkedin && (
                            <a
                                href={judge.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-xs font-google-mono text-[#0077B5] hover:underline font-bold bg-[#0077B5]/8 px-3 py-1.5 rounded-full"
                            >
                                <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                            </a>
                        )}
                        {judge.website && (
                            <a
                                href={judge.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-xs font-google-mono text-[#61A644] hover:underline font-bold bg-[#61A644]/8 px-3 py-1.5 rounded-full"
                            >
                                <Globe className="w-3.5 h-3.5" /> Website
                            </a>
                        )}
                    </div>

                    {/* Bio */}
                    <div className="bg-slate-50 rounded-xl p-4 text-left mb-5 border border-black/5">
                        <p className="text-slate-600 font-google-text text-sm leading-relaxed font-medium">
                            {judge.bio}
                        </p>
                    </div>

                    {/* All expertise tags */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        {judge.expertise.map((tag, tagIdx) => (
                            <span
                                key={tagIdx}
                                className="text-[10px] font-google-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border"
                                style={{
                                    color: judge.color,
                                    backgroundColor: `${judge.color}10`,
                                    borderColor: `${judge.color}20`,
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

/* ── Main Judges Carousel Section ── */
const Judges = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showAll, setShowAll] = useState(false);
    const [selectedJudge, setSelectedJudge] = useState<Judge | null>(null);
    const [cardsPerView, setCardsPerView] = useState(3);
    const trackRef = useRef<HTMLDivElement>(null);

    // Responsive cards per view
    useEffect(() => {
        const update = () => {
            if (window.innerWidth < 640) setCardsPerView(1);
            else if (window.innerWidth < 1024) setCardsPerView(2);
            else setCardsPerView(3);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const maxIndex = Math.max(0, judges.length - cardsPerView);

    const prev = useCallback(() => setActiveIndex((i) => Math.max(0, i - 1)), []);
    const next = useCallback(() => setActiveIndex((i) => Math.min(maxIndex, i + 1)), [maxIndex]);

    // Clamp on resize
    useEffect(() => {
        if (activeIndex > maxIndex) setActiveIndex(maxIndex);
    }, [maxIndex, activeIndex]);

    // Auto-advance every 5s (only when not showing all)
    useEffect(() => {
        if (showAll) return;
        const timer = setInterval(() => {
            setActiveIndex((i) => (i >= maxIndex ? 0 : i + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, [maxIndex, showAll]);

    return (
        <section className="relative pt-20 pb-32 px-4 overflow-hidden" id="judges">
            {/* Background landmark image with parallax drift */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img src={gbWaterfrontImg} alt="" className="w-full h-full object-cover opacity-[0.35] parallax-bg" />
                <div className="absolute inset-0 bg-[#0C3C34]/[0.01]" />
            </div>

            {/* Ambient glows */}
            <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-[#61A644]/5 rounded-full blur-[150px] pointer-events-none animate-ambient-glow" />
            <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-[#E37100]/5 rounded-full blur-[150px] pointer-events-none animate-ambient-glow" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    {...fadeUp(0)}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-google font-bold mb-4 text-[#0C3C34]">
                        Meet Our Judges
                    </h2>
                    <p className="text-slate-600 font-google-text text-base md:text-lg max-w-2xl mx-auto font-medium">
                        Industry leaders and engineers who will evaluate your projects and award prizes.
                    </p>
                </motion.div>

                {/* IDE Card */}
                <motion.div
                    {...fadeUp(0.1)}
                    className="bg-white/45 backdrop-blur-xl rounded-2xl border border-white/25 shadow-xl overflow-hidden flex flex-col"
                >
                    {/* IDE Top Window Bar */}
                    <div className="flex items-center justify-between px-4 py-2 border-b border-black/5 bg-white/30 select-none">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                            <span className="text-[10px] font-google-mono text-slate-550 ml-3">Judging Panel</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-google-mono text-[9px] text-slate-450 bg-slate-200/50 px-2 py-0.5 rounded border border-black/5">
                            <Shield className="w-3 h-3 text-[#61A644]" />
                            <span>judges.json</span>
                        </div>
                    </div>

                    {/* Editor Tab Bar */}
                    <div className="flex border-b border-black/5 bg-white/20 overflow-x-auto scrollbar-none select-none">
                        <div className="flex items-center gap-2 px-5 py-3 border-r border-black/5 font-google-mono text-xs font-medium bg-white/60 text-[#0C3C34] border-t-2 border-t-[#61A644] flex-1 justify-center">
                            <Shield className="w-3.5 h-3.5 text-[#61A644]" />
                            judges.json
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {!showAll ? (
                            /* ── Carousel View ── */
                            <motion.div
                                key="carousel"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="relative p-6 md:p-8">
                                    {/* Prev / Next Buttons */}
                                    <button
                                        onClick={prev}
                                        disabled={activeIndex === 0}
                                        className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-black/10 shadow-lg flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-default cursor-pointer"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-[#0C3C34]" />
                                    </button>
                                    <button
                                        onClick={next}
                                        disabled={activeIndex >= maxIndex}
                                        className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-black/10 shadow-lg flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-default cursor-pointer"
                                    >
                                        <ChevronRight className="w-5 h-5 text-[#0C3C34]" />
                                    </button>

                                    {/* Carousel Track */}
                                    <div className="overflow-hidden mx-8 md:mx-10" ref={trackRef}>
                                        <motion.div
                                            className="flex gap-5"
                                            animate={{ x: `calc(-${activeIndex * (100 / cardsPerView)}% - ${activeIndex * (20 / cardsPerView)}px)` }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        >
                                            {judges.map((judge, idx) => (
                                                <div
                                                    key={idx}
                                                    className="shrink-0"
                                                    style={{ width: `calc(${100 / cardsPerView}% - ${(cardsPerView - 1) * 20 / cardsPerView}px)` }}
                                                >
                                                    <JudgeCard judge={judge} onExpand={() => setSelectedJudge(judge)} />
                                                </div>
                                            ))}
                                        </motion.div>
                                    </div>

                                    {/* Dot indicators */}
                                    <div className="flex items-center justify-center gap-2 mt-6">
                                        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActiveIndex(i)}
                                                className={`rounded-full transition-all duration-300 cursor-pointer ${
                                                    i === activeIndex
                                                        ? 'w-6 h-2 bg-[#61A644]'
                                                        : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* See All Button */}
                                <div className="px-6 md:px-8 pb-6 flex justify-center">
                                    <button
                                        onClick={() => setShowAll(true)}
                                        className="px-8 py-2.5 rounded-full bg-[#61A644] hover:bg-[#61A644]/90 text-white font-google font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md active:scale-[0.98]"
                                    >
                                        Explore All Judges
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            /* ── Expanded Grid View ── */
                            <motion.div
                                key="grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                    {judges.map((judge, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: idx * 0.05, ease: spring }}
                                        >
                                            <JudgeCard judge={judge} onExpand={() => setSelectedJudge(judge)} />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Show Less Button */}
                                <div className="px-6 md:px-8 pb-6 flex justify-center">
                                    <button
                                        onClick={() => setShowAll(false)}
                                        className="px-8 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-black/5 text-slate-600 font-google font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Collapse Panel
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* IDE Bottom Status Bar */}
                    <div className="flex justify-between items-center px-4 py-1.5 bg-[#0c3c34] text-white font-google-mono text-[10px] select-none">
                        <div className="flex items-center gap-3">
                            <span className="font-bold">JUDGES: {judges.length} confirmed</span>
                            <span className="opacity-80">{showAll ? 'Showing all' : 'Panel ready'}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span>JSON</span>
                            <span>UTF-8</span>
                            <span>{showAll ? `${judges.length} items` : `Ln ${activeIndex + 1}, Col 1`}</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Judge Profile Modal */}
            <AnimatePresence>
                {selectedJudge && (
                    <JudgeModal judge={selectedJudge} onClose={() => setSelectedJudge(null)} />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Judges;
