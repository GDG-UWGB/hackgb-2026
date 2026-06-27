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
            <div className="flex flex-col w-full md:w-1/3 shrink-0">
                <h3 className="text-slate-400 text-sm font-bold tracking-wider mb-6 uppercase">
                    Transportation Tips
                </h3>
                <nav className="flex flex-col gap-2">
                    {transportationData.map((item) => {
                        const isActive = item.id === selectedId;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setSelectedId(item.id)}
                                className={`group flex items-center gap-6 text-left transition-colors duration-200 py-2 ${isActive ? 'text-[#E37100] font-bold' : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                <div
                                    className={`flex items-center justify-center w-14 h-14 rounded-full transition-colors duration-300 ${isActive ? 'bg-white shadow-md border border-black/5' : 'bg-transparent group-hover:bg-slate-100'
                                        }`}
                                  style={{ color: isActive ? '#E37100' : '#61A644' }}
                                >
                                    <FontAwesomeIcon
                                        icon={item.icon}
                                        className="text-xl"
                                    />
                                </div>
                                <span className="text-lg">{item.title}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Right side: Content */}
            <div className="flex-1">
                <div className="bg-white/70 border border-black/5 rounded-[2rem] p-8 md:p-10 shadow-md min-h-[350px] backdrop-blur-md">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: 'easeIn' }}
                            className="text-slate-600 [&_a]:text-[#61A644] [&_a]:font-bold hover:[&_a]:underline [&_strong]:text-slate-800 [&_strong]:font-bold"
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
