import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { GoogleCircle, GoogleTriangle, GoogleSquare, GooglePill } from '../assets/icons/GoogleShapes';

const Hero = () => {
    const targetDate = new Date('2026-10-27T00:00:00').getTime();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            } else {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const shapes = [
        { Icon: GoogleCircle, color: 'text-google-blue', size: 120, x: '10%', y: '20%', duration: 15 },
        { Icon: GoogleTriangle, color: 'text-google-red', size: 140, x: '85%', y: '15%', duration: 18 },
        { Icon: GoogleSquare, color: 'text-google-green', size: 110, x: '75%', y: '70%', duration: 20 },
        { Icon: GooglePill, color: 'text-google-yellow', size: 130, x: '15%', y: '80%', duration: 22 },
        { Icon: GoogleCircle, color: 'text-google-green', size: 100, x: '80%', y: '40%', duration: 17 },
        { Icon: GoogleTriangle, color: 'text-google-blue', size: 130, x: '5%', y: '50%', duration: 16 },
        { Icon: GoogleSquare, color: 'text-google-red', size: 90, x: '40%', y: '10%', duration: 19 },
        { Icon: GooglePill, color: 'text-google-blue', size: 110, x: '60%', y: '85%', duration: 21 },
        { Icon: GoogleCircle, color: 'text-google-yellow', size: 80, x: '25%', y: '5%', duration: 23 },
    ];

    return (
        <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-20 overflow-hidden bg-white">
            {/* Animated Background Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {shapes.map((shape, index) => (
                    <motion.div
                        key={index}
                        className={`absolute ${shape.color} opacity-40`}
                        initial={{ left: '50%', top: '50%', scale: 0, opacity: 0 }}
                        animate={{
                            left: shape.x,
                            top: shape.y,
                            scale: 1,
                            opacity: 0.4,
                            y: [0, -40, 0],
                            x: [0, 20, 0],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            left: { type: "spring", stiffness: 50, damping: 10, restDelta: 0.001, duration: 1.5 },
                            top: { type: "spring", stiffness: 50, damping: 10, restDelta: 0.001, duration: 1.5 },
                            scale: { type: "spring", stiffness: 100, damping: 15, duration: 1.5 },
                            opacity: { duration: 1.2 },
                            y: { duration: shape.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
                            x: { duration: shape.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
                            rotate: { duration: shape.duration * 1.5, repeat: Infinity, repeatType: "loop", ease: "linear" },
                        }}
                        style={{ position: 'absolute' }}
                    >
                        <shape.Icon width={shape.size} height={shape.size} />
                    </motion.div>
                ))}
            </div>

            {/* Background blobs for premium look */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[700px] h-[700px] bg-google-blue/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-google-green/10 rounded-full blur-[100px] -z-10" />

            <div className="max-w-6xl mx-auto z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-google font-bold mb-6 tracking-tight text-google-black"
                >
                    HackGB <span className="text-google-blue">2026</span>
                </motion.h1>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-2xl md:text-3xl font-google-text font-medium text-google-black/80 mb-8 mx-auto max-w-2xl"
                >
                    UW-Green Bay's First Collegiate Hackathon
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg md:text-xl text-google-black/60 max-w-2xl mx-auto mb-12"
                >
                    36 Hours of Building, Learning, and Innovation at the STEM Innovation Center.
                </motion.p>

                {/* Countdown Timer (Center Aligned) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12"
                >
                    {Object.entries(timeLeft).map(([label, value]) => (
                        <div key={label} className="flex flex-col items-center bg-white/40 backdrop-blur-sm border border-google-off-white p-6 rounded-3xl shadow-sm min-w-[110px]">
                            <span className="text-4xl md:text-5xl font-google-mono font-bold text-google-black">{value.toString().padStart(2, '0')}</span>
                            <span className="text-xs font-google font-bold uppercase tracking-widest text-google-black/30 mt-2">{label}</span>
                        </div>
                    ))}
                </motion.div>

                {/* Primary and Secondary CTAs (Center Aligned) */}
                <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                    <Link
                        to="register"
                        smooth={true}
                        className="w-full sm:w-auto bg-google-blue hover:bg-google-blue/90 text-white px-12 py-5 rounded-3xl font-google font-bold text-lg transition-all shadow-[0_10px_30px_-10px_rgba(66,133,244,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(66,133,244,0.4)] transform hover:-translate-y-1 text-center"
                    >
                        Register Now
                    </Link>
                    <div className="flex flex-wrap justify-center gap-3">
                        {['Volunteer', 'Judge/Mentor', 'Sponsor'].map((role) => (
                            <Link
                                key={role}
                                to={role.toLowerCase().replace('/', '-')}
                                smooth={true}
                                className="bg-google-off-white hover:bg-google-off-white/80 text-google-black/70 px-8 py-4 rounded-3xl font-google-text font-bold transition-all cursor-pointer border border-transparent hover:border-google-black/10"
                            >
                                {role}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* MLH Badge Placeholder Integration */}
            <div className="fixed top-0 right-0 p-4 z-[60]">
                <a id="mlh-trust-badge" style={{ display: 'block', maxWidth: '100px', minWidth: '60px', width: '10%' }} href="https://mlh.io/seasons/2026/events?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white" target="_blank">
                    <img src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-white.svg" alt="Major League Hacking 2026 Hackathon Season" style={{ width: '100%' }} />
                </a>
            </div>
        </section >
    );
};

export default Hero;
