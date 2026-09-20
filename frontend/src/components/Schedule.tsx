import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import downtownImg from '../assets/images/background/jpg/downtown-gb.jpg';
import { Calendar, Clock, Terminal, ArrowRight, Sparkles } from 'lucide-react';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30, filter: 'blur(6px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.8, delay, ease: spring },
});

interface ScheduleEvent {
    time: string;
    title: string;
    desc: string;
    accent: string;
}

const saturdayEvents: ScheduleEvent[] = [
    { time: '08:00 AM', title: 'Check-in & Registration', desc: 'STEM Innovation Center • Check-in and badge pickup.', accent: '#61A644' },
    { time: '11:00 AM', title: 'Opening Ceremony', desc: 'Wood Hall • Welcome address and hackathon kickoff.', accent: '#E37100' },
    { time: '12:00 PM', title: 'Hacking Begins', desc: 'Phoenix Room B & C (University Union) • Hacking officially starts.', accent: '#0c3c34' },
    { time: '01:30 PM', title: 'Workshops Kickoff', desc: 'University Union • Sessions begin with Modal, followed by GDE workshops.', accent: '#ffcc00' },
];

const sundayEvents: ScheduleEvent[] = [
    { time: '12:00 PM', title: 'Hacking Ends & Submissions Due', desc: 'STEM Innovation Center • Code freeze and Devpost deadline.', accent: '#EA4335' },
    { time: '01:00 PM', title: 'Judging & Project Expo', desc: 'STEM Innovation Center • Live gallery demos open to judges and attendees.', accent: '#61A644' },
    { time: '05:00 PM', title: 'Closing Ceremony', desc: 'STEM Innovation Center • Keynote address and weekend recap.', accent: '#0c3c34' },
    { time: '06:00 PM', title: 'Prize Distribution', desc: 'STEM Innovation Center • Track champions and winners revealed!', accent: '#ffbd2e' },
];

