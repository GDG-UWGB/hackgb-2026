import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mic,
    Sparkles,
    Calendar,
    Clock,
    MapPin,
    Award,
    ExternalLink,
    Linkedin,
    Globe,
    CheckCircle2,
    X,
    ArrowUpRight,
    ArrowRight,
} from 'lucide-react';
import titletownImg from '../assets/images/background/jpg/titletown-district.jpg';
import kiruthikaImg from '../assets/images/speakers/kiruthika-subramani.png';
import patScanlanImg from '../assets/images/speakers/pat-scanlan.png';
import modalLogo from '../assets/images/sponsors/phoenix/modal.png';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24, filter: 'blur(4px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.7, delay, ease: spring },
});

export interface SpeakerBadge {
    label: string;
    bg: string;
    text: string;
    border: string;
}

export interface Speaker {
    id: string;
    name: string;
    role: string;
    company: string;
    avatarUrl: string;
    isLogo?: boolean;
    linkedin?: string;
    website?: string;
    badges: SpeakerBadge[];
    sessionTitle: string;
    sessionTime: string;
    sessionRoom: string;
    sessionCategory: string;
    stats: { label: string; value: string }[];
    bio: string;
    highlights: string[];
}

const confirmedSpeakers: Speaker[] = [
    {
        id: 'andrew-hinh',
        name: 'Andrew Hinh',
        role: 'Developer Relations (DevRel)',
        company: 'Modal',
        avatarUrl: modalLogo,
        isLogo: true,
        linkedin: 'https://www.linkedin.com/in/andrew-hinh',
        website: 'https://modal.com',
        badges: [
            { label: 'Developer Relations', bg: 'bg-emerald-500/10', text: 'text-emerald-900', border: 'border-emerald-500/25' },
            { label: 'Modal', bg: 'bg-[#10B981]/15', text: 'text-[#0C3C34]', border: 'border-[#10B981]/30' },
        ],
        sessionTitle: 'Technical Workshop & API Deep Dive',
        sessionTime: 'Saturday, Oct 17 • 1:00 PM – 1:30 PM',
        sessionRoom: 'Online (Virtual Session)',
        sessionCategory: 'Virtual Developer Workshop',
        stats: [
            { label: 'Platform', value: 'Modal' },
            { label: 'Format', value: 'Online' },
            { label: 'Focus', value: 'Serverless AI' },
        ],
        bio: 'Developer Relations Engineer at Modal. Guiding hackathon participants on building serverless AI applications, GPU workloads, and containerized backend systems without managing infrastructure, and preparing teams for the Best Use of Modal prize track.',
        highlights: [
            'Developer Relations Engineer at Modal',
            'Expertise in Python, Rust, serverless GPU infrastructure, and ML frameworks',
            'Creator of RL-trained AI projects featured at the PyTorch Conference',
            'Host of the "Best Use of Modal" prize track workshop at HackGB 2026',
        ],
    },
    {
        id: 'kiruthika-subramani',
        name: 'Kiruthika Subramani',
        role: 'Google Developer Expert in AI & Data Scientist',
        company: 'Bell Canada',
        avatarUrl: kiruthikaImg,
        linkedin: 'https://www.linkedin.com/in/techwithkrithi/',
        badges: [
            { label: 'Google Developer Expert in AI', bg: 'bg-[#FBBC05]/15', text: 'text-amber-900', border: 'border-[#FBBC05]/30' },
            { label: 'Bell Canada', bg: 'bg-blue-500/10', text: 'text-blue-900', border: 'border-blue-500/20' },
            { label: 'Women Techmakers Ambassador', bg: 'bg-[#34A853]/15', text: 'text-[#0C3C34]', border: 'border-[#34A853]/30' },
        ],
        sessionTitle: '"From Demo to Production – Auto-scale Your AI Agent on Cloud Run"',
        sessionTime: 'Saturday, Oct 17 • 1:30 PM – 2:15 PM',
        sessionRoom: 'University Union (Room: TBD)',
        sessionCategory: 'GDE Workshop • $25 GCP Credits Included',
        stats: [
            { label: 'Cloud Credits', value: '$25' },
            { label: 'AI Books', value: '2' },
            { label: 'Global Talks', value: '230+' },
            { label: 'Cloud Certs', value: '9x' },
        ],
        bio: "Data Scientist at Bell Canada and Google Developer Expert in AI. Master's from MILA, the Quebec AI Institute. Author of two books on AI, delivered over 230 talks across the globe, and published more than 100 blogs. Recognitions include IBM Champion for Data and AI, Women Techmakers Ambassador, and 2025 Women in AI Scholarship Award Winner. Former Head of AI at Musitechnic Formation and intern at Amazon; nine-time certified cloud practitioner (4x GCP, 5x AWS).",
        highlights: [
            '$25 Google Cloud credits provided to workshop participants to build and deploy live',
            "Master's graduate from MILA (Quebec AI Institute)",
            'Google Developer Expert in Artificial Intelligence',
            'Author of two published books on AI',
            '2025 Women in AI Scholarship Award Winner',
            '9-time certified cloud practitioner (4x GCP, 5x AWS)',
            'IBM Champion for Data and AI & Women Techmakers Ambassador',
            'Delivered 230+ global technical keynotes and workshops',
        ],
    },
    {
        id: 'pat-scanlan',
        name: 'Pat Scanlan',
        role: 'Director of Product Development',
        company: 'Bay Tek Entertainment',
        avatarUrl: patScanlanImg,
        website: 'https://www.thevillage.bz/',
        badges: [
            { label: 'Director of Product Dev', bg: 'bg-[#E37100]/15', text: 'text-[#E37100]', border: 'border-[#E37100]/30' },
            { label: 'Bay Tek Entertainment', bg: 'bg-emerald-500/10', text: 'text-[#0C3C34]', border: 'border-emerald-500/25' },
        ],
        sessionTitle: '"From Screen to Machine": Digital to Physical Arcade Games',
        sessionTime: 'Saturday, Oct 17 • 3:30 PM – 4:30 PM',
        sessionRoom: 'University Union (Room: TBD)',
        sessionCategory: 'Workshop & Pitch Competition',
        stats: [
            { label: 'Focus', value: 'Arcade Dev' },
            { label: 'Format', value: 'Shark Tank Pitch' },
            { label: 'Deliverable', value: 'Cabinet Render' },
        ],
        bio: 'Director of Product Development at Bay Tek Entertainment. Guiding participants through translating digital game mechanics into real-world arcade experiences and leading a Shark Tank-style pitch session with cabinet renders.',
        highlights: [
            'Director of Product Development at Bay Tek Entertainment',
            'Translates mobile and digital IP into physical mechanical arcade units',
            'Hosts hands-on ideation and Shark Tank-style team pitch sessions',
            'Industry leader in real-world game prototyping and cabinet rendering',
        ],
    },
];

