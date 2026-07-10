import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gbTrailImg from '../assets/images/background/gb-trail.png';
import { Leaf, BookOpen, Settings, HeartPulse, ChevronLeft, ChevronRight, Folder, FileCode, Terminal, Play, CheckCircle2 } from 'lucide-react';

const tracks = [
    {
        title: 'Environment & Sustainability',
        description: 'Develop solutions aimed at resource conservation, clean energy, and climate action. Tackle real-world ecological issues with modern digital tools.',
        color: '#61A644',
        icon: Leaf,
        fileName: 'environment.py',
        lang: 'Python',
        runCmd: 'python environment.py',
        output: [
            '>>> Initializing EnvironmentTrack...',
            '>>> Checking resource variables...',
            '[SUCCESS] Connected to Green Bay ecological APIs.',
            '[RUNNING] Simulating energy conservation model...',
            '>>> Output: ["Conservation", "Clean Energy"] generated successfully.'
        ],
        snippet: (desc: string) => (
            <div className="font-google-mono text-xs md:text-sm text-slate-300 flex flex-col gap-1 select-text">
                <div><span className="text-[#ff79c6]">class</span> <span className="text-[#50fa7b]">EnvironmentTrack</span>(<span className="text-[#8be9fd]">HackathonTrack</span>):</div>
                <div className="pl-4"><span className="text-[#ff79c6]">def</span> <span className="text-[#50fa7b]">__init__</span>(<span className="text-[#ffb86c]">self</span>):</div>
                <div className="pl-8"><span className="text-[#ffb86c]">self</span>.title = <span className="text-[#f1fa8c]">"Eco & Sustainability"</span></div>
                <div className="pl-8"><span className="text-[#ffb86c]">self</span>.challenge = <span className="text-[#f1fa8c]">"{desc.slice(0, 50)}..."</span></div>
                <br />
                <div className="pl-4"><span className="text-[#ff79c6]">def</span> <span className="text-[#50fa7b]">build_solution</span>(<span className="text-[#ffb86c]">self</span>):</div>
                <div className="pl-8"><span className="text-[#ff79c6]">return</span> [<span className="text-[#f1fa8c]">"Conservation"</span>, <span className="text-[#f1fa8c]">"Clean Energy"</span>]</div>
            </div>
        )
    },
    {
        title: 'Education',
        description: 'Design platforms and tools to make learning more accessible, personalized, and engaging. Shape the future of digital literacy through EdTech.',
        color: '#E37100',
        icon: BookOpen,
        fileName: 'education.js',
        lang: 'JavaScript',
        runCmd: 'node education.js',
        output: [
            '$ node education.js',
            '>>> Loading educational modules...',
            '[BUILD] Personalization algorithm compiled.',
            '[EXEC] Launching user literacy tracking test...',
            '>>> Result: "EdTech Challenge" module ready on port 3000.'
        ],
        snippet: (desc: string) => (
            <div className="font-google-mono text-xs md:text-sm text-slate-300 flex flex-col gap-1 select-text">
                <div><span className="text-[#ff79c6]">import</span> {'{ Educational }'} <span className="text-[#ff79c6]">from</span> <span className="text-[#f1fa8c]">'hackgb'</span>;</div>
                <br />
                <div><span className="text-[#8be9fd]">const</span> <span className="text-[#50fa7b]">EducationTrack</span> = () =&gt; {'{'}</div>
                <div className="pl-4"><span className="text-[#ff79c6]">return</span> {'{'}</div>
                <div className="pl-8">title: <span className="text-[#f1fa8c]">"EdTech Challenge"</span>,</div>
                <div className="pl-8">desc: <span className="text-[#f1fa8c]">"{desc.slice(0, 50)}..."</span></div>
                <div className="pl-4">{'};'}</div>
                <div>{'};'}</div>
            </div>
        )
    },
    {
        title: 'Industrial',
        description: 'Engineer solutions to modernize supply chains, optimize manufacturing, and improve workplace safety through automation and data analysis.',
        color: '#0C3C34',
        icon: Settings,
        fileName: 'industrial.go',
        lang: 'Go',
        runCmd: 'go run industrial.go',
        output: [
            '$ go run industrial.go',
            '>>> Building industrial safety daemon...',
            '[WARN] Go compiler optimizing automation loops...',
            '[INFO] Connected to production line sensor telemetry.',
            '>>> Solution: Logistics & Automation compiled in 45ms.'
        ],
        snippet: (desc: string) => (
            <div className="font-google-mono text-xs md:text-sm text-slate-300 flex flex-col gap-1 select-text">
                <div><span className="text-[#ff79c6]">package</span> main</div>
                <div><span className="text-[#ff79c6]">import</span> <span className="text-[#f1fa8c]">"fmt"</span></div>
                <br />
                <div><span className="text-[#ff79c6]">func</span> <span className="text-[#50fa7b]">IndustrialTrack</span>() {'{'}</div>
                <div className="pl-4">fmt.<span className="text-[#50fa7b]">Println</span>(<span className="text-[#f1fa8c]">"Logistics & Automation"</span>)</div>
                <div className="pl-4"><span className="text-[#6272a4]">// {desc.slice(0, 46)}...</span></div>
                <div>{'}'}</div>
            </div>
        )
    },
    {
        title: 'Healthcare & Wellness',
        description: 'Build applications focused on improving patient care, mental wellness, and secure health data management for better public health outcomes.',
        color: '#ffcc00',
        icon: HeartPulse,
        fileName: 'healthcare.rs',
        lang: 'Rust',
        runCmd: 'cargo run --bin healthcare',
        output: [
            '$ cargo run --bin healthcare',
            '   Compiling healthcare v0.1.0...',
            '    Finished dev [unoptimized + debuginfo] target(s) in 0.84s',
            '     Running `target/debug/healthcare`...',
            '[OK] Patient data models validated (secure encryption enabled).'
        ],
        snippet: (desc: string) => (
            <div className="font-google-mono text-xs md:text-sm text-slate-300 flex flex-col gap-1 select-text">
                <div><span className="text-[#ff79c6]">pub struct</span> <span className="text-[#50fa7b]">HealthcareTrack</span> {'{'}</div>
                <div className="pl-4"><span className="text-[#ff79c6]">pub</span> title: <span className="text-[#8be9fd]">String</span>,</div>
                <div className="pl-4"><span className="text-[#ff79c6]">pub</span> active: <span className="text-[#8be9fd]">bool</span>,</div>
                <div>{'}'}</div>
                <br />
                <div><span className="text-[#6272a4]">// {desc.slice(0, 46)}...</span></div>
            </div>
        )
    },
];

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30, filter: 'blur(6px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.8, delay, ease: spring },
});

