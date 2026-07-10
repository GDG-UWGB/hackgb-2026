import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Database, Share2, Shield, Settings } from 'lucide-react';
import waterfrontImg from '../assets/images/background/gb-waterfront.png';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24, filter: 'blur(4px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.7, delay, ease: spring },
});

const sections = [
    {
        icon: Lock,
        color: '#61A644',
        title: 'Our Promise to You',
        content: (
            <p className="text-slate-600 font-google-text text-sm leading-relaxed">
                We are so excited to build with you at UW-Green Bay on October 17-18. We know that trusting us with your personal information is a big deal. We wrote this policy in plain, simple language so you know exactly what information we collect, why we need it, and how we keep it safe.
            </p>
        ),
    },
    {
        icon: Database,
        color: '#E37100',
        title: 'What Information We Collect',
        content: (
            <div className="flex flex-col gap-3">
                <p className="text-slate-600 font-google-text text-sm leading-relaxed">
                    When you apply and check in to HackGB, we ask for a few details to make sure the event runs smoothly:
                </p>
                <ul className="list-none pl-0 text-slate-600 font-google-text text-sm leading-relaxed flex flex-col gap-2.5">
                    <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[#E37100] shrink-0" />
                        <span><strong className="text-[#0C3C34]">Basic Details:</strong> Your name, email address, school, and major.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[#E37100] shrink-0" />
                        <span><strong className="text-[#0C3C34]">Professional Profiles:</strong> Your resume, GitHub repository link, and LinkedIn profile.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[#E37100] shrink-0" />
                        <span><strong className="text-[#0C3C34]">Event Needs:</strong> Your shirt size, dietary restrictions, and any accessibility requests.</span>
                    </li>
                </ul>
            </div>
        ),
    },
    {
        icon: Settings,
        color: '#61A644',
        title: 'Why We Collect It',
        content: (
            <div className="flex flex-col gap-3">
                <p className="text-slate-600 font-google-text text-sm leading-relaxed">
                    We only use your information to give you the best possible experience at the hackathon. We use it to:
                </p>
                <ul className="list-none pl-0 text-slate-600 font-google-text text-sm leading-relaxed flex flex-col gap-2">
                    <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[#61A644] shrink-0" />
                        Send you important updates, schedules, and welcome guides.
                    </li>
                    <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[#61A644] shrink-0" />
                        Make sure we order the right amount of food and the correct t-shirt sizes.
                    </li>
                    <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[#61A644] shrink-0" />
                        Organize teams and hacking tracks.
                    </li>
                </ul>
            </div>
        ),
    },
    {
        icon: Share2,
        color: '#E37100',
        title: 'Who We Share It With',
        content: (
            <div className="flex flex-col gap-3">
                <p className="text-slate-600 font-google-text text-sm leading-relaxed">
                    We do not sell your personal information to anyone. However, we do share specific pieces of information with our official event partners:
                </p>
                <ul className="list-none pl-0 text-slate-600 font-google-text text-sm leading-relaxed flex flex-col gap-2.5">
                    <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[#E37100] shrink-0" />
                        <span><strong className="text-[#0C3C34]">Our Sponsors:</strong> We share your resume, GitHub, and LinkedIn profiles with our sponsors so they can connect with you for internships and job opportunities.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[#E37100] shrink-0" />
                        <span><strong className="text-[#0C3C34]">The Organizing Team:</strong> Our core Google Developer Group organizers have access to your application data to plan the event and ensure your safety.</span>
                    </li>
                </ul>
            </div>
        ),
    },
    {
        icon: Shield,
        color: '#0C3C34',
        title: 'How We Keep It Safe',
        content: (
            <p className="text-slate-600 font-google-text text-sm leading-relaxed">
                Your data is stored securely. Only authorized organizers have access to the full list of attendee information, and we take active steps to protect your details from unauthorized access.
            </p>
        ),
    },
    {
        icon: Settings,
        color: '#61A644',
        title: 'Your Choices',
        content: (
            <div className="flex flex-col gap-3">
                <p className="text-slate-600 font-google-text text-sm leading-relaxed">
                    You have total control over your information. If you want to:
                </p>
                <ul className="list-none pl-0 text-slate-600 font-google-text text-sm leading-relaxed flex flex-col gap-2">
                    <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[#61A644] shrink-0" />
                        Update your application details
                    </li>
                    <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[#61A644] shrink-0" />
                        Opt out of sharing your resume with sponsors
                    </li>
                    <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[#61A644] shrink-0" />
                        Ask us to delete your data after the event is over
                    </li>
                </ul>
                <p className="text-slate-600 font-google-text text-sm leading-relaxed">
                    Just reach out to our organizing team at <a href="mailto:contact@hackgb.com" className="text-[#61A644] font-bold hover:underline">contact@hackgb.com</a>. We are happy to help.
                </p>
            </div>
        ),
    },
];

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    return (
        <main className="relative min-h-screen pt-28 pb-20 px-4 overflow-hidden bg-[#eff6eb] noise-overlay flex flex-col items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img src={waterfrontImg} alt="" className="w-full h-full object-cover opacity-[0.18] parallax-bg" />
                <div className="absolute inset-0 bg-[#61A644]/[0.01]" />
            </div>

            <div className="w-full max-w-3xl z-10 flex flex-col items-center">
                {/* Title */}
                <motion.div {...fadeUp()} className="text-center mb-10">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#61A644]/10 border border-[#61A644]/15 text-[#61A644] font-google font-bold text-xs mb-4">
                        <span className="w-2 h-2 bg-[#61A644] rounded-full" />
                        Rules & Policies
                    </span>
                    <h1 className="text-4xl md:text-5xl font-google font-bold text-[#0C3C34] tracking-tight">
                        Privacy Policy
                    </h1>
                    <p className="text-slate-500 mt-3 font-google-text text-sm max-w-md mx-auto">
                        How we collect, use, and protect your personal information.
                    </p>
                </motion.div>

                {/* Policy Card */}
                <motion.div
                    {...fadeUp(0.1)}
                    className="w-full bg-white/92 border border-black/5 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden"
                >
                    {/* Green top accent */}
                    <div className="h-[3px] bg-gradient-to-r from-[#61A644] via-[#E37100] to-[#ffcc00]" />

                    {sections.map((section, idx) => {
                        const Icon = section.icon;
                        return (
                            <motion.div
                                key={section.title}
                                {...fadeUp(0.05 * (idx + 1))}
                                className={`flex flex-col gap-3 p-8 md:px-10 ${idx !== 0 ? 'border-t border-black/5' : ''}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: `${section.color}12`, color: section.color }}
                                    >
                                        <Icon size={16} strokeWidth={2.5} />
                                    </div>
                                    <h2 className="text-lg font-google font-bold text-[#0C3C34]">
                                        {section.title}
                                    </h2>
                                </div>
                                {section.content}
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Back button */}
                <motion.button
                    {...fadeUp(0.4)}
                    onClick={() => navigate(-1)}
                    className="mt-10 text-slate-500 hover:text-[#0C3C34] font-google font-bold text-sm cursor-pointer transition-all"
                >
                    ← Go Back
                </motion.button>
            </div>
        </main>
    );
};

export default PrivacyPolicy;
