import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import downtownImg from '../assets/images/background/downtown-gb.png';
import { Calendar, Clock, Terminal } from 'lucide-react';

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
    { time: '08:00 AM', title: 'Check-in & Registration', desc: 'Arrive at the STEM Innovation Center, grab your credentials, and get your swag bag.', accent: '#61A644' },
    { time: '11:00 AM', title: 'Opening Ceremony', desc: 'Welcome address, sponsor presentations, track descriptions, and rules review.', accent: '#E37100' },
    { time: '12:00 PM', title: 'Hacking Begins', desc: 'Start building your projects! Team formation assistance available.', accent: '#0c3c34' },
    { time: '12:30 PM', title: 'Lunch Provided', desc: 'Hot lunch served in the main dining hall.', accent: '#ffcc00' },
];

const sundayEvents: ScheduleEvent[] = [
    { time: '12:00 PM', title: 'Hacking Ends', desc: 'All code submissions must be finalized on Devpost.', accent: '#E37100' },
    { time: '01:00 PM', title: 'Judging & Project Expo', desc: 'Demo your project to the judges. Open gallery style.', accent: '#61A644' },
    { time: '05:00 PM', title: 'Closing Ceremony', desc: 'Keynote address, project review, and final thank yous.', accent: '#0c3c34' },
    { time: '06:00 PM', title: 'Prize Distribution', desc: 'Winners announced for each hacking track!', accent: '#ffcc00' },
];

const Schedule = () => {
    const [activeTab, setActiveTab] = useState<'saturday' | 'sunday'>('saturday');

    const activeEvents = activeTab === 'saturday' ? saturdayEvents : sundayEvents;
    const fileName = activeTab === 'saturday' ? 'saturday_schedule.json' : 'sunday_schedule.json';

    return (
        <section className="relative pt-20 pb-32 px-4 overflow-hidden" id="schedule">
            {/* Background landmark image with parallax drift */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img src={downtownImg} alt="" className="w-full h-full object-cover opacity-[0.45] parallax-bg" />
                <div className="absolute inset-0 bg-[#61A644]/[0.01]" />
            </div>

            {/* Ambient glow */}
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#ffcc00]/5 rounded-full blur-[150px] pointer-events-none animate-ambient-glow" />

            <div className="max-w-5xl mx-auto relative z-10">
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
                                                            className="font-google-mono font-bold text-[9px] tracking-wider px-2 py-0.5 rounded bg-white/80 border border-black/5"
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
            </div>
        </section>
    );
};

export default Schedule;
