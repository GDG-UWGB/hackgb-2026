import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import stemImg from '../../assets/images/background/uwgb-stem.png';
import bayBeachImg from '../../assets/images/background/bay-beach.png';
import TransportationInfo from './TransportationInfo';
import { Map, MapPin, Copy, Check } from 'lucide-react';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30, filter: 'blur(6px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.8, delay, ease: spring },
});

const Travel = () => {
    const [copied, setCopied] = useState(false);

    const copyAddress = () => {
        const fullAddress = "Brown County STEM Innovation Center, 2019 Technology Way, Green Bay, WI 54311";
        navigator.clipboard.writeText(fullAddress).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

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
                {/* Header */}
                <motion.div
                    {...fadeUp(0)}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-google font-bold mb-4 text-[#0C3C34]">
                        Find Your Way
                    </h2>
                </motion.div>

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
                            <p className="flex-1">HackGB will take place at the <strong>Brown County STEM Innovation Center</strong>, a state-of-the-art facility located on the UW-Green Bay campus. The campus is situated on the beautiful shores of Green Bay.</p>
                            <p className="flex-1">Green Bay is a city in northeastern Wisconsin, located on the western shore of Lake Michigan. It is the third-largest city in Wisconsin, with a population of about 107,000 people.</p>
                        </div>

                        {/* Bento Grid */}
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[500px]'>
                            {/* Left (large): Google Maps container */}
                            <div className="relative min-h-[350px] lg:col-span-2 lg:min-h-0 rounded-xl overflow-hidden border border-black/5 shadow-sm bg-slate-100">
                                <iframe
                                    src="https://maps.google.com/maps?q=Brown%20County%20STEM%20Innovation%20Center,%202019%20Technology%20Way,%20Green%20Bay,%20WI%2054311&t=&z=16&ie=UTF8&iwloc=&output=embed"
                                    className="absolute inset-0 w-full h-full"
                                    style={{ border: 0 }}
                                    allowFullScreen={false}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Maps Location"
                                ></iframe>
                            </div>

                            {/* Right: Address and Image */}
                            <div className='flex flex-col gap-6 lg:h-full justify-between text-slate-800 font-semibold'>
                                <button
                                    onClick={copyAddress}
                                    className="border border-black/5 rounded-xl py-4 flex flex-col justify-center items-center text-center font-google font-bold text-lg md:text-base leading-snug bg-white/70 shadow-sm cursor-pointer hover:bg-white/85 hover:border-[#61A644]/30 hover:shadow-md transition-all duration-300 relative group active:scale-[0.98] outline-none w-full shrink-0"
                                    title="Click to copy full address"
                                >
                                    <AnimatePresence mode="wait">
                                        {!copied ? (
                                            <motion.div
                                                key="address"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="flex flex-col items-center"
                                            >
                                                <h3 className="text-[#0C3C34] px-4 font-bold">Brown County STEM Center</h3>
                                                <h3 className="text-slate-850 font-medium">2019 Technology Way</h3>
                                                <h3 className="text-slate-850 font-medium">Green Bay, WI 54311</h3>
                                                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-google-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    <Copy className="w-3.5 h-3.5" />
                                                    <span>Click to copy</span>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="copied"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className="flex flex-col items-center justify-center text-[#61A644]"
                                            >
                                                <Check className="w-8 h-8 mb-2 text-[#61A644]" />
                                                <span className="text-sm font-google-mono font-bold">Address Copied!</span>
                                                <span className="text-[10px] text-slate-400 mt-1">Ready to paste</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                                <div className='lg:flex-1 hidden md:block rounded-xl overflow-hidden border border-black/5 shadow-sm bg-slate-100'>
                                    <img
                                        src={stemImg}
                                        alt="Brown County STEM Innovation Center"
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