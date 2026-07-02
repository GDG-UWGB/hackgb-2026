import { useState } from 'react';
import { motion } from 'framer-motion';
import { PartyPopper } from 'lucide-react';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
        }
    };

    return (
        <section className="relative pt-20 pb-32 px-4 overflow-hidden" id="register">
            <div className="max-w-3xl mx-auto text-center relative z-10 pt-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#E37100]/10 border border-[#E37100]/15 text-[#E37100] font-google font-bold text-sm uppercase tracking-widest mb-8">
                        <span className="w-2 h-2 bg-[#E37100] rounded-full animate-pulse" />
                        Coming Soon
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-google font-bold mb-4 text-[#0C3C34]"
                >
                    Join the Tour
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-lg text-slate-800 mb-12 max-w-xl mx-auto font-google-text"
                >
                    Be the first to know when hacker, mentor, volunteer, and sponsor applications go live. Drop your email and we'll notify you.
                </motion.p>

                {/* Email Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    {submitted ? (
                        <div className="glass-card p-8 text-center bg-white/90 border border-black/10 shadow-sm text-slate-705 flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-[#61A644]/10 text-[#61A644] flex items-center justify-center mb-4">
                                <PartyPopper className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-google font-bold text-slate-800 mb-2">You're on the list!</h3>
                            <p className="text-slate-600 font-google-text">We'll send you an email when applications open. Get ready for the Phoenix to rise.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="flex-1 px-5 py-4 rounded-full bg-white border border-black/10 text-slate-800 placeholder-slate-400 font-google-text focus:outline-none focus:border-[#61A644]/55 focus:bg-white transition-all shadow-sm w-full"
                            />
                            <button
                                type="submit"
                                className="btn-primary px-8 py-4 rounded-full font-google font-bold w-full sm:w-auto"
                            >
                                Join Waiting List
                            </button>
                        </form>
                    )}
                </motion.div>

                {/* Role pills */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-3 mt-10"
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
