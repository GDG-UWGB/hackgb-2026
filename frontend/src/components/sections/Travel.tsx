import { faDiamondTurnRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import UUnion from '../../assets/images/others/UUnion-square.jpg';
import bayBeachImg from '../../assets/images/background/bay-beach.png';
import TransportationInfo from './TransportationInfo';
import { Map, MapPin } from 'lucide-react';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30, filter: 'blur(6px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.8, delay, ease: spring },
});

const Travel = () => {
    const destinationQuery = encodeURIComponent("University of Wisconsin-Green Bay");
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destinationQuery}`;

    return (
        <section className='relative pt-28 pb-48 px-4 overflow-hidden' id="travel">
            {/* Background landmark image with parallax drift */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img src={bayBeachImg} alt="" className="w-full h-full object-cover opacity-[0.45] parallax-bg" />
                <div className="absolute inset-0 bg-[#61A644]/[0.01]" />
            </div>

            {/* Ambient glow */}
            <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#0C3C34]/5 rounded-full blur-[150px] pointer-events-none animate-ambient-glow" />

            <div className='max-w-6xl mx-auto relative z-10'>
                {/* Integrated IDE Travel Card */}
                <motion.div
                    {...fadeUp(0.1)}
                    className="bg-white/45 backdrop-blur-xl rounded-2xl border border-white/25 shadow-xl overflow-hidden flex flex-col min-h-[560px] relative text-left mb-16"
                >
                    {/* IDE Top Window Bar */}
                    <div className="flex items-center justify-between px-4 py-2 border-b border-black/5 bg-white/30">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                            <span className="text-[10px] font-google-mono text-slate-555 ml-3">Find Your Way</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-google-mono text-[9px] text-slate-450 bg-slate-200/50 px-2 py-0.5 rounded border border-black/5">
                            <Map className="w-3.5 h-3.5 text-[#61A644]" />
                            <span>directions.env</span>
                        </div>
                    </div>

                    {/* Editor Tab Bar */}
                    <div className="flex border-b border-black/5 bg-white/20 overflow-x-auto scrollbar-none">
                        <div className="flex items-center gap-2 px-5 py-3 border-r border-black/5 font-google-mono text-xs font-medium bg-white/60 text-[#0C3C34] border-t-2 border-t-[#61A644] flex-1 justify-center">
                            <MapPin className="w-3.5 h-3.5 text-[#61A644]" />
                            directions.env
                        </div>
                    </div>

                    {/* Workspace Editor Body */}
                    <div className="p-6 md:p-8 bg-transparent flex flex-col gap-6">
                        {/* Upper description text */}
                        <div className='flex flex-col lg:flex-row gap-6 text-sm md:text-base text-slate-700 font-google-text leading-relaxed bg-white/65 p-6 rounded-xl border border-black/5 font-semibold shadow-sm'>
                            <p className="flex-1">The University of Wisconsin-Green Bay is located in Green Bay, Wisconsin. It is a medium-sized institution with a beautiful campus located on the shores of the Fox River and Green Bay.</p>
                            <p className="flex-1">Green Bay is a city in northeastern Wisconsin, located on the western shore of Lake Michigan. It is the third-largest city in Wisconsin, with a population of about 107,000 people.</p>
                        </div>

                        {/* Bento Grid */}
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[55vh]'>
                            {/* Left (large): Google Maps container */}
                            <div className="relative min-h-[350px] lg:col-span-2 lg:min-h-0 rounded-xl overflow-hidden border border-black/5 shadow-sm bg-slate-100">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2844.2106338345134!2d-87.92362848785474!3d44.53131957095336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8802e61d64ca7a93%3A0xd35c038e0e1219bd!2sUniversity%20of%20Wisconsin-Green%20Bay!5e0!3m2!1sen!2sus!4v1773608498244!5m2!1sen!2sus"
                                    className="absolute inset-0 w-full h-full"
                                    style={{ border: 0 }}
                                    allowFullScreen={false}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Maps Location"
                                ></iframe>
                                <div className="absolute bottom-4 left-4 z-10">
                                    <a
                                        href={directionsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-[#61A644] hover:bg-[#61A644]/90 text-white px-4 py-2 rounded-xl font-bold text-xs md:text-sm transition-colors shadow-lg"
                                    >
                                        Get directions
                                        <FontAwesomeIcon icon={faDiamondTurnRight} />
                                    </a>
                                </div>
                            </div>

                            {/* Right: Address and Image */}
                            <div className='flex flex-col gap-6 lg:h-full justify-between text-slate-800 font-semibold'>
                                <div className='border border-black/5 rounded-xl py-6 flex flex-col justify-center items-center lg:flex-1 text-center font-google font-bold text-lg md:text-base leading-snug bg-white/70 shadow-sm'>
                                    <h3 className="text-[#0C3C34]">UW Green Bay</h3>
                                    <h3 className="text-slate-850">2420 Nicolet Dr</h3>
                                    <h3 className="text-slate-850">Green Bay</h3>
                                    <h3 className="text-slate-850">WI 54311</h3>
                                </div>
                                <div className='lg:flex-1 hidden md:block rounded-xl overflow-hidden border border-black/5 shadow-sm bg-slate-100'>
                                    <img
                                        src={UUnion}
                                        alt="UWGB Campus"
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* IDE Bottom Status Bar */}
                    <div className="flex justify-between items-center px-4 py-1.5 bg-[#0C3C34] text-white font-google-mono text-[10px] select-none">
                        <div className="flex items-center gap-3">
                            <span className="font-bold">MAP: loaded</span>
                            <span className="opacity-80">Route established</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span>ENV</span>
                            <span>UTF-8</span>
                            <span>Ln 8, Col 4</span>
                        </div>
                    </div>
                </motion.div>

                {/* Transportation Tips */}
                <TransportationInfo />
            </div>
        </section>
    );
};

export default Travel;