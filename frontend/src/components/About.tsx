const About = () => {
    return (
        <section className="py-24 px-4 bg-transparent relative">
            {/* Ambient glows behind component */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#61A644]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto z-10 relative">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2">
                        <span className="text-sm font-google font-bold uppercase tracking-widest text-[#E37100] mb-4 block">About the Event</span>
                        <h2 className="text-4xl md:text-5xl font-google font-bold mb-8 text-slate-900">
                            Welcome to <span className="text-gradient-phoenix">HackGB</span>
                        </h2>
                        <p className="text-xl text-slate-600 leading-relaxed mb-6 font-google-text">
                            Organized by GDG on Campus at UW-Green Bay in partnership with MLH, HackGB is a historic 24-hour hackathon experience.
                            We invite 200+ students to embark on a mythical coding journey at the STEM Innovation Center — where the Phoenix rises.
                        </p>
                        <div className="flex items-start gap-4 mb-4">
                            <div className="bg-[#61A644]/15 p-3 rounded-xl">
                                <svg className="w-6 h-6 text-[#61A644]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-google font-bold text-slate-800">Location</h3>
                                <p className="text-slate-500 font-google-text">UW-Green Bay STEM Innovation Center, Green Bay, WI</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 mb-8">
                            <div className="bg-[#E37100]/15 p-3 rounded-xl">
                                <svg className="w-6 h-6 text-[#E37100]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-google font-bold text-slate-800">Date</h3>
                                <p className="text-slate-500 font-google-text">Oct 17 - 18, 2026 — 24 Hours of Innovation</p>
                            </div>
                        </div>

                        <div className="bg-white/70 p-6 rounded-2xl border border-black/5 backdrop-blur-md shadow-md">
                            <p className="text-slate-600 italic font-google-text">
                                "Our mission is to foster innovation and community in Green Bay by providing a platform for collegiate developers of all levels to build, learn, and grow — where every hacker can rise like the Phoenix."
                            </p>
                        </div>
                    </div>

                    <div className="lg:w-1/2 w-full h-[400px] rounded-3xl overflow-hidden shadow-xl border border-black/5 hover:border-[#61A644]/40 transition-all duration-700">
                        <iframe
                            title="STEM Innovation Center Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2839.293417937397!2d-87.92552692348545!3d44.53065609559388!2m3!1f0!2f0!3f0!3m2!1i1024!2i1024!4t4.1!3m3!1m2!1s0x8802fb69986b208b%3A0xc6e4b8686705504d!2sSTEM%20Innovation%20Center!5e0!3m2!1sen!2sus!4v1709600000000!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
