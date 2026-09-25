import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Globe, Shield, Sparkles, ChevronLeft, ChevronRight, X, ArrowUpRight, Search, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import gbWaterfrontImg from '../assets/images/background/jpg/gb-waterfront.jpg';

// Judge & Mentor headshots
import djayPhoto from '../assets/images/judges/djay-pallavur.jpg';
import ishuPhoto from '../assets/images/judges/ishu-gupta.png';
import onkarPhoto from '../assets/images/judges/onkar-mahamuni.png';
import ryanPhoto from '../assets/images/judges/ryan-appel.png';
import sandeepPhoto from '../assets/images/judges/sandeep-bommisetti.png';
import sreenivasaPhoto from '../assets/images/judges/sreenivasa-rao.png';
import nagaPhoto from '../assets/images/judges/naga-lalitha.jpg';
import vikasPhoto from '../assets/images/judges/vikas-luthra.jpg';
import azeemPhoto from '../assets/images/judges/azeem.png';
import jacquesPhoto from '../assets/images/judges/jacques.png';
import karthikPhoto from '../assets/images/judges/karthik.png';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.6, delay, ease: spring },
});

export interface Judge {
    name: string;
    title: string;
    company: string;
    expertise: string[];
    bio: string;
    photo?: string;
    linkedin?: string;
    website?: string;
    isMentor?: boolean;
    mentorTopics?: string[];
}

