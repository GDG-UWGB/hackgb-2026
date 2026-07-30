import { motion } from 'framer-motion';
import { ArrowUpRight, FolderHeart, Heart } from 'lucide-react';
import uwgbLogo from '../assets/images/sponsors/phoenix/UWGB-logo.webp';
import csetLogo from '../assets/images/sponsors/phoenix/cset-logo.webp';
import googleLogo from '../assets/images/sponsors/phoenix/google-logo.webp';
import startupWisconsinLogo from '../assets/images/sponsors/partners/startup-wisconsin-logo-color.png';
import modalLogo from '../assets/images/sponsors/phoenix/modal.png';
import sgaLogo from '../assets/images/sponsors/partners/sga-logo.png';
import gener8torLogo from '../assets/images/sponsors/ember/gener8tor.png';
import campusCatalystsLogo from '../assets/images/sponsors/flame/campus-catalysts.png';
import akPizzaLogo from '../assets/images/sponsors/flame/ak-pizza.png';
import cityOfGbLogo from '../assets/images/sponsors/partners/city-of-gb.png';
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
    tier: 'phoenix' | 'flame' | 'ember' | 'spark' | 'partner';
    link?: string;
}

const sponsors: Sponsor[] = [
    { name: 'University of Wisconsin-Green Bay', logo: uwgbLogo, tier: 'phoenix', link: 'https://www.uwgb.edu/' },
    { name: 'Google', logo: googleLogo, tier: 'phoenix', link: 'https://google.com/' },
    { name: 'Modal', logo: modalLogo, tier: 'phoenix', link: 'https://modal.com' },
    { name: 'College of Science, Engineering and Technology', logo: csetLogo, tier: 'phoenix', link: 'https://www.uwgb.edu/cset/' },
    { name: 'Campus Catalysts', logo: campusCatalystsLogo, tier: 'flame', link: 'https://www.campuscatalysts.com/' },
    { name: 'AK Pizza Crust', logo: akPizzaLogo, tier: 'flame', link: 'https://www.akcrust.com/' },
    { name: 'gener8tor', logo: gener8torLogo, tier: 'ember', link: 'https://www.gener8tor.com/' },
    { name: 'Startup Wisconsin', logo: startupWisconsinLogo, tier: 'partner', link: 'https://www.startupwi.org/' },
    { name: 'City of Green Bay', logo: cityOfGbLogo, tier: 'partner', link: 'https://greenbaywi.gov/' },
    { name: 'Student Government Association', logo: sgaLogo, tier: 'partner', link: 'https://www.uwgb.edu/sga/' },
];

