import { motion } from 'framer-motion';
import { ArrowUpRight, FolderHeart, Heart } from 'lucide-react';
import uwgbLogo from '../assets/images/sponsors/phoenix/UWGB-logo.webp';
import csetLogo from '../assets/images/sponsors/phoenix/cset-logo.webp';
import googleLogo from '../assets/images/sponsors/phoenix/google-logo.webp';
import startupWisconsinLogo from '../assets/images/sponsors/phoenix/startup-wisconsin-logo-color.png';
import sgaLogo from '../assets/images/sponsors/spark/sga-logo.png';
import gener8torLogo from '../assets/images/sponsors/ember/gener8tor.png';
import campusCatalystsLogo from '../assets/images/sponsors/flame/campus-catalysts.png';
import gbWaterfrontImg from '../assets/images/background/gb-waterfront.png';
import prospectusPdf from '../assets/docs/Sponsorship Package.pdf';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30, filter: 'blur(6px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.8, delay, ease: spring },
});

interface Sponsor {
    name: string;
    logo: string;
    tier: 'phoenix' | 'flame' | 'ember' | 'spark';
    link?: string;
}

const sponsors: Sponsor[] = [
    { name: 'UW-Green Bay', logo: uwgbLogo, tier: 'phoenix', link: 'https://www.uwgb.edu/' },
    { name: 'Google', logo: googleLogo, tier: 'phoenix', link: 'https://google.com/' },
    { name: 'CSET', logo: csetLogo, tier: 'phoenix', link: 'https://www.uwgb.edu/cset/' },
    { name: 'Startup Wisconsin', logo: startupWisconsinLogo, tier: 'phoenix', link: 'https://www.startupwi.org/' },
    { name: 'Campus Catalysts', logo: campusCatalystsLogo, tier: 'flame', link: 'https://www.campuscatalysts.com/' },
    { name: 'gener8tor', logo: gener8torLogo, tier: 'ember', link: 'https://www.gener8tor.com/' },
    { name: 'SGA', logo: sgaLogo, tier: 'spark', link: 'https://www.uwgb.edu/sga/' },
];

