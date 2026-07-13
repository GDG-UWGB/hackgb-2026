import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import stemImg from '../assets/images/background/uwgb-stem.png';
import { Terminal, ArrowRight, Sparkles, CheckCircle2, Mail, ArrowLeft } from 'lucide-react';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

// Target date for applications opening: August 15, 2026
const LAUNCH_DATE = new Date('2026-08-15T00:00:00Z');

const OpeningSoon = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [terminalStep, setTerminalStep] = useState(0);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate countdown time
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +LAUNCH_DATE - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  // Animate terminal commands sequence
  useEffect(() => {
    const intervals = [800, 1500, 2200, 2900];
    const timers = intervals.map((time, idx) =>
      setTimeout(() => {
        setTerminalStep(idx + 1);
      }, time)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Simulate premium API call duration
    await new Promise((resolve) => setTimeout(resolve, 1200));

    try {
      // Save subscription to local storage for administrator retrieval
      const existingWaitlist = JSON.parse(localStorage.getItem('hackgb_waitlist') || '[]');
      if (!existingWaitlist.includes(email)) {
        existingWaitlist.push(email);
        localStorage.setItem('hackgb_waitlist', JSON.stringify(existingWaitlist));
      }

      setIsSubmitted(true);
      setEmail('');
    } catch (err) {
      console.error('Waitlist submission error:', err);
      setErrorMsg('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen pt-28 pb-20 px-4 overflow-hidden bg-transparent flex flex-col items-center justify-center">
      {/* Background Landmark Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img src={stemImg} alt="" className="w-full h-full object-cover opacity-[0.25] parallax-bg" />
        <div className="absolute inset-0 bg-[#61A644]/[0.01]" />
      </div>

      {/* Ambient decorative glowing spots */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#61A644]/5 rounded-full blur-[100px] pointer-events-none animate-ambient-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#E37100]/5 rounded-full blur-[120px] pointer-events-none animate-ambient-glow" style={{ animationDelay: '2.5s' }} />

      <div className="w-full max-w-4xl z-10 flex flex-col items-center">
        {/* Integrated IDE Selector Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: spring }}
          className="w-full bg-white/45 backdrop-blur-xl rounded-2xl border border-white/25 shadow-2xl overflow-hidden flex flex-col text-left min-h-[480px]"
        >
          {/* IDE Top Window Bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-black/5 bg-white/30 select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              <span className="text-[10px] font-google-mono text-slate-500 ml-3">System Core</span>
            </div>
            <div className="flex items-center gap-1.5 font-google-mono text-[9px] text-[#E37100] font-bold bg-[#E37100]/10 px-2 py-0.5 rounded border border-[#E37100]/25">
              <Terminal className="w-3.5 h-3.5" />
              <span>portal_deploy.sh</span>
            </div>
          </div>

          {/* IDE Workspace split body */}
          <div className="flex flex-col md:flex-row flex-1">
            {/* Left Column: Heading and status info */}
            <div className="flex-1 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-black/5">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#E37100]/10 text-[#E37100] font-google-mono font-bold text-[10px] uppercase tracking-wider mb-4 border border-[#E37100]/20">
                  <span className="w-1.5 h-1.5 bg-[#E37100] rounded-full animate-pulse" />
                  Opening Soon
                </span>
                <h1 className="text-3xl sm:text-4xl font-google font-bold text-[#0C3C34] leading-tight mb-4 flex items-center gap-2">
                  Applications Opening Soon
                  <Sparkles className="w-6 h-6 text-[#E37100] animate-gentle-float" />
                </h1>
                <p className="text-slate-700 font-google-text text-sm font-semibold leading-relaxed mb-6">
                  We are finalising the registration pipelines for HackGB 2026. Official signups for hackers, mentors, and judges will launch shortly. Join our priority notification list to secure your spot the moment we open.
                </p>

                {/* Countdown Timer Block */}
                <div className="grid grid-cols-4 gap-2.5 max-w-sm mt-2">
                  {[
                    { label: 'Days', val: timeLeft.days },
                    { label: 'Hours', val: timeLeft.hours },
                    { label: 'Mins', val: timeLeft.minutes },
                    { label: 'Secs', val: timeLeft.seconds },
                  ].map((unit) => (
                    <div key={unit.label} className="bg-white/60 border border-black/5 rounded-xl p-2.5 text-center flex flex-col justify-center items-center shadow-sm">
                      <span className="font-google-mono font-bold text-lg md:text-xl text-[#0C3C34]">
                        {String(unit.val).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] font-google-text text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[10px] font-google-mono text-slate-400 mt-8 pt-4 border-t border-black/5">
                Ready to initialize · build sequence pending
              </div>
            </div>

            {/* Right Column: Terminal and Subscription */}
            <div className="w-full md:w-96 p-6 md:p-8 flex flex-col justify-between bg-black/5 border-t md:border-t-0 md:bg-white/10 select-none min-h-[300px]">
              {/* Animated Shell Simulator */}
              <div className="bg-[#0f0f16] border border-white/5 rounded-xl p-4 font-google-mono text-[11px] text-slate-350 min-h-[160px] shadow-inner mb-6">
                <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
                  <span className="text-[9px] text-slate-500 ml-1">Terminal</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#61A644]">sachin@uwgb:~$</span>
                    <span className="text-slate-100">./check_portal.sh</span>
                  </div>
                  
                  {terminalStep >= 1 && (
                    <div className="text-slate-500">[System] Initializing core modules...</div>
                  )}
                  {terminalStep >= 2 && (
                    <div className="text-slate-500">[System] Verifying connection to GoogleForms... OK</div>
                  )}
                  {terminalStep >= 3 && (
                    <div className="text-slate-400 font-bold">[Status] Portal offline. Opening August 15, 2026.</div>
                  )}
                  {terminalStep >= 4 && (
                    <div className="text-[#E37100] font-bold animate-pulse">
                      [READY] Subscribe to join the waitlist database.
                    </div>
                  )}
                </div>
              </div>

              {/* Action Form / Waitlist Subscription */}
              <div className="w-full">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="sub-form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onSubmit={handleSubscribe}
                      className="space-y-3"
                    >
                      <div className="relative flex items-center">
                        <Mail className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input
                          type="email"
                          required
                          disabled={isSubmitting}
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white/70 hover:bg-white focus:bg-white border border-black/5 hover:border-slate-300 focus:border-[#61A644] focus:ring-1 focus:ring-[#61A644]/20 rounded-xl py-3 pl-10 pr-4 font-google-text text-sm font-semibold text-slate-800 placeholder-slate-400 transition-all outline-none"
                        />
                      </div>
                      
                      {errorMsg && (
                        <p className="text-red-500 text-xs font-google font-bold px-1">
                          {errorMsg}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#0C3C34] hover:bg-[#0C3C34]/90 text-white font-google font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Adding to Waitlist...</span>
                          </>
                        ) : (
                          <>
                            <span>Get Notified First</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success-box"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ ease: spring, duration: 0.5 }}
                      className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center flex flex-col items-center justify-center gap-2.5"
                    >
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-[#61A644]">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-google font-bold text-[#0C3C34] text-sm">You are on the list!</h4>
                        <p className="font-google-text text-xs text-slate-650 font-semibold mt-1">
                          We will email you the moment applications officially open.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* IDE Bottom Status Bar */}
          <div className="flex justify-between items-center px-4 py-1.5 bg-[#0C3C34] text-white font-google-mono text-[10px] select-none">
            <div className="flex items-center gap-3">
              <span className="font-bold">HACKGB: setup</span>
              <span className="opacity-80">Pending Deployment</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Bash</span>
              <span>UTF-8</span>
              <span>tty1</span>
            </div>
          </div>
        </motion.div>

        {/* Back link */}
        <button
          onClick={() => navigate('/')}
          className="mt-8 text-slate-500 hover:text-[#0C3C34] font-google font-bold text-sm cursor-pointer transition-all hover:underline flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Homepage
        </button>
      </div>
    </main>
  );
};

export default OpeningSoon;