const Schedule = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'saturday' | 'sunday'>('saturday');

    const activeEvents = activeTab === 'saturday' ? saturdayEvents : sundayEvents;
    const fileName = activeTab === 'saturday' ? 'saturday_schedule.json' : 'sunday_schedule.json';

    return (
        <section className="relative pt-20 pb-32 px-4 overflow-hidden" id="schedule">
            {/* Background landmark image with parallax drift */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img src={downtownImg} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover opacity-[0.45] parallax-bg" />
                <div className="absolute inset-0 bg-[#61A644]/[0.01]" />
            </div>

            {/* Ambient glow */}
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#ffcc00]/5 rounded-full blur-[150px] pointer-events-none animate-ambient-glow" />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    {...fadeUp(0)}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#61A644]/15 border border-[#61A644]/20 text-[#0C3C34] font-google font-bold text-xs uppercase tracking-wider mb-3">
                        <Sparkles className="w-3.5 h-3.5 text-[#E37100]" />
                        24-Hour Timeline
                    </div>
                    <h2 className="text-4xl md:text-6xl font-google font-bold mb-4 text-[#0C3C34]">
                        Event Schedule
                    </h2>
                    <p className="text-slate-650 font-google-text text-sm sm:text-base max-w-xl mx-auto mb-7">
                        Main schedule milestones below. Explore our full schedule for room locations, Modal & GDE workshops, speaker bios, and buffer times.
                    </p>
                    
                    {/* Highly Visible Primary CTA Button */}
                    <button
                        onClick={() => navigate('/schedule')}
                        className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#61A644] hover:bg-[#528f39] text-white font-google font-bold text-base shadow-[0_6px_25px_rgba(97,166,68,0.5)] hover:shadow-[0_8px_30px_rgba(97,166,68,0.65)] ring-4 ring-[#61A644]/25 hover:ring-[#61A644]/50 transition-all transform hover:-translate-y-1 active:translate-y-0 cursor-pointer"
                    >
                        <span>View Full Schedule</span>
                        <ArrowRight className="w-5 h-5 text-white" />
                    </button>
                </motion.div>

                {/* Integrated IDE Schedule Card */}
                <motion.div
                    {...fadeUp(0.1)}
                    className="bg-white/45 backdrop-blur-xl rounded-2xl border border-white/25 shadow-xl overflow-hidden flex flex-col min-h-[460px] relative"
                >
                    {/* IDE Top Window Bar */}
                    <div className="flex items-center justify-between px-4 py-2 border-b border-black/5 bg-white/30">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                            <span className="text-[10px] font-google-mono text-slate-500 ml-3">24-Hour Schedule</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-google-mono text-[9px] text-slate-450 bg-slate-200/50 px-2 py-0.5 rounded border border-black/5">
                            <Calendar className="w-3 h-3 text-[#E37100]" />
                            <span>{fileName}</span>
                        </div>
                    </div>

                    {/* Editor Tab Bar */}
                    <div className="flex border-b border-black/5 bg-white/20 overflow-x-auto scrollbar-none">
                        <button
                            onClick={() => setActiveTab('saturday')}
                            className={`flex items-center gap-2 px-5 py-3 border-r border-black/5 font-google-mono text-xs font-medium transition-all cursor-pointer flex-1 justify-center ${
                                activeTab === 'saturday'
                                    ? 'bg-white/60 text-[#0C3C34] border-t-2 border-t-[#61A644]'
                                    : 'text-slate-500 hover:bg-white/30 hover:text-slate-800'
                            }`}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#61A644]" />
                            saturday_schedule.json
                        </button>
                        <button
                            onClick={() => setActiveTab('sunday')}
                            className={`flex items-center gap-2 px-5 py-3 border-r border-black/5 font-google-mono text-xs font-medium transition-all cursor-pointer flex-1 justify-center ${
                                activeTab === 'sunday'
                                    ? 'bg-white/60 text-[#0C3C34] border-t-2 border-t-[#E37100]'
                                    : 'text-slate-500 hover:bg-white/30 hover:text-slate-800'
                            }`}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E37100]" />
                            sunday_schedule.json
                        </button>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex flex-1 flex-col lg:flex-row">
                        {/* Left Side: JSON Code Preview */}
                        <div className="w-full lg:w-80 bg-slate-950/80 border-b lg:border-b-0 lg:border-r border-black/10 p-5 flex flex-col justify-between font-google-mono text-xs text-slate-300">
                            <div>
                                <div className="text-[#6272a4] mb-3">// JSON output view</div>
                                <div className="flex flex-col gap-1.5">
                                    <div>{'{'}</div>
                                    <div className="pl-4">
                                        <span className="text-[#ff79c6]">"day"</span>: <span className="text-[#f1fa8c]">"{activeTab === 'saturday' ? 'Day 1' : 'Day 2'}"</span>,
                                    </div>
                                    <div className="pl-4">
                                        <span className="text-[#ff79c6]">"date"</span>: <span className="text-[#f1fa8c]">"{activeTab === 'saturday' ? 'October 17' : 'October 18'}"</span>,
                                    </div>
                                    <div className="pl-4">
                                        <span className="text-[#ff79c6]">"events"</span>: [
                                        {activeEvents.map((evt, idx) => (
                                            <div key={idx} className="pl-4 flex flex-col gap-0.5">
                                                <div>{'{'}</div>
                                                <div className="pl-4">
                                                    <span className="text-[#50fa7b]">"time"</span>: <span className="text-[#f1fa8c]">"{evt.time}"</span>,
                                                </div>
                                                <div className="pl-4">
                                                    <span className="text-[#50fa7b]">"title"</span>: <span className="text-[#f1fa8c]">"{evt.title.slice(0, 16)}..."</span>
                                                </div>
                                                <div>{'}'}{idx !== activeEvents.length - 1 ? ',' : ''}</div>
                                            </div>
                                        ))}
                                        ]
                                    </div>
                                    <div>{'}'}</div>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-slate-500 text-[10px]">
                                <Terminal className="w-3.5 h-3.5" />
                                <span>Parsed timeline.bin</span>
                            </div>
                        </div>

                        {/* Right Side: Timeline Content */}
                        <div className="flex-1 p-6 md:p-8 bg-transparent relative">
                            {/* Line timeline */}
                            <div className="absolute left-[38px] top-0 bottom-0 w-px bg-black/5" />

                            <div className="space-y-5 relative">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -15 }}
                                        transition={{ duration: 0.25 }}
                                        className="space-y-4"
                                    >
                                        {activeEvents.map((evt, idx) => (
                                            <div key={idx} className="flex gap-5 relative group items-start">
                                                {/* Left timeline dot */}
                                                <div className="w-[15px] h-[15px] rounded-full border-[3px] border-white shadow-sm shrink-0 z-10 mt-1.5" style={{ backgroundColor: evt.accent }} />
                                                
                                                {/* Event content */}
                                                <div className="flex-1 bg-white/70 hover:bg-white border border-black/5 rounded-xl p-4 transition-all duration-300">
                                                    <div className="flex flex-wrap justify-between items-center gap-2 mb-1.5">
                                                        <span className="font-google font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1">
                                                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                                                            {evt.time}
                                                        </span>
                                                        <span
                                                            className="font-google font-bold text-[10px] tracking-wider px-2 py-0.5 rounded bg-white/80 border border-black/5"
                                                            style={{ color: evt.accent }}
                                                        >
                                                            Event {idx + 1}
                                                        </span>
                                                    </div>
                                                    <h4 className="font-google font-bold text-base text-slate-900 mb-1 leading-snug">
                                                        {evt.title}
                                                    </h4>
                                                    <p className="text-xs text-slate-650 font-google-text leading-relaxed font-semibold">
                                                        {evt.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>

                                <motion.div
                                    {...fadeUp(0.1)}
                                    className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0C3C34] text-white rounded-2xl p-5 shadow-lg border border-white/15"
                                >
                                    <div className="flex items-center gap-3.5 text-left">
                                        <div className="w-10 h-10 rounded-xl bg-[#61A644]/25 flex items-center justify-center shrink-0 border border-white/10">
                                            <Calendar className="w-5 h-5 text-[#ffbd2e]" />
                                        </div>
                                        <div>
                                            <div className="font-google font-bold text-sm sm:text-base text-white">
                                                Detailed Workshop & Venue Schedule Live
                                            </div>
                                            <p className="text-xs text-slate-300 font-google-text mt-0.5">
                                                Explore Modal & GDE workshop sessions, room numbers, speaker bios, and 15-min buffers.
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate('/schedule')}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#61A644] hover:bg-[#528f39] text-white font-google font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(97,166,68,0.5)] hover:shadow-[0_0_25px_rgba(97,166,68,0.7)] transition-all transform hover:-translate-y-0.5 cursor-pointer shrink-0"
                                    >
                                        <span>View Full Schedule</span>
                                        <ArrowRight className="w-4 h-4 text-white" />
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* IDE Bottom Status Bar */}
                    <div className="flex justify-between items-center px-4 py-1.5 bg-[#0C3C34] text-white font-google-mono text-[10px] select-none">
                        <div className="flex items-center gap-3">
                            <span className="font-bold">GIT: main*</span>
                            <span className="opacity-80">Timeline parsed</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="opacity-80">JSON</span>
                            <span className="opacity-80">UTF-8</span>
                            <span className="opacity-80">Ln {activeEvents.length}, Col 12</span>
                        </div>
                    </div>
                </motion.div>

                {/* Additional High-Visibility Action Below Card */}
                <motion.div
                    {...fadeUp(0.15)}
                    className="mt-8 flex justify-center"
                >
                    <button
                        onClick={() => navigate('/schedule')}
                        className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#0C3C34] font-google font-bold text-sm shadow-md hover:shadow-lg border border-black/10 transition-all transform hover:-translate-y-0.5 cursor-pointer group"
                    >
                        <span>View Complete 24-Hour Schedule & Workshops</span>
                        <ArrowRight className="w-4 h-4 text-[#61A644] group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Schedule;
