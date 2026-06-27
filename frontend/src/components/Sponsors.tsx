import { motion } from 'framer-motion';
import uwgbLogo from '../assets/images/sponsors/UWGB-logo.webp';
import csetLogo from '../assets/images/sponsors/cset-logo.webp';
import googleLogo from '../assets/images/sponsors/google-logo.webp';
import sgaLogo from '../assets/images/sponsors/sga-logo.webp';

const sponsors = [
    { name: 'UW-Green Bay', logo: uwgbLogo, tier: 'Platinum' },
    { name: 'Google', logo: googleLogo, tier: 'Platinum' },
    { name: 'CSET', logo: csetLogo, tier: 'Platinum' },
    { name: 'SGA', logo: sgaLogo, tier: 'Silver' },
];

const Sponsors = () => {
    const platinum = sponsors.filter(s => s.tier === 'Platinum');
    const gold = sponsors.filter(s => s.tier === 'Gold');
    const silver = sponsors.filter(s => s.tier === 'Silver');

    // Create a smooth loop by duplicating the array
    const marqueeItems = [...platinum, ...platinum, ...platinum, ...platinum];

    return (
        <section className="py-24 px-4 bg-transparent overflow-hidden" id="sponsors">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-google font-bold mb-4 text-slate-900">
                    Our <span className="text-gradient-phoenix">Sponsors</span>
                </h2>
                <p className="text-lg text-slate-500 mb-20 max-w-2xl mx-auto font-google-text">
                    Empowering the next generation of innovators in Green Bay through partnership and support.
                </p>

                {/* Platinum Tier - Smooth Marquee */}
                <div className="mb-24">
                    <div className="flex items-center justify-center gap-4 mb-10">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-black/10" />
                        <span className="text-sm font-google font-bold uppercase tracking-[0.4em] text-[#61A644]">Platinum Partners</span>
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-black/10" />
                    </div>

                    <div className="relative w-full overflow-hidden">
                        {/* Edge Fades for the marquee matching our background gradient */}
                        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                        <motion.div
                            className="flex items-center gap-20 py-4"
                            animate={{
                                x: ["0%", "-50%"]
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            style={{ width: "max-content" }}
                        >
                            {marqueeItems.map((sponsor, idx) => (
                                <div key={`${sponsor.name}-${idx}`} className="w-64 flex items-center justify-center group">
                                    <img
                                        src={sponsor.logo}
                                        alt={sponsor.name}
                                        className="h-20 w-auto object-contain opacity-75 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Gold Tier Section */}
                {gold.length > 0 && (
                    <div className="mb-24">
                        <div className="flex items-center justify-center gap-4 mb-10">
                            <div className="h-px w-12 bg-black/10" />
                            <span className="text-sm font-google font-bold uppercase tracking-[0.3em] text-[#E37100]">Gold Partners</span>
                            <div className="h-px w-12 bg-black/10" />
                        </div>
                        <div className="flex flex-wrap justify-center gap-20 text-center">
                            {gold.map((sponsor) => (
                                <div key={sponsor.name} className="group">
                                    <img
                                        src={sponsor.logo}
                                        alt={sponsor.name}
                                        className="h-16 w-auto object-contain opacity-75 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Silver Tier Section */}
                {silver.length > 0 && (
                    <div className="mb-24">
                        <div className="flex items-center justify-center gap-4 mb-10">
                            <div className="h-px w-12 bg-black/10" />
                            <span className="text-sm font-google font-bold uppercase tracking-[0.3em] text-slate-400">Silver Partners</span>
                            <div className="h-px w-12 bg-black/10" />
                        </div>
                        <div className="flex flex-wrap justify-center gap-16">
                            {silver.map((sponsor) => (
                                <div key={sponsor.name} className="group">
                                    <img
                                        src={sponsor.logo}
                                        alt={sponsor.name}
                                        className="h-14 w-auto object-contain opacity-75 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Call to Action */}
                <div className="mt-20 p-10 border border-black/5 rounded-[3rem] bg-white/70 shadow-md max-w-4xl mx-auto backdrop-blur-md">
                    <p className="text-slate-700 text-lg font-google-text">
                        Interested in showcasing your brand at HackGB 2026?{' '}
                        <a href="mailto:sponsorship@hackgb.com" className="text-[#61A644] font-bold hover:underline ml-1">
                            Download Sponsor Prospectus
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Sponsors;
