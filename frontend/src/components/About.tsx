const About = () => {
    return (
        <section className="py-24 px-4 bg-google-off-white/30">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2">
                        <h2 className="text-4xl md:text-5xl font-google font-bold mb-8 text-google-black">
                            About <span className="text-google-green">HackGB</span>
                        </h2>
                        <p className="text-xl text-google-black/70 leading-relaxed mb-6">
                            Organized by GDG on Campus at UW-Green Bay in partnership with MLH, HackGB is a historic 36-hour event.
                            We invite 200+ students to the STEM Innovation Center to turn ideas into reality.
                        </p>
                        <div className="flex items-start gap-4 mb-8">
                            <div className="bg-google-green/10 p-3 rounded-xl">
                                <svg className="w-6 h-6 text-google-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-google font-bold text-google-black">Location</h3>
                                <p className="text-google-black/60">UW-Green Bay STEM Innovation Center, Green Bay, WI</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-google-off-white shadow-sm">
                            <p className="text-google-black/70 italic">
                                "Our mission is to foster innovation and community in Green Bay by providing a platform for collegiate developers of all levels to build, learn, and grow."
                            </p>
                        </div>
                    </div>

                    <div className="lg:w-1/2 w-full h-[400px] rounded-3xl overflow-hidden shadow-xl grayscale hover:grayscale-0 transition-all duration-700">
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
