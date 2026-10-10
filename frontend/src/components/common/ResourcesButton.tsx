import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X, Sparkles, Clock } from 'lucide-react';

const ResourcesButton = () => {
    const [open, setOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const handler = (e: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, []);

    return (
        <div ref={popoverRef} className="fixed bottom-7 left-7 z-[90] flex flex-col items-start gap-4">

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 14, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 14, scale: 0.94 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-white border border-slate-200/90 rounded-2xl shadow-2xl p-6 relative overflow-hidden"
                        style={{ width: '300px' }}
                    >
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0C3C34] via-[#61A644] to-[#E37100]" />
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer text-slate-500"
                            aria-label="Close"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0C3C34] to-[#1c6457] flex items-center justify-center mb-4 shadow-md">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-google font-bold text-[#0C3C34] text-lg mb-1.5 leading-snug">Hacker Resources</h3>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-google-mono font-bold uppercase tracking-wider bg-[#E37100]/10 text-[#E37100] border border-[#E37100]/25 mb-4">
                            <Clock className="w-3.5 h-3.5" />
                            Coming Soon
                        </span>
                        <p className="text-slate-500 font-google-text text-sm leading-relaxed">Workshop slides, API docs, starter kits, and other hacker resources will be available here on event day.</p>
                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] font-google-mono text-slate-400">
                            <Sparkles className="w-3.5 h-3.5 text-[#61A644] shrink-0" />
                            Check back on Oct 17 at 8:00 AM
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative">
                {!open && (
                    <span className="absolute inset-0 rounded-2xl animate-ping bg-[#61A644]/30 pointer-events-none" />
                )}
                <motion.button
                    onClick={() => setOpen((v) => !v)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 18 }}
                    className={`relative flex items-center gap-3 px-6 py-3.5 rounded-2xl shadow-xl font-google font-bold text-base cursor-pointer select-none transition-all duration-200 ${open ? 'bg-[#0C3C34] text-white' : 'bg-gradient-to-br from-[#0C3C34] to-[#1c6457] text-white hover:shadow-2xl'}`}
                    aria-label="Resources"
                >
                    <BookOpen className="w-5 h-5 shrink-0" />
                    <span>Resources</span>
                </motion.button>
            </div>
        </div>
    );
};

export default ResourcesButton;
