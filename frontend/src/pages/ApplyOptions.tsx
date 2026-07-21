import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import stemImg from '../assets/images/background/uwgb-stem.png';
import { Terminal, ArrowRight, Compass, Landmark, Users } from 'lucide-react';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;
const HACKER_APPLICATION_DEADLINE = new Date('2026-10-08T04:59:59Z'); // Oct 7, 2026 11:59 PM CST

interface ApplyPipelinesProps {
  hoveredOption: string | null;
}

const DEFAULT_SCRIPT = [
  '$ hackgb system --status',
  'Checking core nodes... [OK]',
  'Initializing registration options...',
  'Hacker pipeline: READY (Awaiting input)',
  'Judge pipeline: READY (Awaiting input)',
  'Mentor pipeline: READY (Awaiting input)',
  'Handshake complete on tty0.',
  'Ready to initialize apply options...'
];

const HACKER_SCRIPT = [
  '$ npx hackgb deploy --target=hacker',
  '⠋ Compiling hacker_workspace.tsx...',
  '✓ Transformed 48 modules.',
  '✓ Bundling assets...',
  'Running test suite: hacker.test.ts',
  '  ✓ checkAgeLimit (18+) (12ms)',
  '  ✓ validateResumeUpload (45ms)',
  '  ✓ verifyMLHConsent (2ms)',
  'Tests: 3 passed, 3 total',
  'Build successful! Ready for registration.'
];

const JUDGE_SCRIPT = [
  '$ python3 verify_evaluators.py',
  'Connecting to secure database...',
  'Session established under TLS 1.3.',
  'Loading evaluation criteria matrix:',
  '  [+] Technical Complexity',
  '  [+] Innovation & Creativity',
  '  [+] Presentation & Design',
  'Verifying judge criteria checklist...',
  'Check complete. 0 warnings.',
  'Secure pipeline initialized [ACTIVE].'
];

const MENTOR_SCRIPT = [
  '$ go run mentor_router.go',
  'Starting mentor gateway daemon...',
  'Binding mentoring channels to socket:8080',
  'Mounting comfort areas:',
  '  - AI/ML, WebDev, Cyber, Cloud, UI/UX',
  'Initializing resume parser microservice...',
  'Gateway operational.',
  'Awaiting mentor registrations...'
];