const judges: Judge[] = [
    {
        name: 'Onkar Mahamuni',
        title: 'Operations Research Engineer',
        company: 'RouteSmart — A FedEx Company',
        expertise: ['Operations Research', 'Algorithms & Optimization'],
        bio: 'Specializes in routing algorithms, optimization, and logistics software. Develops production C++ algorithms for route planning, sequencing, and network optimization.',
        photo: onkarPhoto,
        linkedin: 'https://www.linkedin.com/in/onkarmahamuni',
        isMentor: false,
    },
    {
        name: 'Djay Pallavur Naduvakkat',
        title: 'Software Engineer',
        company: 'Amazon',
        expertise: ['AI/ML', 'Software Engineering', 'UX/UI Design'],
        bio: 'Software Engineer at Amazon and AI graduate researcher at Georgia Tech. Builds intelligent, scalable, and production-ready software systems.',
        photo: djayPhoto,
        linkedin: 'https://www.linkedin.com/in/dhananjayanpn/',
        isMentor: false,
    },
    {
        name: 'Karthik Chandrasekaran',
        title: 'Principal Software Engineering Manager',
        company: 'Microsoft',
        expertise: ['AI/ML', 'Cloud & DevOps', 'Enterprise Search'],
        bio: 'Principal Software Engineering Leader at Microsoft, leading engineering strategy for search, retrieval platforms, and agent infrastructure powering Microsoft 365 Copilot. With prior engineering leadership roles at Apple and Capital One, he specializes in AI/ML, cloud infrastructure, enterprise search systems, and identity platforms.',
        photo: karthikPhoto,
        linkedin: 'https://www.linkedin.com/in/tokarthikc',
        isMentor: true,
        mentorTopics: ['Enterprise AI', 'Product Architecture', 'Software Engineering'],
    },
    {
        name: 'Jacques Tulowitzky',
        title: 'Founder',
        company: 'Groundwork',
        expertise: ['Artificial Intelligence & ML', 'Agentic Systems', 'UX/UI Design'],
        bio: 'Founder of Groundwork, an AI consultancy in Oshkosh, Wisconsin, helping teams implement applied AI, multi-agent orchestration, and governance. His work spans agentic workflows, knowledge and memory infrastructure, and AI security, informed by a background in systems, accounting, and AI research.',
        photo: jacquesPhoto,
        linkedin: 'https://www.linkedin.com/in/jacquestulowitzky',
        isMentor: true,
        mentorTopics: ['Agentic Workflows', 'Multi-Agent Systems', 'AI Governance & Security', 'Business Pitching'],
    },
    {
        name: 'Sreenivasa Rao Basavala',
        title: 'Director',
        company: 'Guidehouse',
        expertise: ['Cybersecurity', 'Cloud Computing', 'AI/ML'],
        bio: 'Hands-on cybersecurity engineering and technology leader with a track record of building successful security programs across industry verticals.',
        photo: sreenivasaPhoto,
        linkedin: 'https://www.linkedin.com/in/sreenivasa-rao-b-2739b720/',
        isMentor: false,
    },
    {
        name: 'Naga Lalitha Sree Thatavarthi',
        title: 'Senior Software Engineer',
        company: 'American Physical Therapy Association',
        expertise: ['Full Stack Web', 'AI & Agentic Systems', 'Cloud & DevOps'],
        bio: 'Senior Software Engineer and Full Stack Web Developer at APTA with five years of experience building enterprise web applications, APIs, and system integrations. Her expertise spans C#, .NET, JavaScript, SQL, cloud-based systems, and AI-powered application development, including LLMs, RAG, and agentic AI.',
        photo: nagaPhoto,
        linkedin: 'https://www.linkedin.com/in/nagalalithasree-thatavarthi',
        isMentor: true,
        mentorTopics: ['Full Stack Web', 'AI & Agentic Systems', 'Software Engineering'],
    },
    {
        name: 'Azeem Siddiqui',
        title: 'Senior Systems Engineer',
        company: 'Clear Markets',
        expertise: ['Distributed Systems', 'Fintech', 'Cloud & DevOps'],
        bio: 'Specializes in cloud infrastructure, cybersecurity, DevOps, distributed systems, and enterprise AI infrastructure for secure, reliable production platforms.',
        photo: azeemPhoto,
        isMentor: false,
    },
    {
        name: 'Vikas Luthra',
        title: 'Technical Lead — Digital Platforms',
        company: 'Komatsu America Corp',
        expertise: ['Distributed Systems', 'Enterprise Architecture', 'AI-Agent Systems'],
        bio: 'Enterprise Solution Architect at Komatsu America Corp, where he leads modern application architecture, technology selection, and Scaled Agile delivery across teams of developers and architects. His work spans enterprise solution design and applied AI, including AI-agent systems and provenance, which he writes and speaks about at industry conferences.',
        photo: vikasPhoto,
        linkedin: 'https://www.linkedin.com/in/vikas-luthra-crm/',
        isMentor: false,
    },
    {
        name: 'Sandeep Bommisetti',
        title: 'Director, Cybersecurity',
        company: 'NielsenIQ',
        expertise: ['Cybersecurity', 'IAM/PAM', 'Cloud & AI'],
        bio: 'Cybersecurity leader with 14+ years architecting large-scale IAM, PAM, and Identity Security programs across global enterprises.',
        photo: sandeepPhoto,
        linkedin: 'https://www.linkedin.com/in/sandeep-bommisetti',
        website: 'https://bommisetti.com/',
        isMentor: false,
    },
    {
        name: 'Zaineel Mithani',
        title: 'Software Engineer',
        company: 'Fidelity Investments',
        expertise: ['Distributed Systems', 'Cloud & DevOps', 'Backend Engineering'],
        bio: 'Full Stack Software Engineer with experience building cloud-native applications and scalable backend systems using Java, Spring Boot, AWS, and modern distributed technologies. He is passionate about software engineering, AI, and building impactful technology solutions.',
        isMentor: true,
        mentorTopics: ['Java & Spring Boot', 'AWS & Cloud', 'Kafka', 'Backend Architecture'],
    },
    {
        name: 'Sai Prasanth Vadlamudi',
        title: 'Data Engineer',
        company: 'Liviniti',
        expertise: ['Data Engineering', 'Healthcare Tech', 'AI/ML'],
        bio: 'Specializes in building high-performance data pipelines and seamless system integrations. Architects scalable ETL workflows that transform raw data into real-time business intelligence.',
        isMentor: false,
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
        isMentor: false,
    },
    {
        name: 'Ryan Appel',
        title: 'Software/Web Development Instructor',
        company: 'Fox Valley Technical College',
        expertise: ['Software Engineering', 'Cloud & DevOps', 'Game Dev'],
        bio: 'Holds a B.S. in Computer Science and Applied Mathematics with a professional background in game development for Nintendo consoles. Currently teaches software and web development, bringing real-world experience into the classroom.',
        photo: ryanPhoto,
        linkedin: 'https://www.linkedin.com/in/ryanappel/',
        isMentor: false,
    },
    {
        name: 'Anurag Gupta',
        title: 'Sr. Geospatial Data Engineer',
        company: 'Enterprise Products',
        expertise: ['Geospatial Data', 'AI/ML', 'Software Engineering'],
        bio: 'Technology professional with experience in software development, geospatial data, and emerging technologies. His expertise spans AI/ML, software engineering, and building practical technology solutions, with a strong interest in mentoring student teams.',
        linkedin: 'https://www.linkedin.com/in/anurag96/',
        isMentor: true,
        mentorTopics: ['AI/ML', 'Geospatial Data', 'Software Development'],
    },
    {
        name: 'Kumuda Sreenivasa',
        title: 'Sr. Data Architect & Founder',
        company: 'Receitly',
        expertise: ['Data Architecture', 'AI/ML', 'Healthcare Tech'],
        bio: 'Founder and technology professional with a background in data architecture, software engineering, and AI/ML, specializing in building scalable, data-driven systems and intelligent products. Her expertise spans data engineering, cloud technologies, machine learning, and product development.',
        linkedin: 'https://www.linkedin.com/in/kumudas/',
        isMentor: false,
    },
];

