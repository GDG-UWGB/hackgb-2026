import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { transportationData } from '../../data/transportationData';

const TransportationInfo = () => {
    const [selectedId, setSelectedId] = useState(transportationData[0].id);

    const selectedData = transportationData.find(item => item.id === selectedId);

    return (
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 w-full mt-24 font-google-text">
            {/* Left side: Navigation */}
            <div className="flex flex-col w-full md:w-1/3 shrink-0 glass-card p-5 md:p-6 bg-white/95 border border-black/5 shadow-sm rounded-[2rem]">
                <h3 className="text-slate-400 text-sm font-bold tracking-wider mb-4 uppercase font-google">
                    Transportation Tips
                </h3>
                <nav className="flex flex-col gap-1.5">
                    {transportationData.map((item) => {
                        const isActive = item.id === selectedId;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setSelectedId(item.id)}
                                className={`group flex items-center gap-4 text-left transition-colors duration-200 py-1.5 ${isActive ? 'text-[#E37100] font-bold' : 'text-slate-700 hover:text-slate-900'
                                    }`}
                            >
                                <div
                                    className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 ${isActive ? 'glass-card border-[#E37100]/20 bg-white' : 'bg-transparent group-hover:bg-black/[0.04]'
                                        }`}
                                    style={{ color: isActive ? '#E37100' : '#61A644' }}
                                >
                                    <FontAwesomeIcon
                                        icon={item.icon}
                                        className="text-lg"
                                    />
                                </div>
                                <span className="text-base">{item.title}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Right side: Content */}
            <div className="flex-1">
                <div className="glass-card h-full p-6 md:p-8 min-h-[300px] bg-white/95 border border-black/5 shadow-sm rounded-[2rem]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: 'easeIn' }}
                            className="text-slate-650 [&_a]:text-[#61A644] [&_a]:font-bold hover:[&_a]:underline [&_strong]:text-slate-800 [&_strong]:font-bold"
                        >
                            <div dangerouslySetInnerHTML={{ __html: selectedData?.content || '' }} />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default TransportationInfo;
