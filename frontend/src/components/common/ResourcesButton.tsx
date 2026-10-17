import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X, Sparkles, FileText, ExternalLink, Code2 } from 'lucide-react';

const ResourcesButton = () => {
    const [open, setOpen] = useState(false);
    const [hasBeenClicked, setHasBeenClicked] = useState(
        () => localStorage.getItem('resources-btn-clicked') === 'true'
    );
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
                        className="bg-white border border-slate-200/90 rounded-2xl shadow-2xl p-5 relative overflow-hidden"
                        style={{ width: '320px' }}
                    >
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0C3C34] via-[#61A644] to-[#E37100]" />
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer text-slate-500"
                            aria-label="Close"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-3 mb-3.5">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0C3C34] to-[#1c6457] flex items-center justify-center shadow-md shrink-0">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-google font-bold text-[#0C3C34] text-base leading-snug">Hacker Resources</h3>
                                <p className="text-[11px] text-slate-500 font-medium">Quick links for HackGB 2026</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2.5 mb-3">
                            {/* Developer Resources Link */}
                            <a
                                href="https://docs.google.com/document/d/1P-E8jrExAnHrgGX4moJo-zLXDoccWaqRyp7hnwO1-VQ/edit?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl bg-slate-50 hover:bg-[#61A644]/10 border border-slate-200/80 hover:border-[#61A644]/40 transition-all duration-150 group cursor-pointer"
                            >
                                <div className="w-8 h-8 rounded-lg bg-[#61A644]/15 text-[#0C3C34] group-hover:bg-[#61A644] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                                    <Code2 className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[#0C3C34] font-google font-semibold text-xs leading-snug flex items-center gap-1">
                                        <span>Developer Resources</span>
                                    </p>
                                    <p className="text-slate-400 font-google-text text-[11px] truncate">APIs, Starter Kits & Docs</p>
                                </div>
                                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0C3C34] transition-colors shrink-0" />
                            </a>

                            {/* Participant Guide Link */}
                            <a
                                href="https://hackgb.com/participant-guide.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl bg-slate-50 hover:bg-[#E37100]/10 border border-slate-200/80 hover:border-[#E37100]/40 transition-all duration-150 group cursor-pointer"
                            >
                                <div className="w-8 h-8 rounded-lg bg-[#E37100]/15 text-[#E37100] group-hover:bg-[#E37100] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                                    <FileText className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[#0C3C34] font-google font-semibold text-xs leading-snug flex items-center gap-1">
                                        <span>Participant Guide</span>
                                    </p>
                                    <p className="text-slate-400 font-google-text text-[11px] truncate">Schedule, Rules & FAQs (PDF)</p>
                                </div>
                                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#E37100] transition-colors shrink-0" />
                            </a>
                        </div>

                        <div className="pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-google-mono text-emerald-700 font-semibold">
                            <Sparkles className="w-3.5 h-3.5 text-[#61A644] shrink-0" />
                            <span>HackGB 2026 is LIVE!</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative">
                {!open && !hasBeenClicked && (
                    <span className="absolute inset-0 rounded-2xl animate-ping bg-[#61A644]/30 pointer-events-none" />
                )}
                <motion.button
                    onClick={() => {
                        if (!hasBeenClicked) {
                            localStorage.setItem('resources-btn-clicked', 'true');
                            setHasBeenClicked(true);
                        }
                        setOpen((v) => !v);
                    }}
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
