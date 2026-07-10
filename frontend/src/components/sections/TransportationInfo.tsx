import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { transportationData } from '../../data/transportationData';
import { Settings, Folder, FileText } from 'lucide-react';

const TransportationInfo = () => {
    const [selectedId, setSelectedId] = useState(transportationData[0].id);

    const selectedData = transportationData.find(item => item.id === selectedId);
    const fileName = selectedData ? `${selectedData.id}.cfg` : 'transit.cfg';

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8 }}
            className="w-full mt-16 bg-white/45 backdrop-blur-xl rounded-2xl border border-white/25 shadow-xl overflow-hidden flex flex-col min-h-[380px] relative text-left"
        >
            {/* IDE Top Window Bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-black/5 bg-white/30 select-none">
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    <span className="text-[10px] font-google-mono text-slate-500 ml-3">Transit Config</span>
                </div>
                <div className="flex items-center gap-1.5 font-google-mono text-[9px] text-slate-450 bg-slate-200/50 px-2 py-0.5 rounded border border-black/5">
                    <Settings className="w-3.5 h-3.5 text-[#E37100]" />
                    <span>{fileName}</span>
                </div>
            </div>

            {/* IDE Grid: Sidebar Explorer + Content Pane */}
            <div className="flex flex-col md:flex-row flex-1">
                {/* Explorer Sidebar */}
                <div className="w-full md:w-56 bg-white/20 border-b md:border-b-0 md:border-r border-black/5 p-4 flex flex-col gap-4 font-google-mono shrink-0 select-none">
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                        <Folder className="w-3.5 h-3.5 text-[#ffcc00]" />
                        <span>Transit Explorer</span>
                    </div>
                    <div className="flex flex-col gap-0.5 pl-1.5">
                        {transportationData.map((item) => {
                            const isActive = item.id === selectedId;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setSelectedId(item.id)}
                                    className={`flex items-center gap-2.5 text-xs px-2.5 py-2.5 rounded transition-all w-full text-left cursor-pointer ${
                                        isActive
                                            ? 'bg-[#E37100]/15 text-[#E37100] font-bold border border-[#E37100]/25'
                                            : 'text-slate-550 hover:bg-white/30 hover:text-slate-800'
                                    }`}
                                >
                                    <FontAwesomeIcon
                                        icon={item.icon}
                                        className={`text-[13px] shrink-0 ${isActive ? 'text-[#E37100]' : 'text-slate-400'}`}
                                    />
                                    <span className="truncate">{item.title}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Editor Body */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Tab Bar */}
                    <div className="flex border-b border-black/5 bg-white/20 overflow-x-auto scrollbar-none">
                        <div className="flex items-center gap-2 px-5 py-3 border-r border-black/5 font-google-mono text-xs font-medium bg-white/60 text-[#0C3C34] border-t-2 border-t-[#E37100] whitespace-nowrap">
                            <FileText className="w-3.5 h-3.5 text-[#E37100]" />
                            {fileName}
                        </div>
                    </div>

                    {/* Content Frame */}
                    <div className="p-6 md:p-8 flex-1 bg-transparent">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedId}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="text-slate-700 font-google-text text-sm leading-relaxed font-semibold [&_a]:text-[#61A644] [&_a]:font-bold hover:[&_a]:underline [&_strong]:text-[#0C3C34] [&_strong]:font-bold [&_h4]:text-base [&_h4]:font-bold [&_h4]:mb-2 [&_h4]:text-[#0C3C34] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:pl-1 [&_p]:mb-4"
                            >
                                <div dangerouslySetInnerHTML={{ __html: selectedData?.content || '' }} />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Bottom Status bar */}
            <div className="flex justify-between items-center px-4 py-1.5 bg-[#E37100] text-white font-google-mono text-[10px] select-none">
                <div className="flex items-center gap-2 font-bold">
                    <span>TRANSIT: read-only</span>
                </div>
                <div className="flex items-center gap-3">
                    <span>Config</span>
                    <span>UTF-8</span>
                    <span>Ln 12, Col 1</span>
                </div>
            </div>
        </motion.div>
    );
};

export default TransportationInfo;
