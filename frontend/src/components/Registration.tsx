import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import titletownImg from '../assets/images/titletown-district.png';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

const Registration = () => {
    const navigate = useNavigate();

    return (
        <section className="relative pt-20 pb-32 px-4 overflow-hidden" id="register">
            {/* Background landmark image with parallax drift */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img src={titletownImg} alt="" className="w-full h-full object-cover opacity-[0.35] parallax-bg" />
                <div className="absolute inset-0 bg-[#61A644]/[0.01]" />
            </div>

            {/* Ambient glow */}
            <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#61A644]/5 rounded-full blur-[150px] pointer-events-none animate-ambient-glow" />

            <div className="max-w-3xl mx-auto text-center relative z-10 pt-8">
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, ease: spring }}
                    viewport={{ once: true }}
                >
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card bg-white/95 border border-black/5 text-[#61A644] font-google font-bold text-sm uppercase tracking-widest mb-8 shadow-sm">
                        <span className="w-2 h-2 bg-[#61A644] rounded-full animate-ambient-glow" />
                        Applications Open
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, delay: 0.1, ease: spring }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-google font-bold mb-4 text-[#0C3C34]"
                >
                    Join the Tour
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, delay: 0.2, ease: spring }}
                    viewport={{ once: true }}
                    className="text-lg text-slate-800 mb-12 max-w-xl mx-auto font-google-text"
                >
                    Applications are officially open! Submit your details now to join us as a hacker, mentor, or volunteer for an unforgettable weekend of coding and community.
                </motion.p>

                {/* Apply Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, delay: 0.3, ease: spring }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <button
                        onClick={() => navigate('/apply')}
                        className="btn-primary px-10 py-4 rounded-full font-google font-bold text-lg cursor-pointer shadow-lg transform hover:-translate-y-0.5 active:scale-95 transition-all inline-flex items-center gap-2"
                    >
                        Apply Now
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </motion.div>

                {/* Role pills */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.5, ease: spring }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-3 mt-12"
                >
                    {['Hacker', 'Mentor', 'Volunteer', 'Sponsor'].map((role) => (
                        <span key={role} className="px-4 py-2 rounded-full bg-slate-100 border border-black/5 text-slate-500 font-google-text text-sm">
                            {role}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Registration;