const Tracks = () => {
    const [activeIdx, setActiveIdx] = useState(0);
    const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);

    const activeTrack = tracks[activeIdx];
    const ActiveIcon = activeTrack.icon;

    // Reset console output when active tab changes
    useEffect(() => {
        setConsoleOutput([]);
        setIsRunning(false);
    }, [activeIdx]);

    const handlePrev = () => {
        setActiveIdx((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIdx((prev) => (prev === tracks.length - 1 ? 0 : prev + 1));
    };

    // Drag gesture to swap cards/tabs
    const handleDragEnd = (_event: any, info: any) => {
        const threshold = 50;
        if (info.offset.x > threshold) {
            handlePrev();
        } else if (info.offset.x < -threshold) {
            handleNext();
        }
    };

    // Simulated compilation terminal runner
    const handleRunScript = () => {
        if (isRunning) return;
        setIsRunning(true);
        setConsoleOutput([]);

        const lines = [
            `$ ${activeTrack.runCmd}`,
            ...activeTrack.output,
            '[SUCCESS] Build compiled without warnings. Perfect!'
        ];

        lines.forEach((line, index) => {
            setTimeout(() => {
                setConsoleOutput((prev) => [...prev, line]);
                if (index === lines.length - 1) {
                    setIsRunning(false);
                }
            }, index * 400);
        });
    };

    return (
        <section className="relative pt-20 pb-32 px-4 overflow-hidden" id="tracks">
            {/* Background landmark image with parallax drift */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img src={gbTrailImg} alt="" className="w-full h-full object-cover opacity-[0.45] parallax-bg" />
                <div className="absolute inset-0 bg-[#61A644]/[0.01]" />
            </div>

            {/* Ambient glow */}
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#E37100]/5 rounded-full blur-[150px] pointer-events-none animate-ambient-glow" />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Swappable Workspace */}
                <div className="flex justify-center items-center gap-4 w-full">
                    {/* Left arrow */}
                    <button
                        onClick={handlePrev}
                        className="hidden lg:flex w-12 h-12 rounded-full bg-white/80 border border-black/5 items-center justify-center text-slate-500 hover:text-[#0C3C34] hover:shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Integrated IDE Interface Card */}
                    <motion.div
                        {...fadeUp(0.1)}
                        className="flex-1 bg-white/45 backdrop-blur-xl rounded-2xl border border-white/25 shadow-xl overflow-hidden flex flex-col min-h-[500px] relative"
                    >
                        {/* IDE Top Window Bar */}
                        <div className="flex items-center justify-between px-4 py-2 border-b border-black/5 bg-white/30">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                                <span className="text-[10px] font-google-mono text-slate-500 ml-3">Choose Your Path</span>
                            </div>
                            
                            {/* Run Code Button */}
                            <button
                                onClick={handleRunScript}
                                disabled={isRunning}
                                className="flex items-center gap-1.5 px-3 py-1 bg-[#61A644] text-white hover:bg-[#61A644]/90 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-md text-[10px] font-google font-bold transition-all active:scale-95 cursor-pointer shadow-sm"
                            >
                                <Play className="w-3 h-3 fill-current shrink-0" />
                                <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                            </button>
                        </div>

                        {/* IDE Main Area Grid */}
                        <div className="flex flex-1 flex-col md:flex-row">
                            
                            {/* File Explorer Sidebar */}
                            <div className="w-full md:w-48 bg-white/20 border-b md:border-b-0 md:border-r border-black/5 p-4 flex flex-col gap-4 font-google-mono shrink-0 select-none">
                                <div className="flex items-center gap-2 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                                    <Folder className="w-3.5 h-3.5 text-[#ffcc00]" />
                                    <span>Explorer</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-550 font-bold px-1.5 py-1 rounded">
                                        <span>📂</span>
                                        <span>tracks</span>
                                    </div>
                                    <div className="flex flex-col gap-0.5 pl-4">
                                        {tracks.map((track, idx) => {
                                            const isActive = idx === activeIdx;
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => setActiveIdx(idx)}
                                                    className={`flex items-center gap-2 text-xs px-2 py-1 rounded transition-all w-full text-left cursor-pointer ${
                                                        isActive
                                                            ? 'bg-[#61A644]/15 text-[#0C3C34] font-bold border border-[#61A644]/20'
                                                            : 'text-slate-550 hover:bg-white/30 hover:text-slate-800'
                                                    }`}
                                                >
                                                    <FileCode className="w-3.5 h-3.5 shrink-0" style={{ color: track.color }} />
                                                    <span className="truncate">{track.fileName}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Editor Window Body */}
                            <div className="flex-1 flex flex-col min-w-0">
                                {/* Editor Tab Bar */}
                                <div className="flex border-b border-black/5 bg-white/20 overflow-x-auto scrollbar-none">
                                    {tracks.map((track, idx) => {
                                        const isActive = idx === activeIdx;
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => setActiveIdx(idx)}
                                                className={`flex items-center gap-2 px-4 py-2 border-r border-black/5 font-google-mono text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                                                    isActive
                                                        ? 'bg-white/60 text-[#0C3C34] border-t-2 border-t-[#61A644]'
                                                        : 'text-slate-500 hover:bg-white/30 hover:text-slate-800'
                                                }`}
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: track.color }} />
                                                {track.fileName}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Content area */}
                                <motion.div
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    onDragEnd={handleDragEnd}
                                    className="p-6 flex flex-col gap-5 flex-1 justify-between relative cursor-grab active:cursor-grabbing select-none"
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeIdx}
                                            initial={{ opacity: 0, x: 15 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -15 }}
                                            transition={{ duration: 0.25 }}
                                            className="flex flex-col gap-4 flex-1 justify-between pointer-events-none"
                                        >
                                            {/* Track details header */}
                                            <div className="flex items-start gap-4">
                                                <div
                                                    className="p-3 rounded-xl flex items-center justify-center border shrink-0 bg-white/80"
                                                    style={{
                                                        color: activeTrack.color,
                                                        borderColor: `${activeTrack.color}40`,
                                                    }}
                                                >
                                                    <ActiveIcon className="w-6 h-6 animate-gentle-float" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <span
                                                        className="font-google-mono font-bold text-[9px] tracking-wider px-2 py-0.5 rounded inline-block mb-1 bg-white/60 border border-black/5"
                                                        style={{ color: activeTrack.color }}
                                                    >
                                                        TRACK 0{activeIdx + 1}
                                                    </span>
                                                    <h3 className="text-xl font-google font-bold text-[#0C3C34] leading-tight truncate">
                                                        {activeTrack.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Text description */}
                                            <p className="text-slate-700 font-google-text leading-relaxed text-sm font-medium">
                                                {activeTrack.description}
                                            </p>

                                            {/* Code preview block */}
                                            <div className="bg-[#1e1e2f] border border-white/5 rounded-xl p-4 shadow-inner mt-1">
                                                {activeTrack.snippet(activeTrack.description)}
                                            </div>

                                            {/* Terminal Console Execution Panel */}
                                            {consoleOutput.length > 0 && (
                                                <div className="bg-[#0f0f16] border border-black/10 rounded-xl p-4 font-google-mono text-[10px] text-green-400 mt-2 shadow-inner flex flex-col gap-1 select-text overflow-y-auto max-h-36">
                                                    <div className="flex items-center gap-2 text-slate-500 border-b border-white/5 pb-1 mb-1">
                                                        <Terminal className="w-3.5 h-3.5" />
                                                        <span>Terminal Console output</span>
                                                    </div>
                                                    {consoleOutput.map((line, lIdx) => (
                                                        <div
                                                            key={lIdx}
                                                            className={
                                                                line.startsWith('$')
                                                                    ? 'text-slate-200'
                                                                    : line.startsWith('[SUCCESS]')
                                                                    ? 'text-[#61A644] font-bold flex items-center gap-1'
                                                                    : line.startsWith('[OK]')
                                                                    ? 'text-[#61A644]'
                                                                    : line.startsWith('[WARN]')
                                                                    ? 'text-[#ffcc00]'
                                                                    : 'text-green-400/90'
                                                            }
                                                        >
                                                            {line.startsWith('[SUCCESS]') && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                                                            {line}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Indicator note */}
                                    <div className="flex justify-between items-center text-slate-400 font-google-mono text-[9px] mt-2 border-t border-black/5 pt-3">
                                        <span>← Swipe left / right or click Run Code to execute script →</span>
                                        <div className="flex gap-1">
                                            {tracks.map((_, idx) => (
                                                <span
                                                    key={idx}
                                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                                        idx === activeIdx ? 'w-3 bg-[#61A644]' : 'bg-slate-200'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* IDE Bottom Status Bar */}
                        <div className="flex justify-between items-center px-4 py-1.5 bg-[#61A644] text-white font-google-mono text-[10px] select-none">
                            <div className="flex items-center gap-3">
                                <span className="font-bold">GIT: main*</span>
                                <span className="opacity-80">Ready</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="opacity-80">{activeTrack.lang}</span>
                                <span className="opacity-80">UTF-8</span>
                                <span className="hidden sm:inline opacity-80">Ln {activeIdx + 1}, Col 26</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right arrow */}
                    <button
                        onClick={handleNext}
                        className="hidden lg:flex w-12 h-12 rounded-full bg-white/80 border border-black/5 items-center justify-center text-slate-500 hover:text-[#0C3C34] hover:shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Tracks;
