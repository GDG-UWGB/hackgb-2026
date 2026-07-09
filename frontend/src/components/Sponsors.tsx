import { motion } from 'framer-motion';
import uwgbLogo from '../assets/images/sponsors/phoenix/UWGB-logo.webp';
import csetLogo from '../assets/images/sponsors/phoenix/cset-logo.webp';
import googleLogo from '../assets/images/sponsors/phoenix/google-logo.webp';
import sgaLogo from '../assets/images/sponsors/spark/sga-logo.png';
import gener8torLogo from '../assets/images/sponsors/ember/gener8tor.png';
import campusCatalystsLogo from '../assets/images/sponsors/flame/campus-catalysts.png';
import gbWaterfrontImg from '../assets/images/background/gb-waterfront.png';
import prospectusPdf from '../assets/docs/Sponsorship Package.pdf';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

interface Sponsor {
    name: string;
    logo: string;
    tier: 'phoenix' | 'flame' | 'ember' | 'spark';
    group: 'partner' | 'sponsor';
    link?: string;
}

const sponsors: Sponsor[] = [
    { name: 'UW-Green Bay', logo: uwgbLogo, tier: 'phoenix', group: 'partner', link: 'https://www.uwgb.edu/' },
    { name: 'Google', logo: googleLogo, tier: 'phoenix', group: 'partner', link: 'https://google.com/' },
    { name: 'CSET', logo: csetLogo, tier: 'phoenix', group: 'partner', link: 'https://www.uwgb.edu/cset/' },
    { name: 'gener8tor', logo: gener8torLogo, tier: 'ember', group: 'sponsor', link: 'https://www.gener8tor.com/' },
    { name: 'Campus Catalysts', logo: campusCatalystsLogo, tier: 'flame', group: 'sponsor' },
    { name: 'SGA', logo: sgaLogo, tier: 'spark', group: 'sponsor', link: 'https://www.uwgb.edu/sga/' },
];

const Sponsors = () => {
    const partners = sponsors.filter(s => s.group === 'partner');
    const otherSponsors = sponsors.filter(s => s.group === 'sponsor');

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

                {/* Partners Section (Phoenix Tier) */}
                <div className="mb-24">
                    <div className="flex justify-center mb-10">
                        <span className="px-6 py-2 rounded-full glass-card bg-white/95 border border-black/5 text-sm font-google font-bold uppercase tracking-wider text-[#61A644] shadow-sm">
                            Partners
                        </span>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 max-w-4xl mx-auto">
                        {partners.map((sponsor) => {
                            const imgElement = (
                                <img
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    className="h-20 sm:h-22 md:h-24 w-auto object-contain transition-all duration-500 transform group-hover:scale-110"
                                />
                            );
                            return (
                                <div key={sponsor.name} className="group flex items-center justify-center p-4">
                                    {sponsor.link ? (
                                        <a href={sponsor.link} target="_blank" rel="noopener noreferrer">
                                            {imgElement}
                                        </a>
                                    ) : (
                                        imgElement
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Sponsors Section (Ember & Spark Tiers) */}
                <div className="mb-24">
                    <div className="flex justify-center mb-10">
                        <span className="px-6 py-2 rounded-full glass-card bg-white/95 border border-black/5 text-sm font-google font-bold uppercase tracking-wider text-[#E37100] shadow-sm">
                            Sponsors
                        </span>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-4xl mx-auto">
                        {otherSponsors.map((sponsor) => {
                            // Sizing hierarchy: phoenix > flame > ember > spark
                            let sizeClass = "h-8 sm:h-10 md:h-12"; // spark default
                            if (sponsor.tier === 'ember') {
                                sizeClass = "h-12 sm:h-14 md:h-16";
                            } else if (sponsor.tier === 'flame') {
                                sizeClass = "h-16 sm:h-18 md:h-20";
                            } else if (sponsor.tier === 'phoenix') {
                                sizeClass = "h-20 sm:h-22 md:h-24";
                            }

                            const imgElement = (
                                <img
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    className={`${sizeClass} w-auto object-contain transition-all duration-500 transform group-hover:scale-110`}
                                />
                            );

                            return (
                                <div key={sponsor.name} className="group flex items-center justify-center p-2">
                                    {sponsor.link ? (
                                        <a href={sponsor.link} target="_blank" rel="noopener noreferrer">
                                            {imgElement}
                                        </a>
                                    ) : (
                                        imgElement
                                    )}
                                </div>
                            );
                        })}

                        {/* More coming soon indicator styled like a logo card */}
                        <div className="flex items-center justify-center p-2">
                            <div className="h-12 sm:h-14 md:h-16 px-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50/30 flex items-center justify-center hover:bg-slate-50/60 hover:border-[#61A644]/50 transition-all duration-300 group">
                                <span className="text-slate-500 group-hover:text-[#61A644] font-google font-medium text-sm md:text-base tracking-wide transition-colors duration-300">
                                    More coming soon...
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

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