/* ── Speaker Profile Modal ── */
const SpeakerModal = ({ speaker, onClose }: { speaker: Speaker; onClose: () => void }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 16 }}
                transition={{ duration: 0.3, ease: spring }}
                className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full relative overflow-hidden max-h-[92vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header banner */}
                <div className="h-24 bg-gradient-to-r from-[#0C3C34] via-[#124d42] to-[#61A644] relative shrink-0">
                    <button
                        onClick={onClose}
                        className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors cursor-pointer text-white"
                        aria-label="Close modal"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Avatar overlapping banner */}
                <div className="flex justify-between items-end px-6 -mt-12 relative z-10 shrink-0">
                    <img
                        src={speaker.avatarUrl}
                        alt={speaker.name}
                        className={`w-24 h-24 rounded-2xl border-4 border-white shadow-xl bg-white ${
                            speaker.isLogo ? 'object-contain p-3' : 'object-cover'
                        }`}
                    />

                    <div className="mb-1 flex flex-wrap gap-1.5 justify-end">
                        {speaker.badges.slice(0, 1).map((b, i) => (
                            <span
                                key={i}
                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-google-mono font-bold uppercase tracking-wider ${b.bg} ${b.text} border ${b.border} shadow-2xs`}
                            >
                                <Sparkles className="w-3 h-3 text-[#E37100]" />
                                {b.label}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="px-6 pt-4 pb-6 text-left overflow-y-auto space-y-4">
                    {/* Name, Role & Company */}
                    <div>
                        <h3 className="font-google font-bold text-2xl text-[#0C3C34] mb-0.5">
                            {speaker.name}
                        </h3>
                        <p className="text-sm font-semibold text-slate-700">
                            {speaker.role}
                        </p>
                        <p className="text-xs font-bold text-[#61A644] mt-0.5">
                            @ {speaker.company}
                        </p>
                    </div>

                    {/* Social links */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
                        {speaker.linkedin && (
                            <a
                                href={speaker.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-google font-semibold text-[#0077B5] bg-[#0077B5]/10 hover:bg-[#0077B5]/15 px-3 py-1.5 rounded-full transition-colors"
                            >
                                <Linkedin className="w-3.5 h-3.5" />
                                <span>LinkedIn Profile</span>
                                <ExternalLink className="w-3 h-3 text-slate-400" />
                            </a>
                        )}
                        {speaker.website && (
                            <a
                                href={speaker.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-google font-semibold text-[#0C3C34] bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors"
                            >
                                <Globe className="w-3.5 h-3.5" />
                                <span>Website</span>
                                <ExternalLink className="w-3 h-3 text-slate-400" />
                            </a>
                        )}
                    </div>

                    {/* Workshop Session Spotlight Box */}
                    <div className="bg-gradient-to-br from-emerald-50 to-[#eff6eb] border border-[#61A644]/30 rounded-2xl p-4 shadow-2xs">
                        <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-google-mono font-bold uppercase tracking-wider text-[#0C3C34] bg-[#61A644]/15 px-2.5 py-0.5 rounded-full border border-[#61A644]/25">
                                <Calendar className="w-3 h-3 text-[#61A644]" />
                                Workshop Session
                            </span>
                            <span className="text-[11px] font-google font-semibold text-[#E37100]">
                                {speaker.sessionCategory}
                            </span>
                        </div>
                        <h4 className="font-google font-bold text-base text-slate-900 mb-2">
                            {speaker.sessionTitle}
                        </h4>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs font-google text-slate-600">
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-[#61A644]" />
                                {speaker.sessionTime}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                {speaker.sessionRoom}
                            </span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-[#61A644]/20 flex justify-end">
                            <button
                                onClick={() => {
                                    onClose();
                                    navigate('/schedule');
                                }}
                                className="inline-flex items-center gap-1.5 text-xs font-google font-bold text-[#0C3C34] hover:text-[#61A644] transition-colors cursor-pointer"
                            >
                                <span>View on Schedule Timeline</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                    {/* Stats Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {speaker.stats.map((s, i) => (
                            <div key={i} className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-center">
                                <div className="font-google font-bold text-base text-[#0C3C34]">{s.value}</div>
                                <div className="text-[10px] font-google-text text-slate-500 font-medium leading-tight mt-0.5">{s.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Bio */}
                    <div>
                        <h4 className="text-[10px] font-google-mono font-bold uppercase tracking-wider text-slate-450 mb-1.5">
                            Biography
                        </h4>
                        <p className="text-slate-650 text-xs sm:text-[13px] leading-relaxed font-normal bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
                            {speaker.bio}
                        </p>
                    </div>

                    {/* Highlights */}
                    {speaker.highlights.length > 0 && (
                        <div>
                            <h4 className="text-[10px] font-google-mono font-bold uppercase tracking-wider text-slate-450 mb-2">
                                Key Recognitions & Highlights
                            </h4>
                            <ul className="space-y-1.5">
                                {speaker.highlights.map((h, i) => (
                                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700 font-google-text">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#61A644] shrink-0 mt-0.5" />
                                        <span>{h}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

const Speakers = () => {
    const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

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

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div {...fadeUp(0)} className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0C3C34]/5 border border-[#0C3C34]/10 text-[#0C3C34] text-xs font-google-mono font-semibold tracking-wider uppercase mb-4">
                        <Mic className="w-3.5 h-3.5 text-[#61A644]" />
                        <span>Keynotes & Workshops</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-google font-bold mb-4 text-[#0C3C34]">
                        Featured Speakers & Workshop Leaders
                    </h2>

                    <p className="text-slate-650 font-google-text text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
                        Industry visionaries, Google Developer Experts, and engineering executives delivering hands-on technical deep dives and keynote sessions throughout HackGB 2026.
                    </p>
                </motion.div>

                {/* Confirmed Speakers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {confirmedSpeakers.map((speaker, idx) => (
                        <motion.div
                            key={speaker.id}
                            {...fadeUp(0.08 * (idx + 1))}
                            onClick={() => setSelectedSpeaker(speaker)}
                            className="group relative bg-white/90 hover:bg-white border border-slate-200/90 hover:border-[#61A644]/40 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden text-left"
                        >
                            {/* Subtle decorative gradient top accent bar */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0C3C34] via-[#61A644] to-[#E37100]" />

                            <div>
                                {/* Top row: Badges + View Profile Indicator */}
                                <div className="flex items-start justify-between gap-3 mb-4">
                                    <div className="flex flex-wrap gap-1.5">
                                        {speaker.badges.map((badge, bIdx) => (
                                            <span
                                                key={bIdx}
                                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-google-mono font-bold uppercase tracking-wider ${badge.bg} ${badge.text} border ${badge.border}`}
                                            >
                                                {badge.label}
                                            </span>
                                        ))}
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedSpeaker(speaker);
                                        }}
                                        className="shrink-0 w-8 h-8 rounded-full bg-slate-100 hover:bg-[#61A644]/15 text-slate-500 hover:text-[#0C3C34] transition-colors flex items-center justify-center cursor-pointer"
                                        aria-label={`View ${speaker.name} profile`}
                                    >
                                        <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Speaker identity strip */}
                                <div className="flex items-start gap-4 mb-4">
                                    <img
                                        src={speaker.avatarUrl}
                                        alt={speaker.name}
                                        loading="lazy"
                                        decoding="async"
                                        className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl ring-2 ring-slate-100 shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0 bg-white ${
                                            speaker.isLogo ? 'object-contain p-2.5' : 'object-cover'
                                        }`}
                                    />
                                    <div className="min-w-0">
                                        <h3 className="font-google font-bold text-xl sm:text-2xl text-[#0C3C34] leading-snug group-hover:text-[#61A644] transition-colors">
                                            {speaker.name}
                                        </h3>
                                        <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-0.5">
                                            {speaker.role}
                                        </p>
                                        <p className="text-xs font-bold text-[#61A644] mt-0.5">
                                            @ {speaker.company}
                                        </p>
                                    </div>
                                </div>

                                {/* Bio Snippet */}
                                <p className="text-slate-650 font-google-text text-xs sm:text-[13px] leading-relaxed mb-4 line-clamp-3">
                                    {speaker.bio}
                                </p>

                                {/* Workshop Card inside */}
                                <div className="bg-slate-50 group-hover:bg-[#61A644]/5 border border-slate-200/80 group-hover:border-[#61A644]/25 rounded-2xl p-3.5 mb-4 transition-colors">
                                    <div className="flex items-center gap-1.5 text-[10px] font-google-mono font-bold uppercase tracking-wider text-[#E37100] mb-1">
                                        <Award className="w-3.5 h-3.5" />
                                        <span>{speaker.sessionCategory}</span>
                                    </div>
                                    <h4 className="font-google font-bold text-sm text-slate-900 mb-1.5 leading-snug line-clamp-2">
                                        {speaker.sessionTitle}
                                    </h4>
                                    <div className="flex flex-wrap items-center gap-3 text-xs font-google text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5 text-[#61A644]" />
                                            {speaker.sessionTime}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer links */}
                            <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                                <div className="flex items-center gap-2">
                                    {speaker.linkedin && (
                                        <a
                                            href={speaker.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-slate-400 hover:text-[#0077B5] transition-colors p-1"
                                            title="LinkedIn"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                        </a>
                                    )}
                                    {speaker.website && (
                                        <a
                                            href={speaker.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-slate-400 hover:text-[#61A644] transition-colors p-1"
                                            title="Website"
                                        >
                                            <Globe className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedSpeaker(speaker);
                                    }}
                                    className="text-xs font-google-text font-bold text-slate-600 hover:text-[#61A644] transition-colors cursor-pointer flex items-center gap-1"
                                >
                                    <span>Full Profile & Bio</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedSpeaker && (
                    <SpeakerModal
                        speaker={selectedSpeaker}
                        onClose={() => setSelectedSpeaker(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Speakers;
