import { useState } from 'react';
import { motion } from 'framer-motion';

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
        <section className="py-24 px-4 relative overflow-hidden bg-transparent" id="register">
            {/* Subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#61A644]/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-3xl mx-auto text-center relative z-10 pt-8">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#E37100]/20 border border-[#E37100]/30 text-[#E37100] font-google font-bold text-sm uppercase tracking-widest mb-8">
                        <span className="w-2 h-2 bg-[#E37100] rounded-full animate-pulse" />
                        Coming Soon
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-google font-bold mb-4 text-slate-900"
                >
                    Applications Opening Soon
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-lg text-slate-500 mb-12 max-w-xl mx-auto font-google-text"
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
                        <div className="bg-white/70 border border-black/5 rounded-2xl p-8 backdrop-blur-md shadow-md text-slate-800">
                            <div className="text-[#61A644] text-5xl mb-4">🎉</div>
                            <h3 className="text-2xl font-google font-bold text-slate-900 mb-2">You're on the list!</h3>
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
                                className="flex-1 px-6 py-4 rounded-full bg-white/70 border border-black/5 text-slate-850 placeholder-slate-400 font-google-text focus:outline-none focus:border-[#61A644]/50 focus:bg-white transition-all backdrop-blur-md shadow-sm"
                            />
                            <button
                                type="submit"
                                className="px-8 py-4 bg-[#61A644] hover:bg-[#61A644]/90 text-white rounded-full font-google font-bold transition-all shadow-[0_10px_30px_-10px_rgba(97,166,68,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(97,166,68,0.2)] transform hover:-translate-y-0.5"
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
