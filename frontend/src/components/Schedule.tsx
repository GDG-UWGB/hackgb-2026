import { motion } from 'framer-motion';
import downtownImg from '../assets/images/background/downtown-gb.png';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

const Schedule = () => {
    const saturdayEvents = [
        { time: "8:00 AM - 11:00 AM", title: "Check-in & Registration", desc: "Arrive at the STEM Innovation Center, grab your credentials, and get your swag bag." },
        { time: "11:00 AM - 12:00 PM", title: "Opening Ceremony", desc: "Welcome address, sponsor presentations, track descriptions, and rules review." },
        { time: "12:00 PM", title: "Hacking Begins", desc: "Start building your projects! Team formation assistance available." },
        { time: "12:00 PM", title: "Lunch Provided", desc: "Hot lunch served in the main dining hall." }
    ];

    const sundayEvents = [
        { time: "12:00 PM", title: "Hacking Ends", desc: "All code submissions must be finalized on Devpost." },
        { time: "1:00 PM - 3:00 PM", title: "Judging & Project Expo", desc: "Demo your project to the judges. Open gallery style." },
        { time: "5:00 PM - 6:00 PM", title: "Closing Ceremony", desc: "Keynote address, project review, and final thank yous." },
        { time: "6:00 PM", title: "Prize Distribution", desc: "Winners announced for each hacking track!" }
    ];

    return (
        <section className="relative pt-20 pb-32 px-4 overflow-hidden" id="schedule">
            {/* Background landmark image with parallax drift */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img src={downtownImg} alt="" className="w-full h-full object-cover opacity-[0.45] parallax-bg" />
                <div className="absolute inset-0 bg-[#61A644]/[0.01]" />
            </div>

            {/* Ambient glow */}
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#ffcc00]/5 rounded-full blur-[150px] pointer-events-none animate-ambient-glow" />

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, ease: spring }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-google font-bold mb-4 text-[#0C3C34]">
                        24-Hour Schedule
                    </h2>
                    <p className="text-lg text-slate-850 max-w-xl mx-auto font-google-text">
                        A full breakdown of events and milestones for October 17th & 18th, 2026.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Saturday Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.9, delay: 0.1, ease: spring }}
                        viewport={{ once: true }}
                        className="glass-card p-5 sm:p-8 md:p-10 bg-white/94 border border-black/5 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/5">
                            <h3 className="text-xl sm:text-2xl font-google font-bold text-slate-900">Saturday, Oct 17</h3>
                            <span className="px-3 sm:px-4 py-1 bg-[#61A644]/15 text-[#61A644] rounded-full font-google font-bold text-xs uppercase tracking-wider shrink-0 ml-2">Day 1</span>
                        </div>
                        <div className="space-y-6">
                            {saturdayEvents.map((evt, idx) => (
                                <div key={idx} className="flex flex-col sm:flex-row gap-2 sm:gap-6 group">
                                    <div className="sm:w-36 shrink-0 pt-1">
                                        <span className="font-google font-bold text-xs uppercase tracking-wider text-[#E37100] bg-[#E37100]/10 px-3 py-1.5 rounded-lg inline-block whitespace-nowrap">
                                            {evt.time}
                                        </span>
                                    </div>
                                    <div className="flex-1 pb-6 border-b border-black/5 last:border-b-0 last:pb-0">
                                        <h4 className="font-google font-bold text-base text-slate-900 mb-1 group-hover:text-[#61A644] transition-colors">{evt.title}</h4>
                                        <p className="text-sm text-slate-700 font-google-text leading-relaxed">{evt.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Sunday Card — fixed: x: 30 → x: 0 properly in whileInView */}
                    <motion.div
                        initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.9, delay: 0.2, ease: spring }}
                        viewport={{ once: true }}
                        className="glass-card p-5 sm:p-8 md:p-10 bg-white/94 border border-black/5 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/5">
                            <h3 className="text-xl sm:text-2xl font-google font-bold text-slate-900">Sunday, Oct 18</h3>
                            <span className="px-3 sm:px-4 py-1 bg-[#E37100]/15 text-[#E37100] rounded-full font-google font-bold text-xs uppercase tracking-wider shrink-0 ml-2">Day 2</span>
                        </div>
                        <div className="space-y-6">
                            {sundayEvents.map((evt, idx) => (
                                <div key={idx} className="flex flex-col sm:flex-row gap-2 sm:gap-6 group">
                                    <div className="sm:w-36 shrink-0 pt-1">
                                        <span className="font-google font-bold text-xs uppercase tracking-wider text-[#61A644] bg-[#61A644]/10 px-3 py-1.5 rounded-lg inline-block whitespace-nowrap">
                                            {evt.time}
                                        </span>
                                    </div>
                                    <div className="flex-1 pb-6 border-b border-black/5 last:border-b-0 last:pb-0">
                                        <h4 className="font-google font-bold text-base text-slate-900 mb-1 group-hover:text-[#E37100] transition-colors">{evt.title}</h4>
                                        <p className="text-sm text-slate-700 font-google-text leading-relaxed">{evt.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Schedule;