const Sponsors = () => {
    const phoenixSponsors = sponsors.filter(s => s.tier === 'phoenix');
    const flameSponsors = sponsors.filter(s => s.tier === 'flame');
    const emberSponsors = sponsors.filter(s => s.tier === 'ember');
    const sparkSponsors = sponsors.filter(s => s.tier === 'spark');

    const renderSponsorCards = (list: Sponsor[], cardWidthClass: string, imgHeightClass: string) => {
        return (
            <div className="flex flex-wrap gap-6 justify-center items-center">
                {list.map((sponsor, idx) => {
                    const card = (
                        <motion.div
                            key={sponsor.name}
                            {...fadeUp(0.05 * (idx + 1))}
                            className={`group bg-white border border-black/5 rounded-xl p-6 flex items-center justify-center ${cardWidthClass} hover:border-[#61A644]/30 hover:shadow-sm transition-all duration-300`}
                        >
                            <img
                                src={sponsor.logo}
                                alt={sponsor.name}
                                className={`${imgHeightClass} w-auto object-contain transition-transform duration-500 group-hover:scale-105`}
                            />
                        </motion.div>
                    );
                    return sponsor.link ? (
                        <a key={sponsor.name} href={sponsor.link} target="_blank" rel="noopener noreferrer">
                            {card}
                        </a>
                    ) : (
                        card
                    );
                })}
            </div>
        );
    };

    return (
        <section className="relative pt-20 pb-32 px-4 overflow-hidden" id="sponsors">
            {/* Background landmark image with parallax drift */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img src={gbWaterfrontImg} alt="" className="w-full h-full object-cover opacity-[0.35] parallax-bg" />
                <div className="absolute inset-0 bg-[#61A644]/[0.01]" />
            </div>

            {/* Ambient glow */}
            <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-[#61A644]/5 rounded-full blur-[150px] pointer-events-none animate-ambient-glow" />

            <div className="max-w-5xl mx-auto text-center relative z-10">
                {/* Header */}
                <motion.div
                    {...fadeUp(0)}
                    className="text-center mb-16 animate-fade-in"
                >
                    <h2 className="text-4xl md:text-6xl font-google font-bold mb-4 text-[#0C3C34]">
                        Sponsors & Partners
                    </h2>
                </motion.div>

                {/* Integrated IDE Sponsors Card */}
                <motion.div
                    {...fadeUp(0.15)}
                    className="bg-white/45 backdrop-blur-xl rounded-2xl border border-white/25 shadow-xl overflow-hidden flex flex-col min-h-[460px] relative text-left"
                >
                    {/* IDE Top Window Bar */}
                    <div className="flex items-center justify-between px-4 py-2 border-b border-black/5 bg-white/30">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                            <span className="text-[10px] font-google-mono text-slate-500 ml-3">Our Sponsors</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-google-mono text-[9px] text-slate-450 bg-slate-200/50 px-2 py-0.5 rounded border border-black/5">
                            <FolderHeart className="w-3.5 h-3.5 text-[#61A644]" />
                            <span>dependencies.json</span>
                        </div>
                    </div>

                    {/* Editor Tab Bar */}
                    <div className="flex border-b border-black/5 bg-white/20 overflow-x-auto scrollbar-none">
                        <div className="flex items-center gap-2 px-5 py-3 border-r border-black/5 font-google-mono text-xs font-medium bg-white/60 text-[#0C3C34] border-t-2 border-t-[#61A644] flex-1 justify-center">
                            <Heart className="w-3.5 h-3.5 text-[#61A644] fill-current" />
                            dependencies.json
                        </div>
                    </div>

                    {/* Workspace Editor Body */}
                    <div className="p-6 md:p-10 bg-transparent space-y-12">
                        {/* Phoenix Tier */}
                        {phoenixSponsors.length > 0 && (
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-3 mb-6 border-b border-black/5 pb-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#61A644]" />
                                    <span className="font-google-mono font-bold text-xs uppercase tracking-wider text-slate-500">"phoenix-tier-dependencies" : [</span>
                                </div>
                                {renderSponsorCards(phoenixSponsors, 'w-48 h-24', 'h-12')}
                            </div>
                        )}

                        {/* Flame Tier */}
                        {flameSponsors.length > 0 && (
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-3 mb-6 border-b border-black/5 pb-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#E37100]" />
                                    <span className="font-google-mono font-bold text-xs uppercase tracking-wider text-slate-500">"flame-tier-dependencies" : [</span>
                                </div>
                                {renderSponsorCards(flameSponsors, 'w-44 h-20', 'h-10')}
                            </div>
                        )}

                        {/* Ember Tier */}
                        {emberSponsors.length > 0 && (
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-3 mb-6 border-b border-black/5 pb-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffcc00]" />
                                    <span className="font-google-mono font-bold text-xs uppercase tracking-wider text-slate-500">"ember-tier-dependencies" : [</span>
                                </div>
                                {renderSponsorCards(emberSponsors, 'w-40 h-16', 'h-8')}
                            </div>
                        )}

                        {/* Spark Tier */}
                        {(sparkSponsors.length > 0 || prospectusPdf) && (
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-3 mb-6 border-b border-black/5 pb-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#0C3C34]" />
                                    <span className="font-google-mono font-bold text-xs uppercase tracking-wider text-slate-500">"spark-tier-dependencies" : [</span>
                                </div>
                                <div className="flex flex-wrap gap-6 justify-center items-center">
                                    {/* SGA Spark Sponsor */}
                                    {sparkSponsors.map((sponsor, idx) => (
                                        <a key={sponsor.name} href={sponsor.link} target="_blank" rel="noopener noreferrer">
                                            <motion.div
                                                {...fadeUp(0.05 * (idx + 1))}
                                                className="group bg-white border border-black/5 rounded-xl px-5 py-4 flex items-center justify-center gap-3 w-36 h-16 hover:border-slate-350 hover:shadow-sm transition-all duration-300"
                                            >
                                                <img
                                                    src={sponsor.logo}
                                                    alt={sponsor.name}
                                                    className="h-8 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </motion.div>
                                        </a>
                                    ))}

                                    {/* Become a Sponsor CTA */}
                                    <motion.a
                                        {...fadeUp(0.25)}
                                        href={prospectusPdf}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group rounded-xl px-5 h-16 border border-dashed border-[#61A644]/40 hover:border-[#61A644]/70 bg-white hover:bg-white/90 transition-all duration-300 flex flex-col items-center justify-center gap-1 w-36 cursor-pointer"
                                    >
                                        <ArrowUpRight className="w-4 h-4 text-[#61A644]/60 group-hover:text-[#61A644] transition-colors" />
                                        <span className="font-google font-bold text-[11px] text-[#61A644]/80 group-hover:text-[#61A644] transition-colors">
                                            Become Sponsor
                                        </span>
                                    </motion.a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* IDE Bottom Status Bar */}
                    <div className="flex justify-between items-center px-4 py-1.5 bg-[#0C3C34] text-white font-google-mono text-[10px] select-none">
                        <div className="flex items-center gap-3">
                            <span className="font-bold">DEPS: verified</span>
                            <span className="opacity-80">Sponsors active</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="opacity-80">JSON</span>
                            <span className="opacity-80">UTF-8</span>
                            <span className="opacity-80">Ln {sponsors.length + 8}, Col 4</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Sponsors;
