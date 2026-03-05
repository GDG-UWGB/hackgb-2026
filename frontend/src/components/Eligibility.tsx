const Eligibility = () => {
    return (
        <section className="py-24 px-4 bg-google-red/5">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-google-red/10 flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-12 bg-google-red text-white">
                        <h2 className="text-4xl font-google font-bold mb-8">Travel & Eligibility</h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="bg-white/20 p-2 rounded-lg h-fit">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-google font-bold text-xl mb-2">Who can join?</h3>
                                    <p className="text-white/80">Open to all university students and recent graduates (within 12 months).</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="bg-white/20 p-2 rounded-lg h-fit">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-google font-bold text-xl mb-2">Travel Reimbursement</h3>
                                    <p className="text-white/80 leading-relaxed">
                                        To receive travel stipends, hackers must:
                                        <ul className="list-disc ml-4 mt-2 opacity-100">
                                            <li>Check-in physically at the event</li>
                                            <li>Submit a functional project to the official Devpost gallery by Sunday morning</li>
                                        </ul>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2 p-12 flex flex-col justify-center">
                        <h3 className="text-2xl font-google font-bold mb-6 text-google-black">Important Notice</h3>
                        <p className="text-google-black/60 font-google-text leading-relaxed mb-8">
                            We are committed to making HackGB accessible to everyone. If you have any specific travel needs or accessibility requirements, please let us know in your registration form.
                        </p>
                        <div className="p-6 rounded-2xl bg-google-off-white/50 border border-google-off-white">
                            <span className="block text-sm font-google font-bold text-google-red uppercase tracking-widest mb-2">Did you know?</span>
                            <p className="text-google-black/70">
                                Green Bay is known as "Titletown" and we're excited to show you why during our first-ever collegiate hackathon!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Eligibility;
