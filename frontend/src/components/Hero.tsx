import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import logo from '../assets/images/HGBL - DKGN.png';

const Hero = () => {
    return (
        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 overflow-hidden bg-transparent">
            {/* Tech grid layout overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(12,60,52,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(12,60,52,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            {/* Vibrant ambient gradients — UWGB green & gold */}
            <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[600px] bg-[#61A644]/12 rounded-full blur-[130px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-[#E37100]/10 rounded-full blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: '12s' }} />
            <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-[#ffcc00]/8 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />

            <div className="max-w-5xl mx-auto z-10 flex flex-col items-center">
                {/* Phoenix Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, type: "spring", stiffness: 100 }}
                    className="mb-8"
                >
                    <img
                        src={logo}
                        alt="HackGB Phoenix Logo"
                        className="h-32 md:h-44 w-auto drop-shadow-[0_8px_32px_rgba(97,166,68,0.25)] hover:drop-shadow-[0_12px_48px_rgba(227,113,0,0.3)] transition-all duration-500 animate-float"
                    />
                </motion.div>

                {/* Applications Opening Soon Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mb-8"
                >
                    <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0C3C34]/5 border border-[#61A644]/25 text-[#0C3C34] font-google font-bold text-sm uppercase tracking-widest backdrop-blur-sm shadow-sm">
                        <span className="w-2 h-2 bg-[#61A644] rounded-full animate-pulse" />
                        Green Bay City Tour
                    </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-5xl md:text-8xl font-google font-bold mb-4 tracking-tight text-slate-900"
                >
                    HackGB <span className="text-gradient-phoenix">2026</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-xl md:text-3xl font-google-text font-medium text-slate-700 mb-4 mx-auto max-w-3xl"
                >
                    Rise of the <span className="text-gradient-phoenix">Phoenix</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto mb-12 font-google-text"
                >
                    A mythical 24-hour coding journey from Bay Beach to the STEM Innovation Center. Build, learn, and innovate across Green Bay.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link
                        to="register"
                        smooth={true}
                        duration={500}
                        className="w-full sm:w-auto bg-[#61A644] hover:bg-[#61A644]/90 text-white px-10 py-4 rounded-full font-google font-bold text-lg transition-all shadow-[0_10px_30px_-10px_rgba(97,166,68,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(97,166,68,0.2)] transform hover:-translate-y-1 text-center animate-pulse-glow cursor-pointer"
                    >
                        Apply Now
                    </Link>
                    <Link
                        to="about"
                        smooth={true}
                        duration={500}
                        className="w-full sm:w-auto text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-350 bg-white hover:bg-slate-50 px-8 py-4 rounded-full font-google-text font-medium transition-all text-center shadow-sm cursor-pointer"
                    >
                        Learn More
                    </Link>
                </motion.div>
            </div>

            {/* MLH Badge */}
            <div className="fixed top-0 right-0 p-4 z-[60]">
                <a id="mlh-trust-badge" style={{ display: 'block', maxWidth: '100px', minWidth: '60px', width: '10%' }} href="https://mlh.io/seasons/2026/events?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white" target="_blank">
                    <img src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-white.svg" alt="Major League Hacking 2026 Hackathon Season" style={{ width: '100%' }} />
                </a>
            </div>
        </section>
    );
};

export default Hero;
