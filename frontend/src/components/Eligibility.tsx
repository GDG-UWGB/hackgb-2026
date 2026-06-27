const Eligibility = () => {
    return (
        <section className="py-24 px-4 bg-transparent">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white/70 rounded-[2rem] overflow-hidden shadow-md border border-black/5 flex flex-col md:flex-row backdrop-blur-md">
                    <div className="md:w-1/2 p-12 text-slate-800 border-r border-black/5" style={{ background: 'linear-gradient(170deg, rgba(97,166,68,0.08) 0%, rgba(12,60,52,0.04) 100%)' }}>
                        <h2 className="text-4xl font-google font-bold mb-8 text-slate-900">Travel & Eligibility</h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="bg-slate-100 p-2 rounded-lg h-fit border border-black/5">
                                    <svg className="w-6 h-6 text-[#61A644]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-google font-bold text-xl mb-2 text-slate-800">Who can join?</h3>
                                    <p className="text-slate-600 font-google-text">Open to all university students and recent graduates (within 12 months).</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="bg-slate-100 p-2 rounded-lg h-fit border border-black/5">
                                    <svg className="w-6 h-6 text-[#E37100]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-google font-bold text-xl mb-2 text-slate-800">Travel Reimbursement</h3>
                                    <div className="text-slate-600 leading-relaxed font-google-text">
                                        To receive travel stipends, hackers must:
                                        <ul className="list-disc ml-4 mt-2 opacity-90">
                                            <li>Check-in physically at the event</li>
                                            <li>Submit a functional project to the official Devpost gallery by Sunday morning</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2 p-12 flex flex-col justify-center text-slate-800">
                        <h3 className="text-2xl font-google font-bold mb-6 text-slate-900">Important Notice</h3>
                        <p className="text-slate-500 font-google-text leading-relaxed mb-8">
                            We are committed to making HackGB accessible to everyone. If you have any specific travel needs or accessibility requirements, please let us know in your registration form.
                        </p>
                        <div className="p-6 rounded-2xl bg-[#E37100]/5 border border-[#E37100]/15">
                            <span className="block text-sm font-google font-bold text-[#E37100] uppercase tracking-widest mb-2">Did you know?</span>
                            <p className="text-slate-600 font-google-text">
                                Green Bay is known as "Titletown" and we're excited to show you why during our first-ever collegiate hackathon — where the Phoenix rises!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Eligibility;
