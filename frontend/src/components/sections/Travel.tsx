import { faDiamondTurnRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import UUnion from '../../assets/images/others/UUnion-square.jpg';
import bayBeachImg from '../../assets/images/background/bay-beach.png';
import TransportationInfo from './TransportationInfo';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

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

            <div className='max-w-7xl mx-auto relative z-10'>
                <motion.div
                    initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, ease: spring }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-google font-bold mb-4 text-[#0C3C34]">
                        Find Your Way
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, delay: 0.1, ease: spring }}
                    viewport={{ once: true }}
                    className='glass-card p-8 md:p-10 bg-white/95 border border-black/5 shadow-sm mb-16'
                >
                    <div className='flex flex-col lg:flex-row gap-8 text-lg text-slate-800 font-google-text leading-relaxed'>
                        <p className="flex-1">The University of Wisconsin-Green Bay is located in Green Bay, Wisconsin. It is a medium-sized institution with a beautiful campus located on the shores of the Fox River and Green Bay.</p>
                        <p className="flex-1">Green Bay is a city in northeastern Wisconsin, located on the western shore of Lake Michigan. It is the third-largest city in Wisconsin, with a population of about 107,000 people.</p>
                    </div>
                </motion.div>

                {/* Bento Grid */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto lg:h-[80vh]'>
                    {/* Left (large): Google Maps container */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.9, delay: 0.2, ease: spring }}
                        viewport={{ once: true }}
                        className="relative min-h-[400px] lg:col-span-2 lg:min-h-0 glass-card overflow-hidden bg-white border border-black/5 shadow-sm"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2844.2106338345134!2d-87.92362848785474!3d44.53131957095336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8802e61d64ca7a93%3A0xd35c038e0e1219bd!2sUniversity%20of%20Wisconsin-Green%20Bay!5e0!3m2!1sen!2sus!4v1773608498244!5m2!1sen!2sus"
                            className="absolute inset-0 w-full h-full"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Maps Location"
                        ></iframe>
                        <div className="absolute bottom-6 left-6 z-10">
                            <a
                                href={directionsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-[#61A644] hover:bg-[#61A644]/90 text-white px-5 py-2.5 rounded-full font-medium transition-colors shadow-lg text-sm md:text-base"
                            >
                                Get directions
                                <FontAwesomeIcon icon={faDiamondTurnRight} />
                            </a>
                        </div>
                    </motion.div>

                    {/* Right: Address (top) and image (bottom) */}
                    <div className='flex flex-col gap-6 lg:h-full'>
                        <motion.div
                            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.9, delay: 0.3, ease: spring }}
                            viewport={{ once: true }}
                            className='glass-card py-10 lg:py-0 flex flex-col justify-center items-center lg:flex-1 text-center font-google font-bold text-2xl md:text-xl 2xl:text-2xl leading-snug bg-white/94 border border-black/5 shadow-sm'
                        >
                            <h3 className="text-[#0C3C34]">UW Green Bay</h3>
                            <h3 className="text-slate-900">2420 Nicolet Dr</h3>
                            <h3 className="text-slate-900">Green Bay</h3>
                            <h3 className="text-slate-900">WI 54311</h3>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.9, delay: 0.4, ease: spring }}
                            viewport={{ once: true }}
                            className='lg:flex-1 hidden md:block glass-card overflow-hidden border border-black/5 shadow-sm bg-white'
                        >
                            <img
                                src={UUnion}
                                alt="UWGB Campus"
                                className='w-full h-full object-cover transition-all duration-500'
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Transportation Tips */}
                <TransportationInfo />
            </div>
        </section>
    );
};

export default Travel;