const ApplyPipelines = ({ hoveredOption }: ApplyPipelinesProps) => {
  const [history, setHistory] = useState<string[]>([]);
  const [cursorBlink, setCursorBlink] = useState(true);
  const linesContainerRef = useRef<HTMLDivElement>(null);
  const lastScriptRef = useRef<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const hackerActive = hoveredOption === 'Hacker' || hoveredOption === 'Closed';
  const judgeActive = hoveredOption === 'Judge';
  const mentorActive = hoveredOption === 'Mentor';

  const playScript = (script: string[]) => {
    if (!script || !Array.isArray(script)) return;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Clear and set the first line immediately to prevent black/blank flashes
    setHistory([script[0]]);
    
    let currentIndex = 1;
    intervalRef.current = setInterval(() => {
      if (currentIndex < script.length) {
        const nextLine = script[currentIndex];
        if (nextLine !== undefined && nextLine !== null) {
          setHistory(prev => [...prev, nextLine]);
        }
        currentIndex++;
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    }, 150);
  };

  useEffect(() => {
    // Play default system check once on initial load
    if (lastScriptRef.current === null) {
      lastScriptRef.current = 'Default';
      playScript(DEFAULT_SCRIPT);
    }
  }, []);

  useEffect(() => {
    if (hackerActive && lastScriptRef.current !== 'Hacker') {
      lastScriptRef.current = 'Hacker';
      playScript(HACKER_SCRIPT);
    } else if (judgeActive && lastScriptRef.current !== 'Judge') {
      lastScriptRef.current = 'Judge';
      playScript(JUDGE_SCRIPT);
    } else if (mentorActive && lastScriptRef.current !== 'Mentor') {
      lastScriptRef.current = 'Mentor';
      playScript(MENTOR_SCRIPT);
    } else if (!hoveredOption && lastScriptRef.current !== 'Standby' && lastScriptRef.current !== 'Default' && lastScriptRef.current !== null) {
      lastScriptRef.current = 'Standby';
      playScript(['', '$ hackgb standby', '[SYS] connection standby...']);
    }
  }, [hoveredOption, hackerActive, judgeActive, mentorActive]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorBlink(b => !b);
    }, 500);
    return () => {
      clearInterval(cursorInterval);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (linesContainerRef.current) {
      linesContainerRef.current.scrollTop = linesContainerRef.current.scrollHeight;
    }
  }, [history]);

  const terminalBorderClass = hackerActive ? 'border-green-500/20 shadow-green-950/5' :
                              judgeActive ? 'border-orange-500/20 shadow-orange-950/5' :
                              mentorActive ? 'border-indigo-500/20 shadow-indigo-950/5' :
                              'border-black/10';

  const terminalBgClass = hackerActive ? 'bg-[#040e0a]' :
                          judgeActive ? 'bg-[#0f0904]' :
                          mentorActive ? 'bg-[#090412]' :
                          'bg-[#061814]';

  return (
    <div className={`relative w-full h-48 mt-6 rounded-xl border ${terminalBorderClass} ${terminalBgClass} text-emerald-400 p-4 font-google-mono text-[9px] leading-relaxed shadow-inner overflow-hidden select-none text-left flex flex-col justify-between transition-all duration-500`}>
      <div 
        ref={linesContainerRef}
        className="flex-1 overflow-y-auto min-h-0 flex flex-col gap-0.5 pr-1 scrollbar-thin scrollbar-thumb-emerald-950 scrollbar-track-transparent"
      >
        {history.map((line, idx) => {
          if (!line || typeof line !== 'string') return <div key={idx} className="h-2" />;

          const isCommand = line.startsWith('$');
          const isSuccess = line.includes('✓') || line.includes('[OK]') || line.includes('passed') || line.includes('successful');
          const isSubItem = line.startsWith('  ');

          let textColor = 'text-emerald-100'; // High contrast bright emerald on dark backgrounds
          if (isCommand) {
            textColor = line.includes('hacker') ? 'text-green-300 font-bold' :
                        line.includes('verify_evaluators') ? 'text-orange-300 font-bold' :
                        line.includes('mentor_router') ? 'text-indigo-300 font-bold' :
                        'text-emerald-300 font-bold';
          } else if (isSuccess) {
            textColor = 'text-green-400 font-medium';
          } else if (isSubItem) {
            textColor = 'text-slate-400'; // Readable slate on dark background
          }

          return (
            <div key={idx} className={`${textColor} truncate`}>
              {line}
            </div>
          );
        })}
        
        <div className="flex items-center gap-1">
          <span className={
            hackerActive ? 'text-green-400 font-bold' :
            judgeActive ? 'text-orange-400 font-bold' :
            mentorActive ? 'text-indigo-400 font-bold' :
            'text-emerald-400 font-bold'
          }>$</span>
          <span className={`w-1.5 h-3 ${
            hackerActive ? 'bg-green-400' :
            judgeActive ? 'bg-orange-400' :
            mentorActive ? 'bg-indigo-400' :
            'bg-emerald-400'
          }`} style={{ opacity: cursorBlink ? 1 : 0 }} />
        </div>
      </div>

      <div className="flex justify-between text-[7px] text-emerald-700 border-t border-[#61A644]/10 pt-2 mt-2 select-none">
        <span>CONSOLE OUTPUT</span>
        <span className="animate-pulse">TTY0 • LISTENER ACTIVE</span>
      </div>
    </div>
  );
};

