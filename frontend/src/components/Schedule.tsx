const Schedule = () => {
    return (
        <section className="py-24 px-4 bg-google-off-white/20">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-google font-bold mb-8 text-google-black">
                    36-Hour <span className="text-google-yellow">Schedule</span>
                </h2>
                <div className="bg-white rounded-[2.5rem] p-16 border border-google-off-white shadow-xl flex flex-col items-center animate-fade-in">
                    <div className="bg-google-yellow/10 p-6 rounded-3xl mb-8">
                        <svg className="w-16 h-16 text-google-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-3xl font-google font-bold text-google-black mb-4">Coming Soon</h3>
                    <p className="text-lg text-google-black/60 max-w-md font-google-text">
                        We're finalizing the workshops, networking sessions, and social events. Check back soon for the full 36-hour itinerary!
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Schedule;