const Sponsors = () => {
    const phoenixSponsors = sponsors.filter(s => s.tier === 'phoenix');
    const flameSponsors = sponsors.filter(s => s.tier === 'flame');
    const emberSponsors = sponsors.filter(s => s.tier === 'ember');
    const sparkSponsors = sponsors.filter(s => s.tier === 'spark');
    const partnerSponsors = sponsors.filter(s => s.tier === 'partner');

    const renderSponsorCards = (
        list: Sponsor[],
        cardWidthClass: string,
        imgHeightClass: string,
        maxContainerWidthClass: string = 'max-w-5xl',
        textSizeClass: string = 'text-xs md:text-sm font-semibold'
    ) => {
        return (
            <div className={`flex flex-wrap gap-6 md:gap-8 justify-center items-start ${maxContainerWidthClass} mx-auto`}>
                {list.map((sponsor, idx) => {
                    const cardContent = (
                        <motion.div
                            key={sponsor.name}
                            {...fadeUp(0.05 * (idx + 1))}
                            className="group flex flex-col items-center gap-2.5 text-center cursor-pointer"
                        >
                            {/* White Logo Card Box */}
                            <div className={`bg-white border border-black/5 rounded-xl p-4 flex items-center justify-center ${cardWidthClass} group-hover:border-[#61A644]/40 group-hover:shadow-md transition-all duration-300`}>
                                <img
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    className={`${imgHeightClass} w-auto object-contain transition-transform duration-500 group-hover:scale-105`}
                                />
                            </div>

                            {/* Sponsor Name below the logo box */}
                            <span className={`${textSizeClass} font-google text-slate-700 max-w-[95%] text-center group-hover:text-[#0C3C34] transition-colors leading-tight`}>
                                {sponsor.name}
                            </span>
                        </motion.div>
                    );
                    return sponsor.link ? (
                        <a key={sponsor.name} href={sponsor.link} target="_blank" rel="noopener noreferrer">
                            {cardContent}
                        </a>
                    ) : (
                        cardContent
                    );
                })}
            </div>
        );
    };

    return (
        <section className="relative pt-16 pb-28 px-4 overflow-hidden" id="sponsors">
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
                    className="text-center mb-12 animate-fade-in"
                >
                    <h2 className="text-4xl md:text-5xl font-google font-bold mb-3 text-[#0C3C34]">
                        Sponsors & Partners
                    </h2>
                </motion.div>

                {/* Integrated IDE Sponsors Card */}
                <motion.div
                    {...fadeUp(0.15)}
                    className="bg-white/45 backdrop-blur-xl rounded-2xl border border-white/25 shadow-xl overflow-hidden flex flex-col min-h-[450px] relative text-left"
                >
                    {/* IDE Top Window Bar */}
                    <div className="flex items-center justify-between px-4 py-2 border-b border-black/5 bg-white/30">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                            <span className="text-xs font-google-mono text-slate-500 ml-3">Our Sponsors</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-google-mono text-[10px] text-slate-450 bg-slate-200/50 px-2.5 py-1 rounded border border-black/5">
                            <FolderHeart className="w-4 h-4 text-[#61A644]" />
                            <span>dependencies.json</span>
                        </div>
                    </div>

                    {/* Editor Tab Bar */}
                    <div className="flex border-b border-black/5 bg-white/20 overflow-x-auto scrollbar-none">
                        <div className="flex items-center gap-2 px-6 py-2.5 border-r border-black/5 font-google-mono text-xs font-medium bg-white/60 text-[#0C3C34] border-t-2 border-t-[#61A644] flex-1 justify-center">
                            <Heart className="w-4 h-4 text-[#61A644] fill-current" />
                            dependencies.json
                        </div>
                    </div>

                    {/* Workspace Editor Body */}
                    <div className="p-6 md:p-10 bg-transparent space-y-10">
                        {/* Phoenix Tier */}
                        {phoenixSponsors.length > 0 && (
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-3 mb-6 border-b border-black/5 pb-3">
                                    <span className="w-3 h-3 rounded-full bg-[#61A644]" />
                                    <span className="font-google-mono font-bold text-xs uppercase tracking-wider text-slate-500">"phoenix-tier-dependencies" : [</span>
                                </div>
                                {renderSponsorCards(phoenixSponsors, 'w-64 md:w-72 h-32 md:h-36', 'h-18 md:h-22', 'max-w-[960px]', 'text-xs md:text-sm font-semibold')}
                            </div>
                        )}

                        {/* Flame Tier */}
                        {flameSponsors.length > 0 && (
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-3 mb-6 border-b border-black/5 pb-3">
                                    <span className="w-3 h-3 rounded-full bg-[#E37100]" />
                                    <span className="font-google-mono font-bold text-xs uppercase tracking-wider text-slate-500">"flame-tier-dependencies" : [</span>
                                </div>
                                {renderSponsorCards(flameSponsors, 'w-48 md:w-52 h-24 md:h-28', 'h-14 md:h-16', 'max-w-[900px]', 'text-xs font-medium')}
                            </div>
                        )}

                        {/* Ember Tier */}
                        {emberSponsors.length > 0 && (
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-3 mb-6 border-b border-black/5 pb-3">
                                    <span className="w-3 h-3 rounded-full bg-[#ffcc00]" />
                                    <span className="font-google-mono font-bold text-xs uppercase tracking-wider text-slate-500">"ember-tier-dependencies" : [</span>
                                </div>
                                {renderSponsorCards(emberSponsors, 'w-40 md:w-44 h-20 md:h-24', 'h-10 md:h-12', 'max-w-[780px]', 'text-[11px] font-medium')}
                            </div>
                        )}

                        {/* Spark Tier */}
                        {(sparkSponsors.length > 0 || prospectusPdf) && (
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-3 mb-6 border-b border-black/5 pb-3">
                                    <span className="w-3 h-3 rounded-full bg-[#0C3C34]" />
                                    <span className="font-google-mono font-bold text-xs uppercase tracking-wider text-slate-500">"spark-tier-dependencies" : [</span>
                                </div>
                                <div className="flex flex-wrap gap-5 md:gap-6 justify-center items-start max-w-[840px] mx-auto">
                                    {sparkSponsors.map((sponsor, idx) => (
                                        <a key={sponsor.name} href={sponsor.link} target="_blank" rel="noopener noreferrer">
                                            <motion.div
                                                {...fadeUp(0.05 * (idx + 1))}
                                                className="group flex flex-col items-center gap-2 text-center"
                                            >
                                                <div className="bg-white border border-black/5 rounded-xl p-3 flex items-center justify-center w-32 md:w-36 h-18 md:h-20 group-hover:border-slate-350 group-hover:shadow-sm transition-all duration-300">
                                                    <img
                                                        src={sponsor.logo}
                                                        alt={sponsor.name}
                                                        className="h-8 md:h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                </div>
                                                <span className="text-[10px] font-google text-slate-700 text-center font-medium leading-tight max-w-[95%]">
                                                    {sponsor.name}
                                                </span>
                                            </motion.div>
                                        </a>
                                    ))}

                                    {/* Become a Sponsor CTA */}
                                    <motion.a
                                        {...fadeUp(0.25)}
                                        href={prospectusPdf}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group rounded-xl px-4 h-18 md:h-20 border border-dashed border-[#61A644]/40 hover:border-[#61A644]/70 bg-white hover:bg-white/90 transition-all duration-300 flex flex-col items-center justify-center gap-1 w-32 md:w-36 cursor-pointer"
                                    >
                                        <ArrowUpRight className="w-4 h-4 text-[#61A644]/60 group-hover:text-[#61A644] transition-colors" />
                                        <span className="font-google font-bold text-[11px] text-[#61A644]/80 group-hover:text-[#61A644] transition-colors">
                                            Become Sponsor
                                        </span>
                                    </motion.a>
                                </div>
                            </div>
                        )}

                        {/* Partners */}
                        {partnerSponsors.length > 0 && (
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-3 mb-6 border-b border-black/5 pb-3">
                                    <span className="w-3 h-3 rounded-full bg-[#4285F4]" />
                                    <span className="font-google-mono font-bold text-xs uppercase tracking-wider text-slate-500">"partners" : [</span>
                                </div>
                                {renderSponsorCards(partnerSponsors, 'w-48 md:w-52 h-24 md:h-28', 'h-14 md:h-16', 'max-w-[900px]', 'text-xs font-medium')}
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