const ApplyOptions = () => {
  const navigate = useNavigate();
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const isHackerDeadlinePassed = new Date() > HACKER_APPLICATION_DEADLINE;

  const options = [
    {
      title: 'Hacker Application',
      description: isHackerDeadlinePassed
        ? 'Applications closed on October 7, 2026.'
        : 'Submit your application to participate in the hackathon as a builder or creator.',
      icon: Compass,
      path: '/apply/hacker',
      themeColor: isHackerDeadlinePassed ? '#ff5f56' : '#61A644', // Red if closed
      badge: isHackerDeadlinePassed ? 'Closed' : 'Hacker',
      disabled: isHackerDeadlinePassed,
    },
    {
      title: 'Judge Application',
      description: 'Submit your application to participate in the hackathon as a professional evaluator.',
      icon: Landmark,
      path: '/apply/judge',
      themeColor: '#E37100', // Phoenix Orange/Amber
      badge: 'Judge',
      disabled: false,
    },
    {
      title: 'Mentor Application',
      description: 'Submit your application to participate in the hackathon as a guide or technical mentor.',
      icon: Users,
      path: '/apply/mentor',
      themeColor: '#5746e3', // Mentor Indigo/Purple
      badge: 'Mentor',
      disabled: false,
    },
  ];

  return (
    <main className="relative min-h-screen pt-28 pb-20 px-4 overflow-hidden bg-transparent flex flex-col items-center justify-center">
      {/* Background Landmark Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img src={stemImg} alt="" className="w-full h-full object-cover opacity-[0.25] parallax-bg" />
        <div className="absolute inset-0 bg-[#61A644]/[0.01]" />
      </div>

      <div className="w-full max-w-4xl z-10 flex flex-col items-center">
        {/* Integrated IDE Selector Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: spring }}
          className="w-full bg-white/45 backdrop-blur-xl rounded-2xl border border-white/25 shadow-2xl overflow-hidden flex flex-col text-left min-h-[420px]"
        >
          {/* IDE Top Window Bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-black/5 bg-white/30 select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              <span className="text-[10px] font-google-mono text-slate-500 ml-3">Registration Setup</span>
            </div>
            <div className="flex items-center gap-1.5 font-google-mono text-[9px] text-[#61A644] font-bold bg-[#61A644]/10 px-2 py-0.5 rounded border border-[#61A644]/25">
              <Terminal className="w-3.5 h-3.5" />
              <span>apply_options.sh</span>
            </div>
          </div>

          {/* IDE Workspace split body */}
          <div className="flex flex-col md:flex-row flex-1">
            {/* Left Column: Heading and metadata info */}
            <div className="flex-1 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-black/5">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#61A644]/10 text-[#61A644] font-google-mono font-bold text-[10px] uppercase tracking-wider mb-4 border border-[#61A644]/20">
                  <span className="w-1.5 h-1.5 bg-[#61A644] rounded-full animate-pulse" />
                  Apply Now
                </span>
                <h1 className="text-3xl sm:text-4xl font-google font-bold text-[#0C3C34] leading-tight mb-4">
                  HackGB 2026 Registration
                </h1>
                <p className="text-slate-705 font-google-text text-sm font-semibold leading-relaxed">
                  Join us at the STEM Innovation Center for Green Bay's premier collegiate hackathon. Please select whether you are participating as an active builder (hacker) or evaluative expert (judge).
                </p>
                <ApplyPipelines hoveredOption={hoveredOption} />
              </div>

              <div className="text-[10px] font-google-mono text-slate-400 mt-8 pt-4 border-t border-black/5">
                Pipelines established · select target parameters
              </div>
            </div>

            {/* Right Column: Path Cards */}
            <div className="w-full md:w-96 p-6 md:p-8 flex flex-col justify-center gap-4 bg-white/10 select-none">
              {options.map((opt) => {
                const OptIcon = opt.icon;
                return (
                  <motion.div
                    key={opt.title}
                    whileHover={opt.disabled ? {} : { y: -2, scale: 1.01 }}
                    className={`group p-5 rounded-xl border shadow-sm transition-all duration-300 flex flex-col justify-between min-h-[140px] ${
                      opt.disabled
                        ? 'opacity-60 cursor-not-allowed bg-slate-100/50 border-black/5'
                        : 'cursor-pointer bg-white/70 hover:bg-white border-black/5 hover:border-[#61A644]/20'
                    }`}
                    onClick={() => {
                      if (!opt.disabled) {
                        navigate(opt.path);
                      }
                    }}
                    onMouseEnter={() => {
                      if (!opt.disabled) {
                        setHoveredOption(opt.badge);
                      }
                    }}
                    onMouseLeave={() => setHoveredOption(null)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-google-mono font-bold uppercase tracking-wider"
                        style={{
                          backgroundColor: `${opt.themeColor}15`,
                          color: opt.themeColor,
                        }}
                      >
                        {opt.badge}
                      </span>
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
                        style={{
                          backgroundColor: `${opt.themeColor}10`,
                          color: opt.themeColor,
                        }}
                      >
                        <OptIcon className="w-4 h-4" />
                      </div>
                    </div>

                    <div>
                      <h2 className="text-base font-google font-bold text-[#0C3C34] mb-1 group-hover:text-black transition-colors">
                        {opt.title}
                      </h2>
                      <p className="text-slate-550 font-google-text text-xs leading-relaxed font-semibold">
                        {opt.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 mt-3 font-google font-bold text-xs" style={{ color: opt.themeColor }}>
                      <span>{opt.disabled ? 'Applications Closed' : 'Initialize Apply'}</span>
                      {!opt.disabled && <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* IDE Bottom Status Bar */}
          <div className="flex justify-between items-center px-4 py-1.5 bg-[#0C3C34] text-white font-google-mono text-[10px] select-none">
            <div className="flex items-center gap-3">
              <span className="font-bold">HACKGB: setup</span>
              <span className="opacity-80">Ready</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Bash</span>
              <span>UTF-8</span>
              <span>tty0</span>
            </div>
          </div>
        </motion.div>

        {/* Back link */}
        <button
          onClick={() => navigate('/')}
          className="mt-8 text-slate-500 hover:text-[#0C3C34] font-google font-bold text-sm cursor-pointer transition-all hover:underline"
        >
          ← Back to Homepage
        </button>
      </div>
    </main>
  );
};

export default ApplyOptions;