/* Helper to generate initials for monogram */
function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/* ── Filter Categories ── */
const categories = [
    'All',
    'Mentors Available',
    'AI & Machine Learning',
    'Cloud & Distributed Systems',
    'Data & Analytics',
    'Cybersecurity',
] as const;

/* Items per page: 6 cards = exactly 2 rows on 3-col desktop, 3 rows on 2-col tablet */
const ITEMS_PER_PAGE = 6;

/* ── Executive Judge Card (Compact & Proportional) ── */
const JudgeCard = ({ judge, onExpand }: { judge: Judge; onExpand: () => void }) => {
    return (
        <div
            onClick={onExpand}
            className="group relative bg-white/80 hover:bg-white border border-slate-200/80 hover:border-[#61A644]/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 w-full h-full text-center p-5 cursor-pointer select-none"
        >
            {/* Top row: Role Badge */}
            <div className="mb-2.5 flex justify-center">
                {judge.isMentor ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-google-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-800 border border-emerald-500/25">
                        <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                        Judge & Mentor
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-google-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-black/5">
                        <Shield className="w-2.5 h-2.5 text-slate-400" />
                        Judge
                    </span>
                )}
            </div>

            {/* Photo or Monogram (w-20 h-20 / 80px) */}
            <div className="relative mb-3 flex justify-center shrink-0">
                {judge.photo ? (
                    <img
                        src={judge.photo}
                        alt={judge.name}
                        loading="lazy"
                        decoding="async"
                        className="w-20 h-20 rounded-full object-cover ring-2 ring-slate-100 shadow-sm transition-transform duration-300 group-hover:scale-105 bg-slate-50"
                    />
                ) : (
                    <div
                        className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-[#0C3C34] to-[#155a4e] text-white font-google font-bold text-lg tracking-wider ring-2 ring-slate-100 shadow-sm transition-transform duration-300 group-hover:scale-105"
                    >
                        {getInitials(judge.name)}
                    </div>
                )}
            </div>

            {/* Name */}
            <h3 className="font-google font-bold text-base text-[#0C3C34] mb-0.5 leading-tight line-clamp-1">
                {judge.name}
            </h3>

            {/* Title & Company */}
            <p className="text-slate-500 font-google-text text-[11px] font-semibold mb-2 leading-snug line-clamp-1">
                {judge.title}
                <span className="text-[#61A644]"> @ {judge.company}</span>
            </p>

            {/* Bio — truncated */}
            <p className="text-slate-500 font-google-text text-[11px] leading-relaxed mb-3 line-clamp-2">
                {judge.bio}
            </p>

            {/* Expertise tags */}
            <div className="flex flex-wrap gap-1 justify-center mb-3">
                {judge.expertise.slice(0, 2).map((tag, tagIdx) => (
                    <span
                        key={tagIdx}
                        className="text-[8px] font-google-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Bottom row: links + View Profile */}
            <div className="flex items-center justify-between w-full mt-auto pt-2.5 border-t border-black/5">
                <div className="flex items-center gap-2">
                    {judge.linkedin && (
                        <a
                            href={judge.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-[#0077B5] transition-colors p-1"
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
                            className="text-slate-400 hover:text-[#61A644] transition-colors p-1"
                            title="Website"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Globe className="w-3.5 h-3.5" />
                        </a>
                    )}
                </div>
                <button
                    onClick={onExpand}
                    className="text-[11px] font-google-text font-bold text-slate-500 hover:text-[#61A644] transition-colors cursor-pointer flex items-center gap-1"
                >
                    <span>View Profile</span>
                    <ArrowUpRight className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
};

/* ── Executive Profile Modal ── */
const JudgeModal = ({ judge, onClose }: { judge: Judge; onClose: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 16 }}
                transition={{ duration: 0.3, ease: spring }}
                className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full relative overflow-hidden max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header banner */}
                <div className="h-20 bg-gradient-to-r from-[#0C3C34] via-[#124d42] to-[#1c6457] relative shrink-0">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors cursor-pointer text-white"
                        aria-label="Close modal"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Avatar overlapping banner */}
                <div className="flex justify-between items-end px-6 -mt-10 relative z-10 shrink-0">
                    {judge.photo ? (
                        <img
                            src={judge.photo}
                            alt={judge.name}
                            className="w-20 h-20 rounded-full object-cover border-3 border-white shadow-xl bg-white"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0C3C34] via-[#124d42] to-[#1e6154] text-white flex items-center justify-center font-google font-bold text-2xl tracking-wider border-3 border-white shadow-xl select-none">
                            {getInitials(judge.name)}
                        </div>
                    )}

                    <div className="mb-1">
                        {judge.isMentor ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-google-mono font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
                                <Sparkles className="w-3 h-3 text-emerald-600" />
                                Judge & Mentor
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-google-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                                <Shield className="w-3 h-3 text-slate-400" />
                                Official Judge
                            </span>
                        )}
                    </div>
                </div>

                {/* Modal Content */}
                <div className="px-6 pt-3 pb-6 text-left overflow-y-auto">
                    {/* Name, Role & Company */}
                    <div className="mb-3">
                        <h3 className="font-google font-bold text-xl text-[#0C3C34] mb-0.5">
                            {judge.name}
                        </h3>
                        <p className="text-xs font-semibold text-slate-700">
                            {judge.title}
                        </p>
                        <p className="text-xs font-bold text-[#61A644]">
                            @ {judge.company}
                        </p>
                    </div>

                    {/* Social & Web Links */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        {judge.linkedin && (
                            <a
                                href={judge.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-google font-semibold text-[#0077B5] bg-[#0077B5]/10 hover:bg-[#0077B5]/15 px-3 py-1 rounded-full transition-colors"
                            >
                                <Linkedin className="w-3.5 h-3.5" />
                                <span>LinkedIn</span>
                            </a>
                        )}
                        {judge.website && (
                            <a
                                href={judge.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-google font-semibold text-[#0C3C34] bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-full transition-colors"
                            >
                                <Globe className="w-3.5 h-3.5" />
                                <span>Website</span>
                            </a>
                        )}
                    </div>

                    {/* Mentorship Focus Box (if mentor) */}
                    {judge.isMentor && (
                        <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-xl p-3 mb-4 shadow-2xs">
                            <div className="flex items-center gap-1.5 text-emerald-900 font-google font-bold text-xs mb-1">
                                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Mentorship Support</span>
                            </div>
                            <p className="text-[11px] text-slate-650 leading-relaxed mb-2 font-normal">
                                Available to guide hackers, troubleshoot technical bottlenecks, and give architectural feedback.
                            </p>
                            {judge.mentorTopics && judge.mentorTopics.length > 0 && (
                                <div className="flex flex-wrap items-center gap-1">
                                    <span className="text-[9px] font-google-mono text-emerald-800 font-bold uppercase tracking-wider mr-1">
                                        Focus:
                                    </span>
                                    {judge.mentorTopics.map((topic, i) => (
                                        <span
                                            key={i}
                                            className="text-[9px] font-google-mono font-medium px-2 py-0.5 rounded-full bg-white text-emerald-800 border border-emerald-200 shadow-2xs"
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Full Bio */}
                    <div className="mb-4">
                        <h4 className="text-[10px] font-google-mono font-bold uppercase tracking-wider text-slate-450 mb-1.5">
                            Biography
                        </h4>
                        <p className="text-slate-650 text-xs leading-relaxed font-normal bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                            {judge.bio}
                        </p>
                    </div>

                    {/* Expertise Tags */}
                    <div>
                        <h4 className="text-[10px] font-google-mono font-bold uppercase tracking-wider text-slate-450 mb-1.5">
                            Expertise
                        </h4>
                        <div className="flex flex-wrap gap-1">
                            {judge.expertise.map((tag, i) => (
                                <span
                                    key={i}
                                    className="text-[9px] font-google-mono font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

/* ── Main Judges & Mentors Directory Section ── */
const Judges = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
    const [selectedJudge, setSelectedJudge] = useState<Judge | null>(null);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const [showAllRows, setShowAllRows] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);
    const directoryRef = useRef<HTMLDivElement>(null);

    // Responsive cards per view for carousel mode
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

    // Filtered unified judges list
    const filteredJudges = judges.filter((judge) => {
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch =
            query === '' ||
            judge.name.toLowerCase().includes(query) ||
            judge.company.toLowerCase().includes(query) ||
            judge.title.toLowerCase().includes(query) ||
            judge.expertise.some((e) => e.toLowerCase().includes(query));

        if (!matchesSearch) return false;

        if (selectedCategory === 'All') return true;
        if (selectedCategory === 'Mentors Available') return judge.isMentor;
        if (selectedCategory === 'AI & Machine Learning')
            return judge.expertise.some((e) => /ai|ml|machine learning|agent|vision/i.test(e));
        if (selectedCategory === 'Cloud & Distributed Systems')
            return judge.expertise.some((e) => /distributed|cloud|devops|systems|architecture|backend/i.test(e));
        if (selectedCategory === 'Data & Analytics')
            return judge.expertise.some((e) => /data|geospatial|analytics|operations/i.test(e));
        if (selectedCategory === 'Cybersecurity')
            return judge.expertise.some((e) => /cybersecurity|iam|security/i.test(e));

        return true;
    });

    // Reset pagination and carousel on search / filter
    useEffect(() => {
        setCurrentPage(1);
        setCarouselIndex(0);
    }, [searchQuery, selectedCategory]);

    const totalPages = Math.ceil(filteredJudges.length / ITEMS_PER_PAGE);

    // Clamp current page on count changes
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const displayedJudges = showAllRows
        ? filteredJudges
        : filteredJudges.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const maxCarouselIndex = Math.max(0, filteredJudges.length - cardsPerView);

    const prevCarousel = useCallback(() => {
        setCarouselIndex((i) => Math.max(0, i - 1));
    }, []);

    const nextCarousel = useCallback(() => {
        setCarouselIndex((i) => Math.min(maxCarouselIndex, i + 1));
    }, [maxCarouselIndex]);

    // Reset carousel index if out of bounds
    useEffect(() => {
        if (carouselIndex > maxCarouselIndex) {
            setCarouselIndex(maxCarouselIndex);
        }
    }, [maxCarouselIndex, carouselIndex]);

    const goToPage = (page: number) => {
        setCurrentPage(page);
        if (directoryRef.current) {
            const rect = directoryRef.current.getBoundingClientRect();
            if (rect.top < 0) {
                directoryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    return (
        <section className="relative pt-16 pb-28 px-4 overflow-hidden" id="judges">
            {/* Background landmark image with subtle parallax drift */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                    src={gbWaterfrontImg}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-[0.30] parallax-bg"
                />
                <div className="absolute inset-0 bg-white/70" />
            </div>

            {/* Ambient subtle color glows */}
            <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-[#61A644]/5 rounded-full blur-[150px] pointer-events-none animate-ambient-glow" />
            <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-[#0C3C34]/5 rounded-full blur-[150px] pointer-events-none animate-ambient-glow" />

            {/* Container: reduced max-width (max-w-5xl) for compact, proportional cards */}
            <div className="max-w-5xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div {...fadeUp(0)} className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0C3C34]/5 border border-[#0C3C34]/10 text-[#0C3C34] text-xs font-google-mono font-semibold tracking-wider uppercase mb-3">
                        <Sparkles className="w-3.5 h-3.5 text-[#61A644]" />
                        <span>Evaluation & Mentorship Panel</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-google font-bold mb-3 text-[#0C3C34]">
                        Meet Our Judges & Mentors
                    </h2>

                    <p className="text-slate-650 font-google-text text-sm md:text-base max-w-xl mx-auto font-normal leading-relaxed">
                        Distinguished engineering managers, principal architects, founders, and instructors from Microsoft, Amazon, Groundwork, FedEx, Guidehouse, and beyond.
                    </p>
                </motion.div>

                {/* Directory Controls Bar */}
                <motion.div
                    ref={directoryRef}
                    {...fadeUp(0.1)}
                    className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-xs p-4 mb-8 space-y-3.5 scroll-mt-24"
                >
                    {/* Top Row: Search Input + View Switcher */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="relative w-full sm:max-w-md">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name, company, skill..."
                                className="w-full pl-10 pr-9 py-2.5 rounded-xl text-sm font-google-text text-slate-800 bg-slate-50/80 border border-slate-200 focus:bg-white focus:outline-none focus:border-[#61A644] focus:ring-2 focus:ring-[#61A644]/20 transition-all placeholder:text-slate-400"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                                    aria-label="Clear search"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* View Switcher (Grid vs Carousel) */}
                        <div className="hidden sm:flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80 shrink-0">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-google transition-all cursor-pointer ${
                                    viewMode === 'grid'
                                        ? 'bg-white text-[#0C3C34] font-bold shadow-xs'
                                        : 'text-slate-500 hover:text-slate-800 font-medium'
                                }`}
                            >
                                <LayoutGrid className="w-3.5 h-3.5" />
                                <span>Grid</span>
                            </button>
                            <button
                                onClick={() => setViewMode('carousel')}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-google transition-all cursor-pointer ${
                                    viewMode === 'carousel'
                                        ? 'bg-white text-[#0C3C34] font-bold shadow-xs'
                                        : 'text-slate-500 hover:text-slate-800 font-medium'
                                }`}
                            >
                                <SlidersHorizontal className="w-3.5 h-3.5" />
                                <span>Slider</span>
                            </button>
                        </div>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-slate-100">
                        <span className="text-xs font-google font-semibold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
                            Filter:
                        </span>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`shrink-0 text-xs md:text-[13px] font-google px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                                    selectedCategory === cat
                                        ? 'bg-[#0C3C34] text-white font-semibold shadow-xs'
                                        : 'bg-slate-100 hover:bg-slate-200/80 text-slate-650 font-medium'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Empty State */}
                {filteredJudges.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white/80 rounded-2xl border border-slate-200 p-10 text-center my-6"
                    >
                        <p className="text-slate-600 font-google text-sm font-semibold mb-1">
                            No judges or mentors matched your search.
                        </p>
                        <p className="text-slate-450 text-xs mb-3">
                            Try resetting filters or searching for keywords like "AI", "Cloud", or "Groundwork".
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('All');
                            }}
                            className="px-3.5 py-1.5 rounded-full bg-[#0C3C34] text-white text-xs font-semibold hover:bg-[#0C3C34]/90 cursor-pointer transition-colors"
                        >
                            Reset Filters
                        </button>
                    </motion.div>
                )}

                {/* Directory Content: Grid View (2 Rows of compact cards + Buttons) */}
                {viewMode === 'grid' ? (
                    <div className="flex flex-col">
                        {/* ── Compact 3-Column Grid (Cards are trim, proportional, and equal size) ── */}
                        <motion.div
                            key={`grid-page-${currentPage}-${showAllRows}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 items-stretch"
                        >
                            {displayedJudges.map((judge, idx) => (
                                <motion.div
                                    key={judge.name}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: Math.min(idx * 0.03, 0.2), ease: spring }}
                                    className="h-full flex flex-col"
                                >
                                    <JudgeCard judge={judge} onExpand={() => setSelectedJudge(judge)} />
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* ── Compact Pagination & View Buttons Bar ── */}
                        {filteredJudges.length > 0 && (
                            <div className="mt-6 pt-5 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                                {/* Showing Count */}
                                <div className="text-xs font-google-text text-slate-500 font-medium">
                                    Showing{' '}
                                    <span className="font-bold text-[#0C3C34]">
                                        {showAllRows ? 1 : startIndex + 1}
                                    </span>
                                    –
                                    <span className="font-bold text-[#0C3C34]">
                                        {showAllRows
                                            ? filteredJudges.length
                                            : Math.min(startIndex + ITEMS_PER_PAGE, filteredJudges.length)}
                                    </span>{' '}
                                    of <span className="font-bold text-[#0C3C34]">{filteredJudges.length}</span> Leaders
                                </div>

                                {/* Pagination Buttons */}
                                {totalPages > 1 && !showAllRows && (
                                    <div className="flex items-center gap-1 bg-white/90 p-1 rounded-xl border border-slate-200 shadow-2xs">
                                        <button
                                            onClick={() => goToPage(Math.max(1, currentPage - 1))}
                                            disabled={currentPage === 1}
                                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-google font-semibold text-slate-700 hover:text-[#0C3C34] hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                                            aria-label="Previous page"
                                        >
                                            <ChevronLeft className="w-3.5 h-3.5" />
                                            <span>Prev</span>
                                        </button>

                                        <div className="flex items-center gap-1 px-1">
                                            {Array.from({ length: totalPages }).map((_, i) => {
                                                const pageNum = i + 1;
                                                return (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => goToPage(pageNum)}
                                                        className={`w-7 h-7 rounded-lg text-xs font-google font-bold transition-all cursor-pointer flex items-center justify-center ${
                                                            currentPage === pageNum
                                                                ? 'bg-[#0C3C34] text-white shadow-xs'
                                                                : 'text-slate-600 hover:bg-slate-100'
                                                        }`}
                                                        aria-label={`Page ${pageNum}`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <button
                                            onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                                            disabled={currentPage === totalPages}
                                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-google font-semibold text-slate-700 hover:text-[#0C3C34] hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                                            aria-label="Next page"
                                        >
                                            <span>Next</span>
                                            <ChevronRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                )}

                                {/* View All / Collapse Button */}
                                {filteredJudges.length > ITEMS_PER_PAGE && (
                                    <button
                                        onClick={() => {
                                            setShowAllRows(!showAllRows);
                                            if (showAllRows) goToPage(1);
                                        }}
                                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-google font-bold transition-all cursor-pointer bg-slate-100 hover:bg-slate-200/80 text-[#0C3C34] border border-slate-200 shadow-2xs"
                                    >
                                        <span>{showAllRows ? 'Show 2 Rows' : `View All ${filteredJudges.length} Leaders`}</span>
                                        <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${showAllRows ? '-rotate-90' : 'rotate-90'}`} />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    /* ── Carousel Showcase View ── */
                    <motion.div
                        key="carousel-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                    >
                        {/* Prev / Next Navigation Arrows */}
                        <button
                            onClick={prevCarousel}
                            disabled={carouselIndex === 0}
                            className="absolute -left-3 md:-left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 shadow-md flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-[#0C3C34]"
                            aria-label="Previous judges"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={nextCarousel}
                            disabled={carouselIndex >= maxCarouselIndex}
                            className="absolute -right-3 md:-right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 shadow-md flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-[#0C3C34]"
                            aria-label="Next judges"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>

                        {/* Carousel Track */}
                        <div className="overflow-hidden px-1 py-1" ref={trackRef}>
                            <motion.div
                                className="flex gap-5 items-stretch"
                                animate={{
                                    x: `calc(-${carouselIndex * (100 / cardsPerView)}% - ${carouselIndex * (20 / cardsPerView)}px)`,
                                }}
                                transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                            >
                                {filteredJudges.map((judge) => (
                                    <div
                                        key={judge.name}
                                        className="shrink-0 h-full flex flex-col"
                                        style={{
                                            width: `calc(${100 / cardsPerView}% - ${((cardsPerView - 1) * 20) / cardsPerView}px)`,
                                        }}
                                    >
                                        <JudgeCard judge={judge} onExpand={() => setSelectedJudge(judge)} />
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Dot Indicators */}
                        {maxCarouselIndex > 0 && (
                            <div className="flex items-center justify-center gap-1.5 mt-6">
                                {Array.from({ length: maxCarouselIndex + 1 }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCarouselIndex(i)}
                                        aria-label={`Go to slide ${i + 1}`}
                                        className={`rounded-full transition-all duration-300 cursor-pointer ${
                                            i === carouselIndex
                                                ? 'w-5 h-1.5 bg-[#0C3C34]'
                                                : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </div>

            {/* Executive Profile Modal */}
            <AnimatePresence>
                {selectedJudge && (
                    <JudgeModal judge={selectedJudge} onClose={() => setSelectedJudge(null)} />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Judges;
