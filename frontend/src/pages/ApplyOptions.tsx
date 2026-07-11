import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import stemImg from '../assets/images/background/uwgb-stem.png';
import { Terminal, ArrowRight, Compass, Landmark } from 'lucide-react';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;
const HACKER_APPLICATION_DEADLINE = new Date('2026-10-08T04:59:59Z'); // Oct 7, 2026 11:59 PM CST

const ApplyOptions = () => {
  const navigate = useNavigate();
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
