import { motion } from 'framer-motion';
import uwgbLogo from '../assets/images/sponsors/UWGB-logo.webp';
import csetLogo from '../assets/images/sponsors/cset-logo.webp';
import googleLogo from '../assets/images/sponsors/google-logo.webp';
import sgaLogo from '../assets/images/sponsors/sga-logo.webp';
import gbWaterfrontImg from '../assets/images/background/gb-waterfront.png';
import prospectusPdf from '../assets/docs/Sponsorship Package.pdf';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

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

    const marqueeItems = [...platinum, ...platinum, ...platinum, ...platinum];

    return (
        <section className="relative pt-20 pb-32 px-4 overflow-hidden" id="sponsors">
            {/* Background landmark image with parallax drift */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img src={gbWaterfrontImg} alt="" className="w-full h-full object-cover opacity-[0.35] parallax-bg" />
                <div className="absolute inset-0 bg-[#61A644]/[0.01]" />
            </div>

            {/* Ambient glow */}
            <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-[#61A644]/5 rounded-full blur-[150px] pointer-events-none animate-ambient-glow" />

            <div className="max-w-7xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, ease: spring }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-6xl font-google font-bold mb-4 text-[#0C3C34]">
                        Our Sponsors
                    </h2>
                    <p className="text-lg text-slate-800 mb-20 max-w-2xl mx-auto font-google-text">
                        Empowering the next generation of innovators in Green Bay through partnership and support.
                    </p>
                </motion.div>

                {/* Platinum Tier - Smooth Marquee */}
                <div className="mb-24">
                    <div className="flex justify-center mb-10">
                        <span className="px-6 py-2 rounded-full glass-card bg-white/95 border border-black/5 text-sm font-google font-bold uppercase tracking-[0.3em] text-[#61A644] shadow-sm">
                            Platinum Partners
                        </span>
                    </div>

                    <div className="relative w-full overflow-hidden">

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
                                        className="h-20 w-auto object-contain transition-all duration-500 transform group-hover:scale-110"
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Gold Tier Section */}
                {gold.length > 0 && (
                    <div className="mb-24">
                        <div className="flex justify-center mb-10">
                            <span className="px-6 py-2 rounded-full glass-card bg-white/95 border border-black/5 text-sm font-google font-bold uppercase tracking-[0.3em] text-[#E37100] shadow-sm">
                                Gold Partners
                            </span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-20 text-center">
                            {gold.map((sponsor) => (
                                <div key={sponsor.name} className="group">
                                    <img
                                        src={sponsor.logo}
                                        alt={sponsor.name}
                                        className="h-16 w-auto object-contain transition-all duration-500 transform group-hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Silver Tier Section */}
                {silver.length > 0 && (
                    <div className="mb-24">
                        <div className="flex justify-center mb-10">
                            <span className="px-6 py-2 rounded-full glass-card bg-white/95 border border-black/5 text-sm font-google font-bold uppercase tracking-[0.3em] text-slate-600 shadow-sm">
                                Silver Partners
                            </span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-16">
                            {silver.map((sponsor) => (
                                <div key={sponsor.name} className="group">
                                    <img
                                        src={sponsor.logo}
                                        alt={sponsor.name}
                                        className="h-14 w-auto object-contain transition-all duration-500 transform group-hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, ease: spring }}
                    viewport={{ once: true }}
                    className="mt-20 glass-card p-10 max-w-4xl mx-auto bg-white/85 border border-black/5 shadow-sm text-slate-700"
                >
                    <p className="text-slate-600 text-lg font-google-text">
                        Interested in showcasing your brand at HackGB 2026?{' '}
                        <a href={prospectusPdf} target="_blank" rel="noopener noreferrer" className="text-[#61A644] font-bold hover:underline ml-1">
                            Download Sponsor Prospectus
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Sponsors;
