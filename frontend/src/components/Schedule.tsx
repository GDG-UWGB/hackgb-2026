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
        <section className="py-24 px-4 bg-transparent">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-sm font-google font-bold uppercase tracking-widest text-[#E37100] mb-4 block">Itinerary</span>
                    <h2 className="text-4xl md:text-5xl font-google font-bold mb-4 text-slate-900">
                        24-Hour <span className="text-gradient-phoenix">Schedule</span>
                    </h2>
                    <p className="text-lg text-slate-500 max-w-xl mx-auto font-google-text">
                        A full breakdown of events and milestones for October 17th & 18th, 2026.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Saturday Card */}
                    <div className="bg-white/70 border border-black/5 rounded-[2.5rem] p-8 md:p-12 text-slate-850 backdrop-blur-md shadow-md">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/5">
                            <h3 className="text-2xl font-google font-bold text-slate-900">Saturday, Oct 17</h3>
                            <span className="px-4 py-1 bg-[#61A644]/20 text-[#61A644] rounded-full font-google font-bold text-xs uppercase tracking-wider">Day 1</span>
                        </div>
                        <div className="space-y-8">
                            {saturdayEvents.map((evt, idx) => (
                                <div key={idx} className="flex gap-4 md:gap-6 group">
                                    <div className="min-w-[120px] md:min-w-[150px] pt-1">
                                        <span className="font-google font-bold text-xs uppercase tracking-wider text-[#E37100] bg-[#E37100]/10 px-3 py-1 rounded-md block text-center">
                                            {evt.time}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-google font-bold text-lg text-slate-800 mb-1 group-hover:text-[#61A644] transition-colors">{evt.title}</h4>
                                        <p className="text-sm text-slate-500 font-google-text leading-relaxed">{evt.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sunday Card */}
                    <div className="bg-white/70 border border-black/5 rounded-[2.5rem] p-8 md:p-12 text-slate-850 backdrop-blur-md shadow-md">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/5">
                            <h3 className="text-2xl font-google font-bold text-slate-900">Sunday, Oct 18</h3>
                            <span className="px-4 py-1 bg-[#E37100]/20 text-[#E37100] rounded-full font-google font-bold text-xs uppercase tracking-wider">Day 2</span>
                        </div>
                        <div className="space-y-8">
                            {sundayEvents.map((evt, idx) => (
                                <div key={idx} className="flex gap-4 md:gap-6 group">
                                    <div className="min-w-[120px] md:min-w-[150px] pt-1">
                                        <span className="font-google font-bold text-xs uppercase tracking-wider text-[#61A644] bg-[#61A644]/10 px-3 py-1 rounded-md block text-center">
                                            {evt.time}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-google font-bold text-lg text-slate-800 mb-1 group-hover:text-[#E37100] transition-colors">{evt.title}</h4>
                                        <p className="text-sm text-slate-500 font-google-text leading-relaxed">{evt.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Schedule;
